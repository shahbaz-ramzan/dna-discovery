import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import K from 'src/app/constants';
import { AppService } from 'src/app/service/app.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import Encryption from 'src/app/util/Encryption';
import {
    getQuestionStatusAction,
    getQuestionStatusActionSuccess
} from '../questionnaire/store/questionnaire-actions';
import {
    getCreditIdAction,
    getCreditIdActionSuccess,
    getCreditIdActionFailure,
    getDiscoveryStatusAction,
    getDiscoveryStatusActionSuccess,
    getDiscoveryStatusActionFailure,
    userScheduleDiscoveryAction,
    userScheduleDiscoveryActionSuccess,
    userScheduleDiscoveryActionFailure
} from './store/instructions-actions';
import { setNewSignupAction } from '../wellcome/store/welcome-actions';

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {
    private readonly _destroyed$: Subject<boolean> = new Subject<boolean>();
    displayModal: boolean;
    personId: any;
    creditId: any;
    userObject: any;
    email: string;
    accountId: any;
    registrationId: any;
    username: string;
    isdiscoveryCompleted: boolean;
    discoveryStatusLoading: boolean;
    userScheduleDiscoveryLoading: boolean;
    creditIdLoading: boolean;
    private scheduleDiscoveryDone = false;
    pageLoading: boolean;
    logo: any;
    items: MenuItem[];
    instructionsVideo: string;
    discoveryType: any;
    instructionsText: any;
    legalText: string = '';

    constructor(
        private store: Store<any>,
        private actions: Actions,
        private appService: AppService,
        private router: Router,
        private mixpanelService: MixpanelService
    ) {
        this.userObject = Encryption.decryptData(
            localStorage.getItem(K.APP.USER_OBJECT) || ''
        );
        if (this.userObject) {
            this.userObject = JSON.parse(this.userObject);
        }
        this.personId = this.userObject?.personId;
        this.email = this.userObject?.email;
        this.accountId = localStorage.getItem(K.APP.ACCOUNT_ID_KEY) || '';
        this.registrationId = localStorage.getItem(K.APP.REGISTRATION_ID) || '';
        this.items = [
            {
                label: 'Logout',
                command: () => this.logout(),
                icon: 'pi pi-fw pi-sign-out'
            }
        ];
        this.username = this.userObject?.fullName;
        this.pageLoading = true;
        this.discoveryType = localStorage.getItem('discoveryType');
        if (this.discoveryType === 'investor') {
            this.instructionsVideo =
                'https://www.youtube.com/embed/zjH1pUEiL0Y';
            this.instructionsText = {
                p1:
                    'Each question has three statements. You’ll be asked to choose two of the statements for each question – how you <b>most</b> naturally operate and how you <strong>least</strong>  naturally operate. Base your choices on how you act, make decisions, and interact. You might find some questions more difficult than others, go with your intuition and don’t dwell on it.',
                p2:
                    'The questions aren’t focused on money but are designed to help uncover your unconscious behavior. Using a sophisticated calculation, your responses are translated into results on how people like you make decisions about money.',
                p3:
                    'You’ll receive a summary report at the end that will reveal your financial behavior.'
            };
        } else if (this.discoveryType === 'talent') {
            this.instructionsVideo =
                'https://www.youtube.com/embed/jyXuIfjmeOY';
            this.instructionsText = {
                p1:
                    'Each question has three statements. You’ll be asked to choose two of the statements for each question – how you <b>most</b> naturally operate and how you <strong>least</strong> naturally operate. Base your choices on how you act, make decisions, and interact. You might find some questions more difficult than others, go with your intuition and don’t dwell on it.',
                p2:
                    'The questions focus on “who you are” and not on “who you want to be.” A scientifically validated calculation will translate your responses into results on how people like you approach work, make decisions, and build relationships.',
                p3:
                    'You’ll see your dashboard at the end that will reveal your workplace talents.'
            };
        }
        this.mixpanelService.track('Instructions Viewed', {
            personId: this.personId,
            accountId: this.accountId,
            email: this.email,
            name: this.username,
            discoveryType: this.discoveryType
        });
    }

    ngOnInit(): void {
        this.appService.setLegalText();
        this.store
            .select(state => state.welcomeReducer?.isNewSignup)
            .pipe(take(1))
            .subscribe(isNewSignup => {
                if (isNewSignup) {
                    this.store.dispatch(setNewSignupAction(false));
                    this.dispatchScheduleDiscovery();
                } else {
                    this.dispatchGetCreditId();
                }
            });

        this.actions
            .pipe(ofType(getCreditIdActionSuccess), takeUntil(this._destroyed$))
            .subscribe(({ response }) => {
                this.creditId = response?.body?.data?.creditId;
                this.mixpanelService.track('Get Credit Id Response', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    discoveryType: this.discoveryType,
                    apiResponse: response
                });
                if (this.creditId) {
                    localStorage.setItem(K.APP.CREDIT_ID, this.creditId);
                    this.store.dispatch(
                        getDiscoveryStatusAction(this.creditId)
                    );
                    this.mixpanelService.track('Get Discovery Status Request', {
                        personId: this.personId,
                        accountId: this.accountId,
                        email: this.email,
                        name: this.username,
                        discoveryType: this.discoveryType,
                        requestBody: { creditId: this.creditId }
                    });
                } else {
                    this.dispatchScheduleDiscovery();
                }
            });

        this.actions
            .pipe(ofType(getCreditIdActionFailure), takeUntil(this._destroyed$))
            .subscribe(({ error }) => {
                // GetPersonCreditID's real HTTP-error contract (dev backend) has no way to
                // distinguish "this person has no credit record yet" from a genuinely bad
                // personId - both come back as a 400 "Invalid PersonId provided". QA's
                // still-unmigrated backend wraps the identical logical error in an HTTP 200,
                // which the success branch above misreads as "no creditId" and proceeds to
                // ScheduleDiscovery - see BACKEND_CONTRACT_MISMATCH_QA_VS_DEV.md. Falling
                // through here reaches the same outcome QA already reaches, by design instead
                // of by accident. If personId were genuinely invalid, ScheduleDiscovery would
                // fail too, and that failure already has a real handler (toast + logout).
                this.mixpanelService.track('Get Credit Id Failed', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    discoveryType: this.discoveryType,
                    errorMessage: error.message,
                    statusCode: error.status
                });
                this.dispatchScheduleDiscovery();
            });

        this.actions
            .pipe(
                ofType(getDiscoveryStatusActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                this.isdiscoveryCompleted = data?.completed;
                this.mixpanelService.track('Get Discovery Status Success', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    creditId: this.creditId,
                    discoveryType: this.discoveryType,
                    discoveryCompleted: this.isdiscoveryCompleted
                });
                localStorage.setItem(
                    'discoveryStatus',
                    this.isdiscoveryCompleted?.toString()
                );
                if (this.isdiscoveryCompleted) {
                    this.router.navigate(['dashboard']);
                } else {
                    this.store.dispatch(
                        getQuestionStatusAction(this.personId)
                    );
                    this.mixpanelService.track(
                        'Get Question Status Request',
                        {
                            accountId: this.accountId,
                            email: this.email,
                            name: this.username,
                            discoveryType: this.discoveryType,
                            requestBody: { personId: this.personId }
                        }
                    );
                }
            });

        this.actions
            .pipe(
                ofType(getDiscoveryStatusActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track('Get Discovery Status Failed', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    creditId: this.creditId,
                    discoveryType: this.discoveryType,
                    errorMessage: error.message,
                    statusCode: error.status
                });
                setTimeout(
                    () => this.appService.logout(this.discoveryType),
                    2500
                );
            });

        this.actions
            .pipe(
                ofType(getQuestionStatusActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ response }) => {
                this.mixpanelService.track('Get Question Status Response', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    creditId: this.creditId,
                    discoveryType: this.discoveryType,
                    apiResponse: response
                });
                if (response?.body?.questionstatus === false) {
                    this.logo = localStorage.getItem('accountLogo');
                    this.pageLoading = false;
                } else {
                    this.router.navigate(['questionnaire']);
                }
            });

        this.actions
            .pipe(
                ofType(userScheduleDiscoveryActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                this.mixpanelService.track('Schedule Discovery Success', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    discoveryType: this.discoveryType,
                    creditId: data?.creditId
                });
                this.dispatchGetCreditId();
            });

        this.actions
            .pipe(
                ofType(userScheduleDiscoveryActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track('Schedule Discovery Failed', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    discoveryType: this.discoveryType,
                    errorMessage: error.message,
                    statusCode: error.status
                });
                setTimeout(
                    () => this.appService.logout(this.discoveryType),
                    2500
                );
            });

        this.store
            .select(state => state.instructionsReducer)
            .subscribe(response => {
                this.discoveryStatusLoading = response?.discoveryStatusLoading;
                this.creditIdLoading = response?.creditIdLoading;
                this.userScheduleDiscoveryLoading =
                    response?.userScheduleDiscoveryLoading;
            });

        this.store
            .select(state => state.welcomeReducer)
            .subscribe(response => {
                console.log(response);
                if (response?.accountDetailsPayload) {
                    this.logo = localStorage.getItem('accountLogo');
                }
            });
    }

    showModalDialog() {
        this.displayModal = true;
    }

    onClick() {
        this.mixpanelService.track('Clicked Start Discovery', {
            personId: this.personId,
            accountId: this.accountId,
            email: this.email,
            name: this.username,
            discoveryType: this.discoveryType
        });
        this.router.navigate(['questionnaire']);
    }

    logout() {
        this.appService.logout(this.discoveryType);
    }

    private dispatchGetCreditId(): void {
        this.store.dispatch(getCreditIdAction(this.personId));
        this.mixpanelService.track('Get Credit Id Request', {
            accountId: this.accountId,
            email: this.email,
            name: this.username,
            discoveryType: this.discoveryType,
            requestBody: { personId: this.personId }
        });
    }

    private dispatchScheduleDiscovery(): void {
        // Schedule at most once per page load - otherwise a missing creditId after
        // scheduling would loop ScheduleDiscovery -> GetPersonCreditID forever.
        if (this.scheduleDiscoveryDone) {
            setTimeout(() => this.appService.logout(this.discoveryType), 2500);
            return;
        }
        this.scheduleDiscoveryDone = true;
        this.store.dispatch(
            userScheduleDiscoveryAction({
                personId: this.personId,
                accountId: this.accountId,
                selfRegistrationId: this.registrationId,
                email: this.email,
                username: this.username
            })
        );
        this.mixpanelService.track('Schedule Discovery Request', {
            discoveryType: this.discoveryType,
            requestBody: {
                personId: this.personId,
                accountId: this.accountId,
                selfRegistrationId: this.registrationId,
                email: this.email,
                username: this.username
            }
        });
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.unsubscribe();
    }
}
