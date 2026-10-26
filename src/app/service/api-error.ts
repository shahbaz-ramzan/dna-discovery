import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, throwError, TimeoutError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import K from '../constants';
import { HANDLE_AUTH_ERROR } from './auth-error.interceptor';
import { MsgService } from './msg.service';

// ---------------------------------------------------------------------------
// The model: one normalized error shape for real (non-2xx) HTTP failures.
//
// The backend signals success/failure with the real HTTP status code - a resolved response is a
// success, a thrown HttpErrorResponse is a failure - so this interceptor is the single place that
// classifies every failure app-wide. (An earlier version of this app's endpoints used to also
// encode a logical statusCode/errors envelope inside a 200 body; that was removed in the backend
// migration completed in STATUS_CODE_MIGRATION_PLAN.md, so effects now read `response.body.data`
// directly on success and rely on this interceptor + `catchApiError` for every failure case.)
// ---------------------------------------------------------------------------

export interface ApiError {
    status: number
    /** Always user-readable: the backend's own message when it sent one, else generic text per status. */
    message: string
}

/** Generic user-facing text per HTTP status, used when the backend sends no message of its own. */
const MESSAGES: Record<number, string> = {
    [K.NETWORK.STATUS_CODE.TIMED_OUT]: 'Unable to reach the server. Please check your internet connection and try again.',
    [K.NETWORK.STATUS_CODE.BAD_REQUEST]: 'The request could not be completed. Please review the information entered and try again.',
    [K.NETWORK.STATUS_CODE.UNAUTHORIZED]: 'Your session has expired. Please log in again to continue.',
    [K.NETWORK.STATUS_CODE.FORBIDDEN]: 'You do not have permission to perform this action. Please contact your administrator if you need access.',
    [K.NETWORK.STATUS_CODE.NOT_FOUND]: 'The requested information could not be found. It may have been moved or deleted.',
    [K.NETWORK.STATUS_CODE.CONFLICT]: 'This change conflicts with a more recent update. Please refresh the page and try again.',
    [K.NETWORK.STATUS_CODE.SERVER_ERROR]: 'An unexpected error occurred on the server. Please try again, or contact support if the issue persists.',
    [K.NETWORK.STATUS_CODE.SERVICE_UNAVAILABLE]: 'The service is temporarily unavailable. Please try again in a few minutes.'
};

const TIMEOUT_MESSAGE = 'The request took longer than expected and was cancelled. Please try again.';

/** Fallback for an unrecognized status or a non-HTTP throw. Intentionally vague but never a dead end. */
const DEFAULT_MESSAGE = 'An unexpected error occurred. Please try again, or contact support if the issue persists.';

/**
 * Structural check for "is this an ApiError", so ApiErrorNotificationEffects below can recognize
 * any action carrying a normalized error without enumerating every failure action type.
 */
export function isApiError(value: unknown): value is ApiError {
    return (
        typeof value === 'object' &&
        value !== null &&
        !(value instanceof HttpErrorResponse) &&
        typeof (value as ApiError).status === 'number' &&
        typeof (value as ApiError).message === 'string'
    );
}

/**
 * The message the backend actually sent, checked in the order this app's endpoints are seen to
 * use it (see fdna-reports.component.ts / bdna-reports.component.ts success-action handlers,
 * which read `body.errors.collections.error` on a logical 400/500). Falling back to the first
 * string value in `errors.collections` reproduces the same first-key-wins behavior generically
 * instead of hardcoding endpoint-specific field names.
 */
export function serverMessage(body: any): string | undefined {
    return (
        body?.errors?.collections?.error ||
        firstCollectionsValue(body?.errors?.collections) ||
        body?.errors?.message ||
        (typeof body?.errors === 'string' ? body.errors : undefined) ||
        body?.message ||
        undefined
    );
}

function firstCollectionsValue(collections: unknown): string | undefined {
    if (typeof collections !== 'object' || collections === null) return undefined;
    for (const value of Object.values(collections)) {
        if (typeof value === 'string' && value) return value;
    }
    return undefined;
}

