import { Component, Input, OnInit } from '@angular/core';
// import { Color } from 'ng2-charts';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import K from 'src/app/constants';
import { AppService } from 'src/app/service/app.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import Encryption from 'src/app/util/Encryption';
import { getYoutubeEmbedUrl } from 'src/app/util/mediaHelper';
import { DashboardServiceService } from './dashboard-service.service';
import {
    getBDNA5ScoresAction,
    getBDNADashboardSettingAction,
    getBDNADashboardSettingActionFailure,
    getBDNADashboardSettingActionSuccess,
    getBDNAUniqueStyleVideoLinksAction,
    getBehavioralBiasesAction,
    getCareerInsightsAction,
    getFDNA5ScoresAction,
    getFDNADashboardSettingAction,
    getFDNADashboardSettingActionFailure,
    getFDNADashboardSettingActionSuccess,
    getFDNAUniqueStyleVideoLinksAction,
    getMarketMoodArrayAction,
    getPerformanceGuideArrayAction,
    getSubscriptionFeaturesAction,
    getUniqueStyleAndDescriptionAction
} from './store/dashboard.actions';
interface Report {
    name: string;
    code: string;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private readonly _destroyed$: Subject<boolean> = new Subject<boolean>();
    @Input() financialBehaviours: {
        value: number;
        title: string;
        description: string;
    }[];

    display: boolean = false;
    items: MenuItem[];
    report: Report[];
    secondaryColor2: any;
    secondaryColor: any;
    primaryColor: any;
    discoveryType: any;
    user_object: any;
    isLoading: boolean = false;
    uniqueStyleAndDescription: any = null;
    subscriptionFeatures: any = null;
    dashboardBDNASetting: any = null;
    dashboardFDNASetting: any = null;
    performanceGuide: any = null;
    scoreBDNA5: any = null;
    scoreFDNA5: any = null;
    marketMood: any = null;
    behavioralBiases: any = null;
    logo: any;
    langId: any = K.APP.LANGUAGE_ID;
    creditId: any;
    accountId: any;
    selfRegId: any;
    discoveryDto: any;
    uniqueStyleVideo: string;
    marketMoodVideo: string = 'https://www.youtube.com/embed/pcIbrCrxgZA';
    modalVideolink: any;
    biasesVideo: any = {
        firstBiase: '',
        secondBiase: ''
    };
    careerInsightsData: any;
    uniqueStyleThumbnail: string;
    vowels: any = ['a', 'e', 'i', 'o', 'u'];
    word = '';
    displayTrialModal = false;
    timer: any = null;

    showCard: any = {
        video: true,
        performanceKeys: true,
        report: true,
        workTalents: false, // only in Talent case
        careerInsights: false, // only in Talent case
        fbOverview: false, // only in case of investor
        marketMood: false, // only in case of investor
        fbInsights: false, // only in case of investor
        bBiases: false // only in case of investor
    };

    setCardPermissions(userType: string) {
        if (userType === 'investor') {
            this.showCard = {
                ...this.showCard,
                report: this.discoveryDto?.isViewReport,
                video: this.discoveryDto?.isVideo,
                performanceKeys: this.discoveryDto?.isPGuide,
                fbOverview: this.discoveryDto?.isBehavOverview,
                marketMood: this.discoveryDto?.isMarketMood,
                fbInsights: this.discoveryDto?.isFDNA5Score,
                bBiases: this.discoveryDto?.isBehavioralBiases
            };
        } else if (userType === 'talent') {
            this.showCard = {
                ...this.showCard,
                workTalents: this.discoveryDto?.isBDNA5KeyWorkTalents,
                report: this.discoveryDto?.isViewReport,
                careerInsights: this.discoveryDto?.isDesiredTaskBasedTalent,
                performanceKeys: this.discoveryDto?.isPGuide,
                video: this.discoveryDto?.isVideo
            };
        }
    }

