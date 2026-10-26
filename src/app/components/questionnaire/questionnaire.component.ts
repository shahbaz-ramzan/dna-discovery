import { PlatformLocation } from '@angular/common';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import K from 'src/app/constants';
import { AppService } from 'src/app/service/app.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MsgService } from 'src/app/service/msg.service';
import Encryption from 'src/app/util/Encryption';
import { MessageService } from 'primeng/api';
import {
    getDiscoveryStatusAction,
    getDiscoveryStatusActionSuccess,
    getDiscoveryStatusActionFailure
} from '../instructions/store/instructions-actions';
import {
    getQuestionListAction,
    getQuestionListActionSuccess,
    getQuestionListActionFailure,
    getQuestionStatusAction,
    getQuestionStatusActionSuccess,
    saveQuestionAnswerAction,
    saveQuestionAnswerActionSuccess,
    saveQuestionAnswerActionFailure
} from './store/questionnaire-actions';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss'],
    providers: [MessageService]
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
    @ViewChild('animateMe') animateMe: ElementRef;
    instructionModal = false;

    selectionOptions: any[];
    value1: string = 'off';
    items: MenuItem[];
    currentQuestionNumber: number = 1;
    questionProgress: number = 0;
    goBack: boolean = true;
    allQuestions: any[] = [];
    personId: any;
    creditId: any;
    least: number = 0;
    most: number = 0;
    currentQuestion: any[] = [];
    questionListLoading: any;
    questionStatusLoading: any;
    savingQuestionLoading: any;
    discoveryStatusLoading: boolean;
    isdiscoveryCompleted: boolean;
    logo: any;
    pageReloded: boolean = true;
    primaryColor: any;
    secondaryColor: any;
    discoveryType: string | null;
    instructionsText: any;

    private readonly _destroyed$: Subject<boolean> = new Subject<boolean>();
    userObject: any;
    email: any;
    accountId: string;
    username: any;
    showSpeedUpPromptAfter: number = 0;
    timer: any = null;
    answeredQuestions: Map<number, { most: number; least: number }> = new Map();

    constructor(
        private actions: Actions,
        private store: Store<any>,
        private appService: AppService,
        private messageService: MsgService,
        private router: Router,
        private renderer: Renderer2,
        private mixpanelService: MixpanelService
    ) {
        if (localStorage.getItem('discoveryStatus') === 'true') {
            router.navigate(['dashboard']);
        }
        this.logo = localStorage.getItem('accountLogo');
        this.creditId = localStorage.getItem(K.APP.CREDIT_ID);
        this.personId = Encryption.decryptData(
            localStorage.getItem(K.APP.LOGGED_IN_PERSON_ID) || ''
        );
        this.items = [
            {
                label: 'Logout',
                command: () => this.logout(),
                icon: 'pi pi-fw pi-sign-out'
            }
        ];
        this.selectionOptions = [
            { icon: 'icon-smile', class: 'most', label: 'Most', value: 'most' },
            {
                icon: 'icon-sad-smile',
                class: 'least',
                label: 'Least',
                value: 'least'
            }
        ];
        this.primaryColor = localStorage.getItem('primaryColor');
        this.secondaryColor = localStorage.getItem('secondaryColor');
        this.discoveryType = localStorage.getItem('discoveryType');
        if (this.primaryColor?.toString() == K.APP.DEFAULT_PRIMARY_COLOR) {
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
                this.secondaryColor
            );
            document.documentElement.style.setProperty(
                `--primary-color`,
                this.primaryColor
            );
        }
        this.userObject = Encryption.decryptData(
            localStorage.getItem(K.APP.USER_OBJECT) || ''
        );

        if (this.userObject) {
            this.userObject = JSON.parse(this.userObject);
        }
        this.email = this.userObject?.email;
        this.accountId = localStorage.getItem(K.APP.ACCOUNT_ID_KEY) || '';
        this.username = this.userObject?.fullName;

        this.discoveryType = localStorage.getItem('discoveryType');
        if (this.discoveryType === 'investor') {
            this.instructionsText = {
                p1:
                    'Each question has three statements. You’ll be asked to choose two of the statements for each question – how you <b>most</b> naturally operate and how you <strong>least</strong>  naturally operate. Base your choices on how you act, make decisions, and interact. You might find some questions more difficult than others, go with your intuition and don’t dwell on it.',
                p2:
                    'The questions aren’t focused on money but are designed to help uncover your unconscious behavior. Using a sophisticated calculation, your responses are translated into results on how people like you make decisions about money.',
                p3:
                    'You’ll receive a summary report at the end that will reveal your financial behavior.'
            };
        } else if (this.discoveryType === 'talent') {
            this.instructionsText = {
                p1:
                    'Each question has three statements. You’ll be asked to choose two of the statements for each question – how you <b>most</b> naturally operate and how you <strong>least</strong> naturally operate. Base your choices on how you act, make decisions, and interact. You might find some questions more difficult than others, go with your intuition and don’t dwell on it.',
                p2:
                    'The questions focus on “who you are” and not on “who you want to be.” A scientifically validated calculation will translate your responses into results on how people like you approach work, make decisions, and build relationships.',
                p3:
                    'You’ll see your dashboard at the end that will reveal your workplace talents.'
            };
        }
    }

    speedUpPrompt() {
        this.messageService.speedUpPrompt();
    }

    ngOnInit(): void {
        this.appService.setLegalText();
        this.store.dispatch(
            getQuestionListAction(K.APP.PROFILE_ID, K.APP.LANGUAGE_ID)
        );

        this.mixpanelService.track('Get Question List Request', {
            personId: this.personId,
            accountId: this.accountId,
            email: this.email,
            name: this.username,
            creditId: this.creditId,
            discoveryType: this.discoveryType,
            requestBody: {
                profileId: K.APP.PROFILE_ID,
                languageId: K.APP.LANGUAGE_ID
            }
        });
        this.actions
            .pipe(
                ofType(getQuestionListActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                this.mixpanelService.track('Get Question List Success', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    creditId: this.creditId,
                    discoveryType: this.discoveryType
                });
                this.allQuestions = data;
                this.store.dispatch(getQuestionStatusAction(this.personId));
                this.mixpanelService.track('Get Question Status Request', {
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    creditId: this.creditId,
                    discoveryType: this.discoveryType,
                    requestBody: { personId: this.personId }
                });
            });

        this.actions
            .pipe(
                ofType(getQuestionListActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track('Get Question List Failed', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    creditId: this.creditId,
                    discoveryType: this.discoveryType,
                    errorMessage: error.message,
                    statusCode: error.status
                });
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
                    this.currentQuestionNumber = 1;
                    this.questionProgress = 0;
                } else {
                    this.currentQuestionNumber =
                        response?.body?.data?.discoveryQuestionAnswerDto
                            ?.parentId + 1;
                    this.questionProgress = Math.ceil(
                        ((this.currentQuestionNumber - 1) / 46) * 100
                    );
                    // Restore the last answered question's state if available
                    const lastAnsweredParentId =
                        response?.body?.data?.discoveryQuestionAnswerDto
                            ?.parentId;
                    if (
                        lastAnsweredParentId &&
                        response?.body?.data?.discoveryQuestionAnswerDto
                            ?.question
                    ) {
                        const savedAnswer =
                            response?.body?.data?.discoveryQuestionAnswerDto
                                ?.question;
                        this.answeredQuestions.set(lastAnsweredParentId, {
                            most: savedAnswer.most,
                            least: savedAnswer.least
                        });
                    }
                }
                this.getCurrentQuestion(this.currentQuestionNumber);
                if (this.pageReloded) {
                    this.renderer.addClass(
                        this.animateMe.nativeElement,
                        'modal-anim'
                    );
                    setTimeout(() => {
                        this.renderer.removeClass(
                            this.animateMe.nativeElement,
                            'modal-anim'
                        );
                    }, 500);
                    this.pageReloded = false;
                }
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
                if (this.isdiscoveryCompleted) {
                    this.messageService.successMessage(
                        'All answers submitted successfully.'
                    );
                    if (this.timer) clearTimeout(this.timer);
                    this.router.navigate(['dashboard']);
                } else {
                    this.least = 0;
                    this.most = 0;
                    this.currentQuestion[0].selectedValue = '';
                    this.currentQuestion[1].selectedValue = '';
                    this.currentQuestion[2].selectedValue = '';
                    this.messageService.errorMessage(
                        'Unable to save the answer. Please try again.'
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
            });

        this.actions
            .pipe(
                ofType(saveQuestionAnswerActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(() => {
                console.log(this.showSpeedUpPromptAfter);

                if (
                    this.currentQuestionNumber > 5 &&
                    this.showSpeedUpPromptAfter === 0
                ) {
                    if (this.timer) clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.mixpanelService.track(
                            'Speed up prompt shown',
                            {
                                personId: this.personId,
                                accountId: this.accountId,
                                email: this.email,
                                name: this.username,
                                discoveryType: this.discoveryType,
                                creditID: this.creditId,
                                parentID: this.currentQuestionNumber
                            }
                        );
                        this.speedUpPrompt();
                        this.showSpeedUpPromptAfter = 8;
                    }, 30000);
                } else {
                    if (this.showSpeedUpPromptAfter > 0)
                        this.showSpeedUpPromptAfter--;
                }
                // Store the answered question in the map
                this.answeredQuestions.set(this.currentQuestionNumber, {
                    most: this.most,
                    least: this.least
                });
                this.mixpanelService.track('Question Submission Success', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    discoveryType: this.discoveryType,
                    creditID: this.creditId,
                    parentID: this.currentQuestionNumber,
                    question: {
                        least: this.least,
                        most: this.most
                    }
                });
                if (this.currentQuestionNumber == 46) {
                    this.mixpanelService.track('Discovery Completed', {
                        personId: this.personId,
                        accountId: this.accountId,
                        email: this.email,
                        name: this.username,
                        discoveryType: this.discoveryType
                    });
                    this.store.dispatch(
                        getDiscoveryStatusAction(this.creditId)
                    );
                    this.mixpanelService.track(
                        'Get Discovery Status Request',
                        {
                            personId: this.personId,
                            accountId: this.accountId,
                            email: this.email,
                            name: this.username,
                            discoveryType: this.discoveryType,
                            requestBody: { creditId: this.creditId }
                        }
                    );
                } else {
                    this.renderer.addClass(
                        this.animateMe.nativeElement,
                        'modal-anim'
                    );
                    this.least = 0;
                    this.most = 0;
                    this.goBack = true;
                    this.questionProgress = Math.ceil(
                        (this.currentQuestionNumber / 46) * 100
                    );
                    this.currentQuestionNumber =
                        this.currentQuestionNumber + 1;
                    this.getCurrentQuestion(this.currentQuestionNumber);
                    setTimeout(() => {
                        this.renderer.removeClass(
                            this.animateMe.nativeElement,
                            'modal-anim'
                        );
                    }, 500);
                }
            });

        this.actions
            .pipe(
                ofType(saveQuestionAnswerActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track('Question Submission Failed', {
                    personId: this.personId,
                    accountId: this.accountId,
                    email: this.email,
                    name: this.username,
                    discoveryType: this.discoveryType,
                    creditID: this.creditId,
                    parentID: this.currentQuestionNumber,
                    question: {
                        least: this.least,
                        most: this.most
                    },
                    errorMessage: error.message,
                    statusCode: error.status
                });
                if (this.currentQuestionNumber == 46) {
                    this.store.dispatch(
                        getDiscoveryStatusAction(this.creditId)
                    );
                    this.mixpanelService.track(
                        'Get Discovery Status Request',
                        {
                            personId: this.personId,
                            accountId: this.accountId,
                            email: this.email,
                            name: this.username,
                            discoveryType: this.discoveryType,
                            requestBody: { creditId: this.creditId }
                        }
                    );
                } else {
                    this.least = 0;
                    this.most = 0;
                    this.currentQuestion[0].selectedValue = '';
                    this.currentQuestion[1].selectedValue = '';
                    this.currentQuestion[2].selectedValue = '';
                    this.messageService.errorMessage(
                        'Unable to save the answer. Please try again.'
                    );
                }
            });
        this.store
            .select(state => state.questionnaireReducer)
            .subscribe(response => {
                this.questionListLoading = response?.questionListLoading;
                this.questionStatusLoading = response?.questionStatusLoading;
                this.savingQuestionLoading = response?.savingQuestionLoading;

                if (response?.questionListPayload) {
                }
            });

        this.store
            .select(state => state.instructionsReducer)
            .subscribe(response => {
                this.discoveryStatusLoading = response?.discoveryStatusLoading;
            });
    }

    getCurrentQuestion(parentId: number) {
        if (parentId == 1) {
            this.goBack = false;
        }
        this.currentQuestion = [];

        // Check if this question has been answered before
        const savedAnswer = this.answeredQuestions.get(parentId);
        if (savedAnswer) {
            this.most = savedAnswer.most;
            this.least = savedAnswer.least;
        } else {
            this.most = 0;
            this.least = 0;
        }

        // Build the current question array and restore saved values
        let questionIndex = 0;
        this.allQuestions.forEach(question => {
            if (question.parentId === parentId) {
                let selectedValue = '';
                if (savedAnswer) {
                    const currentIndex = questionIndex + 1;
                    if (savedAnswer.most === currentIndex) {
                        selectedValue = 'most';
                    } else if (savedAnswer.least === currentIndex) {
                        selectedValue = 'least';
                    }
                }
                this.currentQuestion.push({
                    title: question.description.split('~', 2)[0],
                    description: question.description.split('~', 2)[1],
                    selectedValue: selectedValue,
                    parentId: question.parentId
                });
                questionIndex++;
            }
        });
    }

    valueChange(index: number, value: 'most' | 'least', menu: any) {
        menu.hide();

        const isMost = value === 'most';

        if (isMost && this.most !== 0) {
            this.currentQuestion[this.most - 1].selectedValue = '';
        }

        if (!isMost && this.least !== 0) {
            this.currentQuestion[this.least - 1].selectedValue = '';
        }

        this.currentQuestion[index].selectedValue = value;

        if (isMost) {
            this.most = index + 1;

            if (this.most === this.least) {
                this.least = 0;
            }
        } else {
            this.least = index + 1;

            if (this.most === this.least) {
                this.most = 0;
            }
        }

        if (this.most > 0 && this.least > 0) {
            const payload = { most: this.most, least: this.least };

            this.answeredQuestions.set(this.currentQuestionNumber, payload);

            this.mixpanelService.track('Question Submission Request', {
                personId: this.personId,
                accountId: this.accountId,
                email: this.email,
                name: this.username,
                discoveryType: this.discoveryType,
                requestBody: {
                    creditID: this.creditId,
                    parentID: this.currentQuestionNumber,
                    question: payload
                }
            });

            this.store.dispatch(
                saveQuestionAnswerAction({
                    creditID: this.creditId,
                    parentID: this.currentQuestionNumber,
                    question: payload
                })
            );
        }
    }

    previousQuestion(menu: any) {
        menu.hide();
        this.renderer.addClass(this.animateMe.nativeElement, 'modal-anim');
        this.goBack = false;
        this.currentQuestionNumber = this.currentQuestionNumber - 1;
        this.questionProgress = Math.ceil(
            ((this.currentQuestionNumber - 1) / 46) * 100
        );
        this.getCurrentQuestion(this.currentQuestionNumber);
        setTimeout(() => {
            this.renderer.removeClass(
                this.animateMe.nativeElement,
                'modal-anim'
            );
        }, 500);
    }

    nextQuestion(menu: any) {
        menu.hide();

        if (!this.isSelectionValid()) {
            this.triggerInvalidSelectionFeedback();
            return;
        }

        this.handleAnswerSave();

        if (this.isLastQuestion()) {
            this.handleLastQuestion();
        } else {
            this.moveToNextQuestion();
        }
    }

    private isSelectionValid(): boolean {
        return this.most !== 0 && this.least !== 0;
    }

    private triggerInvalidSelectionFeedback(): void {
        this.animate('shake-anim');
        this.messageService.errorMessage(
            'Please select One Least and One Most Option'
        );
    }

    private handleAnswerSave(): void {
        if (!this.answeredQuestions.has(this.currentQuestionNumber)) {
            this.answeredQuestions.set(this.currentQuestionNumber, {
                most: this.most,
                least: this.least
            });

            this.store.dispatch(
                saveQuestionAnswerAction({
                    creditID: this.creditId,
                    parentID: this.currentQuestionNumber,
                    question: { most: this.most, least: this.least }
                })
            );
        }
    }

    private isLastQuestion(): boolean {
        return this.currentQuestionNumber === 46;
    }

    private handleLastQuestion(): void {
        this.store.dispatch(getDiscoveryStatusAction(this.creditId));

        this.mixpanelService.track('Get Discovery Status Request', {
            personId: this.personId,
            accountId: this.accountId,
            email: this.email,
            name: this.username,
            discoveryType: this.discoveryType,
            requestBody: { creditId: this.creditId }
        });
    }

    private moveToNextQuestion(): void {
        this.animate('modal-anim');
        this.resetSelections();

        this.goBack = true;
        this.currentQuestionNumber++;

        this.questionProgress = Math.ceil(
            (this.currentQuestionNumber / 46) * 100
        );

        this.getCurrentQuestion(this.currentQuestionNumber);
    }

    private resetSelections(): void {
        this.least = 0;
        this.most = 0;
    }

    private animate(className: string): void {
        this.renderer.addClass(this.animateMe.nativeElement, className);

        setTimeout(() => {
            this.renderer.removeClass(this.animateMe.nativeElement, className);
        }, 500);
    }

    showInstructionDialog() {
        this.mixpanelService.track('Instructions Viewed from Questionnaire', {
            personId: this.personId,
            accountId: this.accountId
        });
        this.instructionModal = true;
    }

    logout() {
        let discoveryType = localStorage.getItem('discoveryType');
        this.appService.logout(discoveryType);
    }

    ngOnDestroy() {
        if (this.timer) clearTimeout(this.timer);
        this._destroyed$.next(true);
        this._destroyed$.unsubscribe();
    }
}