/**
 * Guarantees a genuine ApiError whatever reaches it, so every reader can safely read `.message`.
 * Besides a normal interceptor failure this also sees: a 401 marked HANDLE_AUTH_ERROR (rethrown
 * raw so AuthErrorInterceptor stays the sole 401 handler), and a client-side request timeout
 * (an RxJS TimeoutError).
 */
export function ensureApiError(error: unknown): ApiError {
    if (isApiError(error)) return error;

    if (error instanceof HttpErrorResponse) {
        return {
            status: error.status,
            message: serverMessage(error.error) || MESSAGES[error.status] || DEFAULT_MESSAGE
        };
    }

    return {
        status: 0,
        message: error instanceof TimeoutError ? TIMEOUT_MESSAGE : DEFAULT_MESSAGE
    };
}

/** Replaces a repeated `catchError((error) => of({ type: FAILURE_..., error }))` in an effect. */
export function catchApiError<T>(toFailureAction: (error: ApiError) => T) {
    return (source: Observable<any>): Observable<any> => source.pipe(catchError((error: unknown) => of(toFailureAction(ensureApiError(error)))));
}

// ---------------------------------------------------------------------------
// Step 1: classify every genuinely-failed request (registered in app.module)
// ---------------------------------------------------------------------------

/**
 * Normalizes every failed HTTP request into an ApiError and rethrows it. Classification only -
 * toasting is ApiErrorNotificationEffects' job, and only fires for actions that opt in with
 * `notify: true`. 401s marked HANDLE_AUTH_ERROR pass through untouched so AuthErrorInterceptor
 * stays the sole owner of logout.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    this.log(req, event.status, 'SUCCESS', event.body);
                }
            }),
            catchError((error: HttpErrorResponse) => {
                this.log(req, error.status, 'FAILED', error.error);

                if (req.context.get(HANDLE_AUTH_ERROR) && error.status === K.NETWORK.STATUS_CODE.UNAUTHORIZED) {
                    // RxJS 6 (this app's version) does NOT support the throwError(() => value)
                    // factory form added in RxJS 7 - passing a function here would deliver the
                    // function itself as the error, not its return value. Must pass the value directly.
                    return throwError(error);
                }
                return throwError(ensureApiError(error));
            })
        );
    }

    private log(req: HttpRequest<any>, status: number, outcome: 'SUCCESS' | 'FAILED', body: unknown): void {
        console.log(`[API ${outcome}] ${req.method} ${req.url} → ${status}`, body);
    }
}

// ---------------------------------------------------------------------------
// Step 2: toast whatever ends up in the store as a failure (registered in app.module)
// ---------------------------------------------------------------------------

/**
 * Toasts any action across the whole app whose `error` is an ApiError AND whose `notify` flag is
 * explicitly `true` - nothing to register per feature, but nothing toasts by accident either.
 *
 * `notify` is opt-in, not opt-out: omitting it (or setting it `false`) stays silent, so wiring
 * this in does not introduce any new toast that wasn't already shown before.
 *
 * Dedupe is scoped to "shown once since the last navigation", not a rolling time window, so a
 * page dispatching several independent requests that fail for the same underlying reason only
 * toasts once, while a genuinely new failure on a later view still shows.
 */
@Injectable()
export class ApiErrorNotificationEffects {
    private shownThisView = new Set<string>();

    notifyApiFailure = createEffect(
        () =>
            this.actions$.pipe(
                filter((action): action is Action & { error: ApiError; notify?: boolean } => isApiError((action as any)?.error)),
                filter((action) => action.notify === true),
                filter(({ error }) => this.shouldShow(error.message)),
                tap(({ error }) => this.msgService.errorMessage(error.message))
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private msgService: MsgService,
        router: Router
    ) {
        router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.shownThisView.clear());
    }

    private shouldShow(message: string): boolean {
        const key = message.trim().toLowerCase();
        if (this.shownThisView.has(key)) return false;
        this.shownThisView.add(key);
        return true;
    }
}