    constructor(
        private store: Store<{ dashboardReducer: any }>,
        private appService: AppService,
        private dashboardService: DashboardServiceService,
        private router: Router,
        private mixpanelService: MixpanelService,
        private actions: Actions
    ) {
        if (localStorage.getItem('discoveryStatus') !== 'true') {
            this.router.navigate(['instructions']);
        }
        this.accountId = localStorage.getItem('accountId');
        this.selfRegId = localStorage.getItem('registrationId');
        this.creditId = localStorage.getItem('creditId');
        // this.discoveryDto = localStorage.getItem('discoveryDto');
        // this.discoveryDto = this.discoveryDto && JSON.parse(this.discoveryDto);
        this.logo = localStorage.getItem('accountLogo');
        this.user_object = Encryption.decryptData(
            localStorage.getItem(K.APP.USER_OBJECT) || ''
        );
        if (this.user_object) {
            this.user_object = JSON.parse(this.user_object);
        }
        this.items = [
            {
                label: 'Logout',
                command: () => this.logout(),
                icon: 'pi pi-fw pi-sign-out'
            }
        ];
        this.discoveryType = localStorage.getItem('discoveryType');
        this.primaryColor = localStorage.getItem('primaryColor');
        this.secondaryColor = localStorage.getItem('secondaryColor');
        document.documentElement.style.setProperty(
            `--primary-color`,
            this.primaryColor
        );
        document.documentElement.style.setProperty(
            `--secondary-color`,
            this.secondaryColor
        );

        if (this.primaryColor === K.APP.DEFAULT_PRIMARY_COLOR) {
            this.secondaryColor2 = getComputedStyle(
                document.body
            ).getPropertyValue('--secondary-color2');
        } else {
            this.secondaryColor2 = localStorage.getItem('secondaryColor');
        }

        this.mixpanelService.track('Dashboard Viewed', {
            ...this.user_object,
            discoveryType: this.discoveryType
        });
    }

