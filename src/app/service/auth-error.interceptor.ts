import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import K from '../constants';
import { AppService } from './app.service';

/**
 * Opt-in flag: only requests explicitly marked with this context get 401 -> logout handling.
 * HTTP_INTERCEPTORS apply to every HttpClient call app-wide, so this keeps a third-party call
 * (if one is ever added directly via HttpClient) from triggering a session logout just because
 * that unrelated service returned its own 401.
 */
export const HANDLE_AUTH_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable({
    providedIn: 'root'
})
export class AuthErrorInterceptor implements HttpInterceptor {
    constructor(private appService: AppService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.context.get(HANDLE_AUTH_ERROR)) {
            return next.handle(req);
        }
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === K.NETWORK.STATUS_CODE.UNAUTHORIZED) {
                    this.appService.logout(localStorage.getItem('discoveryType'));
                }
                // RxJS 6 (this app's version) does NOT support the throwError(() => value) factory
                // form added in RxJS 7 - pass the value directly, or it delivers the function
                // itself as the error instead of `error`.
                return throwError(error);
            })
        );
    }
}
