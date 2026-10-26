import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { shareReplay, timeout } from 'rxjs/operators';
import Request from './requests';
import K from '../constants';
import { HANDLE_AUTH_ERROR } from './auth-error.interceptor';
@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    constructor(private http: HttpClient) {}

    httpCall(request: Request) {
        // console.log("API CALL", request)
        const response = this.http
            .request(request.method, request.url, {
                body: request.body,
                headers: request.headers,
                observe: 'response',
                // Marks this as our own backend call so AuthErrorInterceptor handles its 401s.
                // Third-party HttpClient calls made elsewhere (not through this method) are left
                // unmarked so an unrelated service's 401 can't trigger a session logout.
                context: new HttpContext().set(HANDLE_AUTH_ERROR, true)
            })
            .pipe(
                // Applied downstream of the interceptor chain - ApiErrorInterceptor never sees a
                // TimeoutError (it isn't an HttpErrorResponse), so ensureApiError()/catchApiError()
                // at the effect layer is what turns a timeout into a normal ApiError. Without this,
                // a hung request produced no error at all - the loading flag just stayed true
                // forever with nothing for the reducer/component to react to.
                timeout(K.NETWORK.URL.TIMEOUT),
                shareReplay()
            );

        // 401 handling now lives centrally in AuthErrorInterceptor (see auth-error.interceptor.ts),
        // which is marked on this call via the HANDLE_AUTH_ERROR context above. Subscribing here
        // too would fire appService.logout() a second time (it opens its own MSAL logout popup),
        // so this method no longer subscribes on its own - only its caller does.
        return response;
    }
}
