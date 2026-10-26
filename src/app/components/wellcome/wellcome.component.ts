import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
    MSAL_GUARD_CONFIG,
    MsalBroadcastService,
    MsalGuard,
    MsalGuardConfiguration,
    MsalService
} from '@azure/msal-angular';
import { EventMessage, EventType, PopupRequest } from '@azure/msal-browser';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { b2cPolicies } from 'src/app/auth/auth-config';
import K from 'src/app/constants';
import { AppService } from 'src/app/service/app.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MsgService } from 'src/app/service/msg.service';
import Encryption from 'src/app/util/Encryption';
import { FooterComponent } from '../common/footer/footer.component';
import {
    getAccountDetailsAction,
    getAccountDetailsActionFailure,
    getAccountDetailsActionSuccess,
    getCustomWelcomeDetailAction,
    getCustomWelcomeDetailActionSuccess,
    getLegalTextAction,
    getLegalTextActionSuccess,
    getParticipantDetailsAction,
    getParticipantDetailsActionFailure,
    getParticipantDetailsActionSuccess,
    getSelfRegistrationDetailsAction,
    getSelfRegistrationDetailsActionFailure,
    getSelfRegistrationDetailsActionSuccess,
    setNewSignupAction,
    getSubscriptionAccountAction,
    getSubscriptionAccountActionFailure,
    getSubscriptionAccountActionSuccess,
    validateRegistrationLinkAction,
    validateRegistrationLinkActionFailure,
    validateRegistrationLinkActionSuccess
} from './store/welcome-actions';

@Component({
    selector: 'app-wellcome',
    templateUrl: './wellcome.component.html',
    styleUrls: ['./wellcome.component.scss'],
    providers: [MsalBroadcastService, MsalService, MsalGuard]
})
export class WellcomeComponent implements OnInit, OnDestroy {
    redirecting: boolean = false;
    @ViewChild(FooterComponent) footerComponent: FooterComponent;
    loading: boolean;
    selectedValues: string[] = [];
    displayModal: boolean;
    showGoDNAModal: boolean = false;
    showSubscriptionModal: boolean = false;
    appName: string;
    accountName: string;
    accountId: any;
    accountDetailsLoading: boolean;
    linkValidationLoading: boolean;
    selfRegistrationId: any;
    FDNA: any = {
        welcomeTitle: 'Understanding Your Financial DNA',
        logo: 'assets/images/financial-dna-logo.svg',
        description:
            'Successful financial planning requires you to have the personal clarity to be able to set goals for your life. The financial plan will then be specifically designed to help you achieve those goals based on the core of who you are.',
        videoUrl: 'https://www.youtube.com/embed/mNfZJ812R4U'
    };
    BDNA: any = {
        welcomeTitle: 'Understanding Your Business DNA',
        logo: 'assets/images/bdna-logo.svg',
        description:
            'Your best working style is aligned with being your authentic self. With objective knowledge of your behaviors and tendencies, you‘re better able to choose work and grow into a better coworker, leader, and person outside of work. Likewise, understanding yourself gives you a much better basis to understand and manage others.',
        videoUrl: 'https://www.youtube.com/embed/qyX6q70R2BY'
    };
    coBrandingLogo: string;
    primaryColor: any;
    secondaryColor: any;
    showSignUpButton: boolean;
    messageDisplayed: boolean = false;
    discoveryType: string | null;
    navigate: boolean = false;
    // Set once getLegalTextActionSuccess has run. `navigate` (set by getParticipantDetailsActionSuccess)
    // and this flag come from two independent, concurrently-dispatched request chains
    // (getAccountDetails -> getLegalText vs getParticipantDetails) - navigation must only happen
    // once BOTH have resolved, checked from both success handlers, whichever finishes last.
    // Previously navigation only checked `navigate` from inside getLegalTextActionSuccess, so if
    // getParticipantDetails resolved slower (it's the biggest request in this chain), `navigate`
    // was still false when getLegalTextActionSuccess ran, and navigation silently never happened -
    // leaving the post-login spinner (`redirecting`) stuck forever with no error at all.
    legalTextLoaded: boolean = false;
    personId: string;
    private readonly _destroyed$: Subject<boolean> = new Subject<boolean>();
    private isDestroying: boolean = false;