    ngOnInit(): void {
        const { personId } = this.user_object;
        const currentDate = moment().format('DD-MM-YYYY');
        this.store.dispatch(
            getUniqueStyleAndDescriptionAction(personId, this.langId)
        );
        this.store.dispatch(getBDNAUniqueStyleVideoLinksAction());
        this.store.dispatch(getFDNAUniqueStyleVideoLinksAction());
        this.store.dispatch(getSubscriptionFeaturesAction(this.accountId));
        this.store.dispatch(
            getBDNADashboardSettingAction(this.selfRegId, this.accountId)
        );
        this.store.dispatch(
            getFDNADashboardSettingAction(this.selfRegId, this.accountId)
        );
        this.mixpanelService.track('Dashboard Cards Permission Request', {
            ...this.user_object,
            discoveryType: this.discoveryType,
            requestBody: {
                selfRegId: this.selfRegId,
                accountId: this.accountId
            }
        });
        this.store.dispatch(
            getPerformanceGuideArrayAction(personId, this.langId)
        );
        this.store.dispatch(getBDNA5ScoresAction(personId, this.langId));
        this.store.dispatch(getFDNA5ScoresAction(personId, this.langId));
        this.store.dispatch(
            getMarketMoodArrayAction(personId, -1, currentDate)
        );
        this.store.dispatch(getBehavioralBiasesAction(personId, this.langId));
        this.store.dispatch(getCareerInsightsAction(personId));

        // clearTimeout(this.timer);
        // this.timer = setTimeout(() => {
        //     this.mixpanelService.track('Personal trial popup shown', {
        //         personId: personId,
        //         accountId: this.accountId,
        //     })
        //     this.displayTrialModal = true
        // }, 10000);
        this.actions
            .pipe(
                ofType(getFDNADashboardSettingActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                if (this.discoveryType === 'investor') {
                    this.mixpanelService.track(
                        'Dashboard Cards Permissions Success',
                        {
                            ...this.user_object,
                            discoveryType: this.discoveryType,
                            permissions: data
                        }
                    );
                }
            });

        this.actions
            .pipe(
                ofType(getFDNADashboardSettingActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                if (this.discoveryType === 'investor') {
                    this.mixpanelService.track(
                        'Dashboard Cards Permissions Failed',
                        {
                            ...this.user_object,
                            discoveryType: this.discoveryType,
                            errorMessage: error.message,
                            statusCode: error.status
                        }
                    );
                }
            });

        this.actions
            .pipe(
                ofType(getBDNADashboardSettingActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                if (this.discoveryType === 'talent') {
                    this.mixpanelService.track(
                        'Dashboard Cards Permissions Success',
                        {
                            ...this.user_object,
                            discoveryType: this.discoveryType,
                            permissions: data
                        }
                    );
                }
            });

        this.actions
            .pipe(
                ofType(getBDNADashboardSettingActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                if (this.discoveryType === 'talent') {
                    this.mixpanelService.track(
                        'Dashboard Cards Permissions Failed',
                        {
                            ...this.user_object,
                            discoveryType: this.discoveryType,
                            errorMessage: error.message,
                            statusCode: error.status
                        }
                    );
                }
            });

        this.store
            .select(state => state.dashboardReducer)
            .subscribe(state => {
                this.isLoading =
                    state.isUniqueStyleLoading ||
                    state.isSubscriptionFeaturesLoading ||
                    state.isDashboardBDNASettingLoading ||
                    state.isDashboardFDNASettingLoading ||
                    state.isPerformanceGuideLoading ||
                    state.isScoreBDNA5Loading ||
                    state.isScoreFDNA5Loading ||
                    state.isMarketMoodLoading ||
                    state.isBehavioralBiasesLoading ||
                    state.isCareerInsightsLoading;

                this.uniqueStyleAndDescription =
                    state.uniqueStyleAndDescriptionData?.data;
                this.subscriptionFeatures =
                    state.subscriptionFeaturesData?.data;
                this.dashboardBDNASetting = state.dashboardBDNASettingData;
                this.dashboardFDNASetting = state.dashboardFDNASettingData;
                this.performanceGuide = state.performanceGuideData?.data;
                this.scoreBDNA5 = state.scoreBDNA5Data?.data;
                this.scoreFDNA5 = state.scoreFDNA5Data?.data;
                this.careerInsightsData = state.careerInsightsPayload?.talents;

                let uniqueStyle = this.uniqueStyleAndDescription
                    ?.behaviorTypeName;

                if (this.discoveryType === 'investor') {
                    const fdnaVideoMap: { [key: string]: string } = {};
                    state.fDNAUniqueStyleVideoLinksData?.value.forEach(
                        (item: any) => {
                            fdnaVideoMap[item.UniqueStyle] = item.videoURL;
                        }
                    );
                    this.uniqueStyleVideo =
                        fdnaVideoMap[
                            this.uniqueStyleAndDescription?.behaviorTypeName
                        ];
                } else if (this.discoveryType === 'talent') {
                    const bdnaVideoMap: { [key: string]: string } = {};
                    state.bDNAUniqueStyleVideoLinksData?.value.forEach(
                        (item: any) => {
                            bdnaVideoMap[item.UniqueStyle] = item.videoURL;
                        }
                    );
                    this.uniqueStyleVideo =
                        bdnaVideoMap[
                            this.uniqueStyleAndDescription?.behaviorTypeName
                        ];
                }
                this.mixpanelService.addUser(this.user_object.email);
                this.mixpanelService.createProfile({
                    UniqueStyle: uniqueStyle
                });

                if (
                    this.vowels.includes(
                        this.uniqueStyleAndDescription?.behaviorTypeName[0].toLowerCase()
                    )
                ) {
                    this.word = 'An';
                } else {
                    this.word = 'A';
                }

                this.uniqueStyleThumbnail =
                    K.APP.UNIQUE_STYLE_THUMBNAIL[uniqueStyle];

                this.marketMood = state.marketMoodData?.data;
                this.behavioralBiases = state.behavioralBiasesData?.data;

                if (this.discoveryType === 'investor') {
                    this.discoveryDto = this.dashboardFDNASetting;
                } else if (this.discoveryType === 'talent') {
                    this.discoveryDto = this.dashboardBDNASetting;
                }

                this.setCardPermissions(this.discoveryType);

                localStorage.setItem(
                    'discoveryDto',
                    JSON.stringify(this.discoveryDto)
                );
                if (!this.isLoading) {
                    this.scoreFDNA5 = this.dashboardService.parseFDNAandBDNAObjects(
                        this.scoreFDNA5
                    );
                    this.scoreBDNA5 = this.dashboardService.parseFDNAandBDNAObjects(
                        this.scoreBDNA5
                    );
                    this.scoreBDNA5.map((talent: any) => {
                        talent['titleSparsed'] = talent?.title?.split(' ');
                    });
                    this.behavioralBiases = this.dashboardService.parseBehaviorBiasesList(
                        this.behavioralBiases
                    );
                    let biaseName: string = this.behavioralBiases[0]?.name;
                    this.biasesVideo.firstBiase =
                        K.APP.BEHAVIORAL_BIASES_VIDEOS[biaseName];
                    biaseName = this.behavioralBiases[1]?.name;
                    this.biasesVideo.secondBiase =
                        K.APP.BEHAVIORAL_BIASES_VIDEOS[biaseName];
                    this.marketMood = {
                        ...this.marketMood,
                        marketMoodDescriptions: this.dashboardService.removeBoldTagFromMoodData(
                            this.marketMood?.marketMoodDescriptions
                        )
                    };
                }
            });
    }

    logout() {
        this.appService.logout(this.discoveryType);
    }

    viewReport() {
        if (this.discoveryType === 'investor') {
            this.router.navigate(['/fdna-report']);
        } else if (this.discoveryType === 'talent') {
            this.router.navigate(['/bdna-report']);
        }
    }

    showDialog(dialogType: any) {
        if (dialogType == 'uniqueStyle') {
            this.modalVideolink = getYoutubeEmbedUrl(this.uniqueStyleVideo);
        } else if (dialogType == 'marketMood') {
            this.modalVideolink = this.marketMoodVideo;
        } else if (dialogType == 'biase0') {
            this.modalVideolink = this.biasesVideo.firstBiase;
        } else if (dialogType == 'biase1') {
            this.modalVideolink = this.biasesVideo.secondBiase;
        }
        this.display = true;
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.unsubscribe();
    }
}
