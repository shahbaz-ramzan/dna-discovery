import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { MixpanelService } from './mixpanel.service';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    public functionExecute$ = new Subject<void>();
    constructor(
        private router: Router,
        private authService: MsalService,
        private mixpanelService: MixpanelService,
        private cookieService: CookieService
    ) {}

    setLegalText() {
        this.functionExecute$.next();
    }

    buildToastErrors(error: any) {
        let validationErrors = error.error.errors;
        let errors: any = [];

        if (typeof error.error !== undefined) {
            //if (error.error.status == "invalidToken") this.logout();
        }
        if (typeof validationErrors === 'undefined') return errors;
        if (
            validationErrors.length > 0 &&
            typeof validationErrors !== 'undefined'
        ) {
            for (let i = 0; i < validationErrors.length; i++) {
                let error = {
                    severity: 'error',
                    summary: validationErrors[i].param,
                    detail: validationErrors[i].msg
                };
                errors.push(error);
            }
        }
        return errors;
    }

    logout(discoveryType: any) {
        sessionStorage.clear();
        localStorage.clear();
        this.setLegalText();
        this.cookieService.deleteAll();
        this.mixpanelService.track('User Logged Out', {
            discoveryType: discoveryType
        });

        this.authService.logoutPopup().subscribe(() => {
            this.navigateToHome(`${environment.hosting_url}${discoveryType}`);
        });
    }

    navigateToHome(url: string) {
        this.router.navigate([url]);
    }
}