    constructor(
        @Inject(MSAL_GUARD_CONFIG)
        private msalGuardConfig: MsalGuardConfiguration,
        private broadcastService: MsalBroadcastService,
        private authService: MsalService,
        private appService: AppService,
        private actions: Actions,
        private store: Store<any>,
        private router: Router,
        private messageService: MsgService,
        private mixpanelService: MixpanelService
    ) {
        let urlParts = window.location.href.split('/');
        this.appName = urlParts[3];
        this.accountName = urlParts[4];
        this.accountId = urlParts[5];
        this.selfRegistrationId = urlParts[6];

        if (this.accountName && this.accountId && this.selfRegistrationId) {
            localStorage.setItem('discoveryType', this.appName);
            localStorage.setItem('accountName', this.accountName);
            localStorage.setItem('accountId', this.accountId);
            localStorage.setItem('registrationId', this.selfRegistrationId);
        }
        this.mixpanelService.track('Welcome Page Viewed', {
            discoveryType: this.appName
        });

        if (
            Encryption.decryptData(
                localStorage.getItem(K.APP.ACCESS_TOKEN) || ''
            )
        ) {
            if (localStorage.getItem('isGoDNA') === 'true') {
                this.showGoDNAModal = true;
            } else if (localStorage.getItem('subscriptionActive') === 'false') {
                this.showSubscriptionModal = true;
            } else {
                this.router.navigate(['instructions']);
            }
        }
    }

