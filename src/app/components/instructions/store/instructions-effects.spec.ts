import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ApiErrorInterceptor } from 'src/app/service/api-error';
import { InstructionsService } from '../instructions-service.service';
import {
    getDiscoveryStatusAction,
    getDiscoveryStatusActionFailure,
    getDiscoveryStatusActionSuccess,
    userScheduleDiscoveryAction,
    userScheduleDiscoveryActionFailure
} from './instructions-actions';
import { InstructionsEffects } from './instructions-effects';

/**
 * These tests exercise the REAL HttpClient -> ApiErrorInterceptor -> effect chain (via
 * HttpClientTestingModule), not a mocked InstructionsService - so a bad payload or an error
 * status flushed here goes through the exact same classification code a real backend failure
 * would, and the assertions check the actual normalized ApiError the component/reducer receive.
 */
describe('InstructionsEffects', () => {
    let effects: InstructionsEffects;
    let httpMock: HttpTestingController;
    let actions$: Observable<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                InstructionsEffects,
                InstructionsService,
                provideMockActions(() => actions$),
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ApiErrorInterceptor,
                    multi: true
                }
            ]
        });

        effects = TestBed.inject(InstructionsEffects);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // Fails the test if any request wasn't flushed above - catches a effect that forgot to
        // call the service, or a URL typo that made expectOne() match the wrong request.
        httpMock.verify();
    });

    describe('getDiscoveryStatus', () => {
        it('dispatches getDiscoveryStatusActionSuccess with body.data on a 200 with the expected payload shape', done => {
            actions$ = of(getDiscoveryStatusAction('credit-123'));

            effects.getDiscoveryStatus.subscribe(action => {
                expect(action).toEqual(
                    getDiscoveryStatusActionSuccess({ completed: true })
                );
                done();
            });

            const req = httpMock.expectOne(r =>
                r.url.includes('GetDiscoveryStatus')
            );
            expect(req.request.method).toBe('GET');
            req.flush({ data: { completed: true } });
        });

        it('dispatches getDiscoveryStatusActionFailure with a real backend error message on a 404', done => {
            actions$ = of(getDiscoveryStatusAction('credit-123'));

            effects.getDiscoveryStatus.subscribe(action => {
                expect(action.type).toBe(
                    getDiscoveryStatusActionFailure({ status: 0, message: '' })
                        .type
                );
                expect(action.error.status).toBe(404);
                // This is the exact field instructions.component.ts reads as `error.message` for
                // both the toast and the 'Get Discovery Status Failed' Mixpanel payload - if the
                // backend's real envelope shape ever changes, this assertion catches it here
                // instead of silently falling back to the generic per-status message.
                expect(action.error.message).toBe(
                    'Discovery record not found.'
                );
                done();
            });

            const req = httpMock.expectOne(r =>
                r.url.includes('GetDiscoveryStatus')
            );
            req.flush(
                {
                    errors: {
                        collections: { error: 'Discovery record not found.' }
                    }
                },
                { status: 404, statusText: 'Not Found' }
            );
        });

        it('dispatches getDiscoveryStatusActionFailure with the generic per-status message when the backend sends no message at all', done => {
            actions$ = of(getDiscoveryStatusAction('credit-123'));

            effects.getDiscoveryStatus.subscribe(action => {
                expect(action.error.status).toBe(500);
                // No errors.collections.error in the body - ensureApiError() must fall back to
                // MESSAGES[500] from api-error.ts rather than surfacing 'undefined' to the user.
                expect(action.error.message).toBeTruthy();
                expect(action.error.message).not.toContain('undefined');
                done();
            });

            const req = httpMock.expectOne(r =>
                r.url.includes('GetDiscoveryStatus')
            );
            req.flush({}, { status: 500, statusText: 'Internal Server Error' });
        });

        it('dispatches getDiscoveryStatusActionSuccess even when the success body is missing the expected field (bad payload, not a bad URL)', done => {
            // Simulates a backend contract drift: HTTP 200, but `data.completed` isn't present.
            // The effect should still classify this as success (real HTTP 200) - it's the
            // component's job (see instructions.component.ts data?.completed) to handle the
            // missing field gracefully, not the effect's.
            actions$ = of(getDiscoveryStatusAction('credit-123'));

            effects.getDiscoveryStatus.subscribe(action => {
                expect(action.type).toBe(
                    getDiscoveryStatusActionSuccess(undefined).type
                );
                expect(action.data).toEqual({});
                done();
            });

            const req = httpMock.expectOne(r =>
                r.url.includes('GetDiscoveryStatus')
            );
            req.flush({ data: {} });
        });
    });

    describe('userScheduleDiscovery', () => {
        it('dispatches userScheduleDiscoveryActionFailure on a 400 with a validation message', done => {
            actions$ = of(userScheduleDiscoveryAction({ personId: 'p1' }));

            effects.userScheduleDiscovery.subscribe(action => {
                expect(action.type).toBe(
                    userScheduleDiscoveryActionFailure({
                        status: 0,
                        message: ''
                    }).type
                );
                expect(action.error.status).toBe(400);
                expect(action.error.message).toBe(
                    'Person has already scheduled a discovery.'
                );
                done();
            });

            const req = httpMock.expectOne(r =>
                r.url.includes('ScheduleDiscovery')
            );
            req.flush(
                {
                    errors: {
                        collections: {
                            error: 'Person has already scheduled a discovery.'
                        }
                    }
                },
                { status: 400, statusText: 'Bad Request' }
            );
        });
    });
});