    ngOnInit(): void {
        if (this.accountId && !isNaN(+this.accountId)) {
            this.store.dispatch(getCustomWelcomeDetailAction(+this.accountId));
        }
        this.actions
            .pipe(
                ofType(getCustomWelcomeDetailActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                this.FDNA.description =
                    data.financialBehaviorWelcomePage.message;
                this.FDNA.welcomeTitle =
                    data.financialBehaviorWelcomePage.welcomeTitle;
                if (data.financialBehaviorWelcomePage.url.includes('embed')) {
                    this.FDNA.videoUrl = data.financialBehaviorWelcomePage.url;
                }

                this.BDNA.description = data.workTalentWelcomePage.message;
                this.BDNA.welcomeTitle =
                    data.workTalentWelcomePage.welcomeTitle;
                this.BDNA.videoUrl = data.workTalentWelcomePage.url;
            });
        // No failure handling existed here before this migration - preserved as a silent no-op on
        // failure per STATUS_CODE_MIGRATION_PLAN.md §5 (do not invent new UX without confirming).
        // getCustomWelcomeDetailActionFailure is dispatched but intentionally left unsubscribed.
        this.broadcastService.msalSubject$
            .pipe(
                filter(
                    (msg: EventMessage) =>
                        msg.eventType === EventType.LOGIN_SUCCESS
                ),
                takeUntil(this._destroyed$)
            )
            .subscribe((response: any) => {
                this.redirecting = true;
                const tokenInfo = this.getDecodedAccessToken(
                    response?.payload?.idToken
                );
                const user_object: any = {
                    fisrtName: tokenInfo.given_name,
                    lastName: tokenInfo.family_name,
                    fullName: tokenInfo.name,
                    personId: tokenInfo.oid,
                    email: tokenInfo.emails
                        ? tokenInfo.emails[0]
                        : 'noEmailFound'
                };

                this.mixpanelService.addUser(
                    tokenInfo.emails ? tokenInfo.emails[0] : 'noEmailFound'
                );

                this.mixpanelService.createProfile({
                    $name: tokenInfo.name,
                    $email: tokenInfo.emails
                        ? tokenInfo.emails[0]
                        : 'noEmailFound',
                    PersonId: tokenInfo.oid
                });
                this.mixpanelService.track('User Logged In', {
                    firstName: tokenInfo.given_name,
                    lastName: tokenInfo.family_name,
                    fullName: tokenInfo.name,
                    personId: tokenInfo.oid,
                    email: tokenInfo.emails
                        ? tokenInfo.emails[0]
                        : 'noEmailFound'
                });
                this.personId = tokenInfo.oid;
                // B2C stamps the policy that issued the token in `tfp` (or `acr`), so a
                // B2C_1_SignUp token means the account was just created.
                const tokenPolicy = (tokenInfo?.tfp || tokenInfo?.acr || '').toLowerCase();
                this.store.dispatch(
                    setNewSignupAction(
                        tokenPolicy === b2cPolicies.names.signUp.toLowerCase()
                    )
                );
                localStorage.setItem(
                    K.APP.LOGGED_IN_PERSON_ID,
                    Encryption.encryptData(tokenInfo.oid)
                );
                localStorage.setItem(
                    K.APP.USER_OBJECT,
                    Encryption.encryptData(JSON.stringify(user_object))
                );
                localStorage.setItem(
                    K.APP.ACCESS_TOKEN,
                    Encryption.encryptData(response?.payload?.idToken)
                );
                // this.appService.logout();
                if (!this.showSignUpButton) {
                    this.store.dispatch(
                        getSelfRegistrationDetailsAction(tokenInfo.oid)
                    );
                    this.mixpanelService.track(
                        'Get Registration Details Request',
                        {
                            discoveryType: this.discoveryType,
                            requestBody: { personId: tokenInfo.oid }
                        }
                    );
                } else {
                    this.store.dispatch(
                        getSubscriptionAccountAction(this.accountId)
                    );
                }
            });

        // if (this.appName === 'investor') {
        //     this.appName = 'Financial';
        // } else if (this.appName === 'talent') {
        //     this.appName = 'Business';
        // }

        if (this.accountName && this.accountId && this.selfRegistrationId) {
            this.showSignUpButton = true;
            this.store.dispatch(
                validateRegistrationLinkAction({
                    accountName: this.accountName,
                    accountId: this.accountId,
                    selfRegistrationId: this.selfRegistrationId
                })
            );
            this.mixpanelService.track('Registration Link Validation Request', {
                discoveryType: this.discoveryType,
                requestBody: {
                    accountName: this.accountName,
                    accountId: this.accountId,
                    selfRegistrationId: this.selfRegistrationId
                }
            });
            this.store.dispatch(
                getAccountDetailsAction(this.accountId, this.selfRegistrationId)
            );

            this.mixpanelService.track('Get Account Details Request', {
                discoveryType: this.discoveryType,
                requestBody: {
                    accountId: this.accountId,
                    selfRegistrationId: this.selfRegistrationId
                }
            });
        } else {
            localStorage.clear();
            this.appService.setLegalText();
            this.showSignUpButton = false;
        }

        this.actions
            .pipe(
                ofType(validateRegistrationLinkActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(() => {
                this.mixpanelService.track(
                    'Registration Link Validation Success',
                    {
                        accountId: this.accountId,
                        accountName: this.accountName,
                        registrationId: this.selfRegistrationId,
                        discoveryType: this.discoveryType
                    }
                );
            });

        this.actions
            .pipe(
                ofType(validateRegistrationLinkActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track(
                    'Registration Link Validation Failed',
                    {
                        accountId: this.accountId,
                        accountName: this.accountName,
                        registrationId: this.selfRegistrationId,
                        discoveryType: this.discoveryType,
                        errorMessage: error.message,
                        statusCode: error.status
                    }
                );
                this.linkValidationLoading = true;
                setTimeout(() => {
                    this.discoveryType = localStorage.getItem('discoveryType');
                    this.appService.logout(this.discoveryType);
                }, 2000);
            });

        this.actions
            .pipe(
                ofType(getAccountDetailsActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(() => {
                this.mixpanelService.createProfile({
                    PersonId: this.personId,
                    Accounts: this.accountId,
                    AccountName: this.accountName
                });
                this.mixpanelService.track('Get Account Details Success', {
                    accountId: this.accountId,
                    accountName: this.accountName,
                    registrationId: this.selfRegistrationId,
                    discoveryType: this.discoveryType
                });
                this.store.dispatch(getLegalTextAction(this.accountId));
            });

        this.actions
            .pipe(
                ofType(getAccountDetailsActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                // Clears the post-login full-page spinner (*ngIf="... || redirecting" in the
                // template) - without this, `redirecting` stays true forever on a failure here
                // since nothing else ever resets it, hiding this toast behind the spinner.
                this.redirecting = false;
                this.mixpanelService.createProfile({
                    PersonId: this.personId,
                    Accounts: this.accountId,
                    AccountName: this.accountName
                });
                this.mixpanelService.track('Get Account Details Failed', {
                    accountId: this.accountId,
                    accountName: this.accountName,
                    registrationId: this.selfRegistrationId,
                    discoveryType: this.discoveryType,
                    errorMessage: error.message,
                    statusCode: error.status
                });
            });

        this.actions
            .pipe(
                ofType(getLegalTextActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                this.mixpanelService.createProfile({
                    PersonId: this.personId,
                    Accounts: this.accountId,
                    AccountName: this.accountName
                });
                if (data?.description) {
                    localStorage.setItem('legalText', data?.description);
                    this.appService.setLegalText();
                    // this.footerComponent?.setLegalText()
                }
                this.legalTextLoaded = true;
                this.tryNavigateToInstructions();
            });
        // No failure handling existed here before this migration - preserved as a silent no-op on
        // failure per STATUS_CODE_MIGRATION_PLAN.md §5. getLegalTextActionFailure is dispatched but
        // intentionally left unsubscribed here.

        this.actions
            .pipe(
                ofType(getSelfRegistrationDetailsActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                // this.navigate = true;
                this.accountId = data?.accountId;
                this.selfRegistrationId = data?.selfRegistrationId;
                this.accountName = data?.accountName;

                this.mixpanelService.track('Get Registration Details Success', {
                    accountId: this.accountId,
                    accountName: this.accountName,
                    registrationId: this.selfRegistrationId,
                    discoveryType: this.discoveryType
                });

                this.store.dispatch(
                    getAccountDetailsAction(
                        this.accountId,
                        this.selfRegistrationId
                    )
                );
                this.mixpanelService.track('Get Account Details Request', {
                    discoveryType: this.discoveryType,
                    requestBody: {
                        accountId: this.accountId,
                        selfRegistrationId: this.selfRegistrationId
                    }
                });
                localStorage.setItem('accountName', this.accountName);
                localStorage.setItem('accountId', this.accountId);
                localStorage.setItem('registrationId', this.selfRegistrationId);
                this.store.dispatch(
                    getParticipantDetailsAction({
                        personId: this.personId,
                        accountId: this.accountId
                    })
                );
                this.store.dispatch(
                    getSubscriptionAccountAction(this.accountId)
                );
            });

        this.actions
            .pipe(
                ofType(getSelfRegistrationDetailsActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                // Same reasoning as the getAccountDetailsActionFailure handler above - clear the
                // spinner so this toast (and the pre-logout 2500ms window) is actually visible.
                this.redirecting = false;
                this.discoveryType = this.appName;
                this.mixpanelService.track('Get Registration Details Failed', {
                    personId: this.personId,
                    discoveryType: this.discoveryType,
                    errorMessage: error.message,
                    statusCode: error.status
                });
                setTimeout(() => {
                    this.appService.logout(this.discoveryType);
                }, 2500);
            });

        this.actions
            .pipe(
                ofType(getParticipantDetailsActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ response }) => {
                // Was `response?.body?.data[0].accountType` - an empty/missing data array threw a
                // TypeError here that silently killed this subscription, leaving `redirecting`
                // (the post-login full-page spinner) stuck true forever with no error surfaced.
                const participantDetail = response?.body?.data?.[0];
                if (participantDetail?.accountType === 'GoDNA') {
                    localStorage.setItem('isGoDNA', 'true');
                    this.showGoDNAModal = true;
                } else {
                    localStorage.removeItem('isGoDNA');
                    this.navigate = true;
                    this.tryNavigateToInstructions();
                }
            });

        this.actions
            .pipe(
                ofType(getParticipantDetailsActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(() => {
                // No toast here (matches the "reducer only" scoping for this action elsewhere in
                // the app - see STATUS_CODE_MIGRATION_PLAN.md), but the spinner still has to clear
                // so the rest of the page becomes visible/interactive instead of stuck forever.
                this.redirecting = false;
            });

        this.actions
            .pipe(
                ofType(getSubscriptionAccountActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ response }) => {
                const subscription = response?.body?.data?.[0];
                if (subscription && subscription.subscriptionState === false) {
                    localStorage.setItem('subscriptionActive', 'false');
                    this.showSubscriptionModal = true;
                } else {
                    localStorage.setItem('subscriptionActive', 'true');
                    if (this.showSignUpButton) {
                        this.router.navigate(['instructions']);
                    }
                }
            });

        this.actions
            .pipe(
                ofType(getSubscriptionAccountActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(() => {
                this.redirecting = false;
            });

        this.store
            .select(state => state.welcomeReducer)
            .pipe(takeUntil(this._destroyed$))
            .subscribe(response => {
                this.accountDetailsLoading = response?.accountDetailsLoading;
                this.linkValidationLoading = response?.linkValidationLoading;

                if (response?.accountDetailsPayload) {
                    if (this.showSignUpButton) {
                        if (
                            !response?.accountDetailsPayload?.discoveryType
                                .toLowerCase()
                                .includes(localStorage.getItem('discoveryType'))
                        ) {
                            if (!this.messageDisplayed) {
                                this.messageService.errorMessage(
                                    'Your discovery type is invalid. This discovery type is not associated with the self registration link'
                                );
                                this.messageDisplayed = true;
                            }
                            setTimeout(() => {
                                this.discoveryType = localStorage.getItem(
                                    'discoveryType'
                                );
                                this.appService.logout(this.discoveryType);
                            }, 2500);
                        }
                    }
                    if (
                        response?.accountDetailsPayload?.discoveryType ===
                        'Investor'
                    ) {
                        localStorage.setItem('discoveryType', 'investor');
                    } else {
                        localStorage.setItem('discoveryType', 'talent');
                    }
                    document.documentElement.style.setProperty(
                        `--primary-color`,
                        response?.accountDetailsPayload?.primaryColor ||
                            K.APP.DEFAULT_PRIMARY_COLOR
                    );
                    document.documentElement.style.setProperty(
                        `--secondary-color`,
                        response?.accountDetailsPayload?.secondaryColor ||
                            K.APP.DEFAULT_SECONDARY_COLOR
                    );
                    this.discoveryType = localStorage.getItem('discoveryType');
                    if (
                        response?.accountDetailsPayload?.primaryColor?.toString() ==
                        K.APP.DEFAULT_PRIMARY_COLOR
                    ) {
                        if (this.discoveryType === 'investor') {
                            document.documentElement.style.setProperty(
                                `--least-color`,
                                K.APP.DEFAULT_SECONDARY_COLOR2
                            );
                        } else if (this.discoveryType === 'talent') {
                            document.documentElement.style.setProperty(
                                `--least-color`,
                                K.APP.DEFAULT_SECONDARY_COLOR
                            );
                        }
                    } else {
                        document.documentElement.style.setProperty(
                            `--least-color`,
                            response?.accountDetailsPayload?.secondaryColor
                        );
                    }
                    if (
                        response?.accountDetailsPayload?.logo &&
                        response?.accountDetailsPayload?.logo != ''
                    ) {
                        this.FDNA.logo = response?.accountDetailsPayload?.logo;
                        this.BDNA.logo = response?.accountDetailsPayload?.logo;
                        localStorage.setItem(
                            'accountLogo',
                            response?.accountDetailsPayload?.logo
                        );
                    } else {
                        this.discoveryType = localStorage.getItem(
                            'discoveryType'
                        );
                        localStorage.setItem(
                            'accountLogo',
                            this.discoveryType === 'investor'
                                ? this.FDNA.logo
                                : this.BDNA.logo
                        );
                    }

                    localStorage.setItem(
                        'primaryColor',
                        response?.accountDetailsPayload?.primaryColor
                    );
                    localStorage.setItem(
                        'secondaryColor',
                        response?.accountDetailsPayload?.secondaryColor
                    );

                    if (this.appName == 'talent') {
                        localStorage.setItem(
                            'discoveryDto',
                            JSON.stringify(
                                response?.accountDetailsPayload
                                    ?.workTalentDashboardDto
                            )
                        );
                    } else if (this.appName == 'investor') {
                        localStorage.setItem(
                            'discoveryDto',
                            JSON.stringify(
                                response?.accountDetailsPayload
                                    ?.investorDashboardDto
                            )
                        );
                    }
                }
            });
    }

    login() {
        this.mixpanelService.track('Clicked Login Button');
        this.loading = true;
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginPopup({
                ...this.msalGuardConfig.authRequest
            } as PopupRequest);
        } else {
            this.authService.loginPopup();
        }
    }

    signup() {
        this.mixpanelService.track('Clicked Signup Button');
        this.loading = true;
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginPopup({
                ...b2cPolicies.authorities.SignUp
            } as PopupRequest);
        } else {
            this.authService.loginPopup();
        }
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    // Navigates once both `navigate` (set by getParticipantDetailsActionSuccess) and
    // `legalTextLoaded` (set by getLegalTextActionSuccess) are true - see the field comments on
    // `legalTextLoaded` above for why this can't just be a single check in one handler.
    private tryNavigateToInstructions(): void {
        if (this.navigate && this.legalTextLoaded) {
            this.router.navigate(['instructions']);
        }
    }

    showModalDialog() {
        this.displayModal = true;
    }

    onSubscriptionModalClose() {
        this.appService.logout(this.discoveryType);
    }

    onGoDNAModalClose() {
        if (this.isDestroying) return;
        localStorage.removeItem('isGoDNA');
        this.discoveryType = localStorage.getItem('discoveryType');
        this.appService.logout(this.discoveryType);
    }

    ngOnDestroy() {
        this.isDestroying = true;
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }
}
