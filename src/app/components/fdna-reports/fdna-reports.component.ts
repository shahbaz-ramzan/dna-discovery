import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    NgxQrcodeElementTypes,
    NgxQrcodeErrorCorrectionLevels
} from '@techiediaries/ngx-qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { Subject, of } from 'rxjs';
import { takeUntil, map, catchError } from 'rxjs/operators';
import K from 'src/app/constants';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MsgService } from 'src/app/service/msg.service';
import Encryption from 'src/app/util/Encryption';
import { DashboardServiceService } from '../dashboard/dashboard-service.service';
import { getFDNAUniqueStyleVideoLinksAction } from '../dashboard/store/dashboard.actions';
import {
    getBehavioralBiasesAction,
    getCustomReportNameAction,
    getCustomReportNameSuccessAction,
    getCustomReportNameFailureAction,
    getFDNA5ScoresAction,
    getFDNADashboardSettingAction,
    getFDNADashboardSettingActionSuccess,
    getFDNADashboardSettingActionFailure,
    getFDNAFinancialPlanningInsightsAction,
    getFDNAFinancialPlanningInsightsActionSuccess,
    getFDNAFinancialPlanningInsightsActionFailure,
    getTScoreAction,
    getRiskAllocationAction,
    getRiskAllocationActionSuccess,
    getRiskAllocationActionFailure,
    getMarketMoodArrayAction,
    getPerformanceGuideArrayAction,
    getUniqueStyleAndDescriptionAction,
    getUniqueStyleAndDescriptionActionSuccess,
    getVideoUrlAction
} from './store/fdna-reports.actions';

function toTraitKey(name: string): string {
    if (!name) return '';
    const camel = name
        .replace(/\s+(.)/g, (_: string, c: string) => c.toUpperCase())
        .replace(/\W/g, '');
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

@Component({
    selector: 'app-fdna-reports',
    templateUrl: './fdna-reports.component.html',
    styleUrls: ['./fdna-reports.component.scss']
})
export class FdnaReportsComponent implements OnInit {
    private readonly _destroyed$: Subject<boolean> = new Subject<boolean>();
    langId: any = K.APP.LANGUAGE_ID;
    accountId: any;
    selfRegId: any;
    user_object: any;
    logo: any;
    secondaryColor2: any;
    secondaryColor: any;
    primaryColor: any;
    participantName: string;
    footerYear: string;
    footerDate: string;
    reportColor: any;

    isLoading: any;
    uniqueStyleAndDescription: any;
    dashboardFDNASetting: any;
    performanceGuide: any;
    videoUrl: any;
    scoreFDNA5: any;
    uniqueStyleVideo: string;
    marketMood: any;
    behavioralBiases: any;
    discoveryDto: any;
    biasesVideo: any = {
        firstBiase: '',
        secondBiase: ''
    };
    marketMoodVideo: string = 'https://www.youtube.com/embed/pcIbrCrxgZA';
    showCard: any = {
        video: false,
        performanceKeys: false,
        isTopTwoTraits: false,
        financialPlanningInsights: false,
        riskPortfolioGroup: false,
        bBiases: false,
        fbOverview: false,
        marketMood: false,
        fbInsights: false,
        report: false,
        interactiveInsights: false
    };
    firstTraitKey = '';
    secondTraitKey = '';
    firstTraitKeyHeading = '';
    secondTraitKeyHeading = '';
    top2Traits: string[] = [];
    factorRelationships: any = [];
    factorRelationShipName: any;
    coachingReportTraits: any = {};
    financialPlanningInsights: any[] = [];
    financialPlanningInsightsData: any[] = [];
    riskGroup: number;
    riskGroupData: any[] = [];
    elementType = NgxQrcodeElementTypes.URL;
    correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    isDownloadReady: boolean;
    pageNumber: number = 10;
    canvasPrepared: boolean = false;
    vowels: any = ['a', 'e', 'i', 'o', 'u'];
    word = '';
    reportName: string = 'Financial Behavior';
    pageNumberMap = new Map();
    uniqueStyleImages: any = {
        Influencer:
            '../../../../../../assets/images/Unique_Style_images/1 Influencer.svg',
        Engager:
            '../../../../../../assets/images/Unique_Style_images/2 Engager.svg',
        'Community Builder':
            '../../../../../../assets/images/Unique_Style_images/3 CommunityBuilder.svg',
        'Relationship Builder':
            '../../../../../../assets/images/Unique_Style_images/4 RelationshipBuilder.svg',
        Facilitator:
            '../../../../../../assets/images/Unique_Style_images/5 Facilitator.svg',
        Adapter:
            '../../../../../../assets/images/Unique_Style_images/6 Adapter.svg',
        'Stylish Thinker':
            '../../../../../../assets/images/Unique_Style_images/7 StylishThinker.svg',
        'Reflective Thinker':
            '../../../../../../assets/images/Unique_Style_images/9 ReflectiveThinker.svg',
        Strategist:
            '../../../../../../assets/images/Unique_Style_images/10 Strategist.svg',
        Initiator:
            '../../../../../../assets/images/Unique_Style_images/11 Initiator.svg'
    };

    constructor(
        private store: Store<{
            fdnaReportReducer: any;
            dashboardReducer: any;
        }>,
        private _location: Location,
        private dashboardService: DashboardServiceService,
        private router: Router,
        private mixpanelService: MixpanelService,
        private actions: Actions,
        private msgService: MsgService
    ) {
        if (localStorage.getItem('discoveryStatus') !== 'true') {
            this.router.navigate(['instructions']);
        }
        this.accountId = localStorage.getItem('accountId');
        this.selfRegId = localStorage.getItem('registrationId');

        this.logo =
            !localStorage.getItem('accountLogo') ||
            localStorage.getItem('accountLogo') === ''
                ? "'assets/images/404-logo.png'"
                : localStorage.getItem('accountLogo');

        this.user_object = Encryption.decryptData(
            localStorage.getItem(K.APP.USER_OBJECT) || ''
        );
        if (this.user_object) {
            this.user_object = JSON.parse(this.user_object);
        }
        this.participantName =
            this.user_object.fisrtName + ' ' + this.user_object.lastName;
        this.footerYear = moment(new Date()).format('YYYY');
        this.footerDate = moment(new Date()).format('DD-MMM-YY');

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
            this.reportColor = this.secondaryColor2;
        } else {
            this.secondaryColor2 = localStorage.getItem('secondaryColor');
            this.reportColor = this.primaryColor;
        }
        this.dashboardService.toDataURL(this.logo, (dataUrl: any) => {
            this.logo = dataUrl;
        });
        this.mixpanelService.track('Report Viewed', {
            ...this.user_object,
            discoveryType: 'Investor'
        });
    }

    ngOnInit(): void {
        const { personId } = this.user_object;
        const currentDate = moment().format('DD-MM-YYYY');

        this.store.dispatch(
            getCustomReportNameAction({
                accountId: this.accountId,
                reportId: K.APP.REPORTS.FINANCIAL_BEHAVIOR_REPORT_ID
            })
        );

        this.store.dispatch(
            getUniqueStyleAndDescriptionAction(personId, this.langId)
        );
        this.store.dispatch(
            getFDNADashboardSettingAction(this.selfRegId, this.accountId)
        );
        this.mixpanelService.track('Report Content Permission Request', {
            ...this.user_object,
            discoveryType: 'investor',
            requestBody: {
                selfRegId: this.selfRegId,
                accountId: this.accountId
            }
        });
        this.store.dispatch(
            getPerformanceGuideArrayAction(personId, this.langId)
        );
        this.store.dispatch(getVideoUrlAction(personId));

        this.store.dispatch(getFDNA5ScoresAction(personId, this.langId));
        this.store.dispatch(
            getMarketMoodArrayAction(personId, -1, currentDate)
        );
        this.store.dispatch(getBehavioralBiasesAction(personId, this.langId));
        this.store.dispatch(
            getFDNAFinancialPlanningInsightsAction(personId, this.langId)
        );
        this.store.dispatch(getTScoreAction(personId));
        this.store.dispatch(getRiskAllocationAction(personId));

        this.dashboardService
            .getFactorRelationship()
            .pipe(
                takeUntil(this._destroyed$),
                map((response: any) => {
                    const value = response?.body?.value ?? response?.value;
                    if (value?.length) {
                        this.factorRelationships = value;
                        if (this.top2Traits?.length >= 2) {
                            const key = `${this.top2Traits[0]}_${this.top2Traits[1]}`;
                            this.factorRelationShipName = this.factorRelationships.find(
                                (el: any) => el?.FactorName === key
                            );
                        }
                    }
                    return response;
                }),
                catchError((error) => {
                    this.mixpanelService.track('Get Factor Relationship Failed', {
                        ...this.user_object,
                        discoveryType: 'investor',
                        errorMessage: 'Failed to load factor relationship',
                        statusCode: error?.status
                    });
                    this.msgService.errorMessage(
                        'Failed to load factor relationship'
                    );
                    return of(null);
                })
            )
            .subscribe();

        this.dashboardService
            .getCoachingReportTraitsData()
            .pipe(
                takeUntil(this._destroyed$),
                map((response: any) => {
                    const value = response?.body?.value ?? response?.value;
                    if (response?.status === 200 || value) {
                        const traitsObj = Array.isArray(value)
                            ? value.find(
                                  (el: any) =>
                                      el?.TraitsName === 'TraitsDescription'
                              )
                            : value;
                        this.coachingReportTraits = traitsObj || {};
                    } else {
                        this.mixpanelService.track('Get Coaching Report Traits Failed', {
                            ...this.user_object,
                            discoveryType: 'investor',
                            errorMessage: 'Failed to load coaching report traits data',
                            statusCode: response?.status
                        });
                        this.msgService.errorMessage(
                            'Failed to load coaching report traits data'
                        );
                    }
                    return response;
                }),
                catchError((error) => {
                    this.mixpanelService.track('Get Coaching Report Traits Failed', {
                        ...this.user_object,
                        discoveryType: 'investor',
                        errorMessage: 'Error loading coaching report traits data',
                        statusCode: error?.status
                    });
                    this.msgService.errorMessage(
                        'Error loading coaching report traits data'
                    );
                    return of(null);
                })
            )
            .subscribe();

        this.actions
            .pipe(
                ofType(getCustomReportNameSuccessAction),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                if (data?.customReports?.length) {
                    this.reportName = data?.customReports[0]?.customReportName;
                } else {
                    this.reportName = data?.reportsList[0]?.reportName;
                }
            });

        this.actions
            .pipe(
                ofType(getCustomReportNameFailureAction),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track('Get Custom Report Name Failed', {
                    ...this.user_object,
                    discoveryType: 'investor',
                    accountId: this.accountId,
                    statusCode: error.status,
                    errorMessage: error.message
                });
            });

        this.actions
            .pipe(
                ofType(getFDNAFinancialPlanningInsightsActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                this.financialPlanningInsights = Array.from(
                    { length: 13 },
                    (_, i) => data?.[`insight${i + 1}`]
                ).filter(Boolean);
            });

        this.actions
            .pipe(
                ofType(getFDNAFinancialPlanningInsightsActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track('Get FDNA Financial Planning Insights Failed', {
                    ...this.user_object,
                    discoveryType: 'investor',
                    statusCode: error.status,
                    errorMessage: error.message
                });
            });

        this.actions
            .pipe(
                ofType(getRiskAllocationActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                console.log('Risk Allocation Data: ', data?.riskGroup);
                this.riskGroup = data?.riskGroup;
            });

        this.actions
            .pipe(
                ofType(getRiskAllocationActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track('Get Risk Allocation Failed', {
                    ...this.user_object,
                    discoveryType: 'investor',
                    statusCode: error.status,
                    errorMessage: error.message
                });
            });

        this.actions
            .pipe(
                ofType(getFDNADashboardSettingActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                this.mixpanelService.track(
                    'Report Content Permissions Success',
                    {
                        ...this.user_object,
                        discoveryType: 'investor',
                        permissions: data
                    }
                );
            });

        this.actions
            .pipe(
                ofType(getFDNADashboardSettingActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track(
                    'Report Content Permissions Failed',
                    {
                        ...this.user_object,
                        discoveryType: 'investor',
                        errorMessage: error.message,
                        statusCode: error.status
                    }
                );
            });

        this.actions
            .pipe(
                ofType(getUniqueStyleAndDescriptionActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ response }) => {
                this.store.dispatch(getFDNAUniqueStyleVideoLinksAction());
            });

        this.store
            .select(state => state.dashboardReducer)
            .subscribe(state => {
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
            });

        this.store
            .select(state => state.fdnaReportReducer)
            .subscribe(state => {
                this.isLoading =
                    state.isReportLoading ||
                    state.isUniqueStyleLoading ||
                    state.isDashboardFDNASettingLoading ||
                    state.isPerformanceGuideLoading ||
                    state.isVideoUrlLoading ||
                    state.isScoreFDNA5Loading ||
                    state.isMarketMoodLoading ||
                    state.isBehavioralBiasesLoading ||
                    state.isFinancialPlanningInsightsLoading ||
                    state.isTScoreLoading ||
                    state.isRiskAllocationLoading;

                const riskAllocationData =
                    state.riskAllocationData?.data ?? state.riskAllocationData;
                if (
                    riskAllocationData != null &&
                    typeof riskAllocationData.riskGroup === 'number'
                ) {
                    this.riskGroup = riskAllocationData.riskGroup;
                }

                const tScoreData = state.tScoreData?.data ?? state.tScoreData;
                const strongest = tScoreData?.strogestFactors;
                if (strongest?.length >= 2) {
                    this.top2Traits = strongest;
                }
                if (this.top2Traits?.length >= 2) {
                    const [firstTrait, secondTrait] = this.top2Traits;
                    if (firstTrait && secondTrait) {
                        this.firstTraitKey = toTraitKey(firstTrait);
                        this.secondTraitKey = toTraitKey(secondTrait);
                        this.firstTraitKeyHeading = firstTrait;
                        this.secondTraitKeyHeading = secondTrait;
                    }
                }

                this.uniqueStyleAndDescription =
                    state.uniqueStyleAndDescriptionData?.data;

                if (
                    this.vowels.includes(
                        this.uniqueStyleAndDescription?.behaviorTypeName[0].toLowerCase()
                    )
                ) {
                    this.word = 'An';
                } else {
                    this.word = 'A';
                }

                this.dashboardFDNASetting = state.dashboardFDNASettingData;
                this.performanceGuide = state.performanceGuideData?.data;
                this.videoUrl = state.videoUrlData?.data;
                this.scoreFDNA5 = state.scoreFDNA5Data?.data;

                this.marketMood = state.marketMoodData?.data;
                this.behavioralBiases = state.behavioralBiasesData?.data;

                this.discoveryDto = this.dashboardFDNASetting;

                this.showCard = {
                    ...this.showCard,
                    report: this.discoveryDto?.isViewReport,
                    video: this.discoveryDto?.isVideo,
                    performanceKeys: this.discoveryDto?.isPGuide,
                    fbOverview: this.discoveryDto?.isBehavOverview,
                    marketMood: this.discoveryDto?.isMarketMood,
                    fbInsights: this.discoveryDto?.isFDNA5Score,
                    bBiases: this.discoveryDto?.isBehavioralBiases,
                    financialPlanningInsights:
                        this.discoveryDto?.isFinancialPlanningInsights ?? false,
                    riskPortfolioGroup:
                        this.discoveryDto?.isRiskPortfolioGroup ?? false,
                    isTopTwoTraits: this.discoveryDto?.isTopTwoTraits ?? false,
                    interactiveInsights:
                        this.discoveryDto?.isInteractiveInsights ?? false
                };

                if (
                    this.top2Traits?.length >= 2 &&
                    this.factorRelationships?.length &&
                    !this.factorRelationShipName
                ) {
                    const key = `${this.top2Traits[0]}_${this.top2Traits[1]}`;
                    this.factorRelationShipName = this.factorRelationships.find(
                        (el: any) => el?.FactorName === key
                    );
                }

                localStorage.setItem(
                    'discoveryDto',
                    JSON.stringify(this.discoveryDto)
                );
                if (!this.isLoading) {
                    this.scoreFDNA5 = this.dashboardService.parseFDNAandBDNAObjects(
                        this.scoreFDNA5
                    );

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
                    if (!this.canvasPrepared) {
                        this.setPageNumber();
                        this.prepareCanvas();
                        this.canvasPrepared = true;
                    }
                }
            });
    }
    onBack() {
        this._location.back();
    }

    canvasData: any[] = [];
    pdf: any = new jsPDF('p', 'mm', 'letter', true);
    async prepareCanvas() {
        this.isDownloadReady = false;
        for (let i = 1; i <= this.pageNumber; i++) {
            var data: any = document.getElementById(i.toString());
            if (data) {
                data.style.fontFeatureSettings = '"liga" 0';
                const canvas = await html2canvas(data, { scale: 3 });
                this.canvasData.push(canvas);
                var imgWidth = 215;
                var imgHeight = (canvas.height * imgWidth) / canvas.width;
                let contentDataURL = canvas.toDataURL('image/png');
                this.pdf.addPage();
                this.pdf.addImage(
                    contentDataURL,
                    'PNG',
                    0,
                    0,
                    imgWidth,
                    imgHeight,
                    undefined,
                    'FAST'
                );
            }
        }
        this.pdf.deletePage(1);
        this.isDownloadReady = true;
    }

    setPageNumber() {
        let currentPageNumber = 0;
        for (let i = 1; i <= this.pageNumber; i++) {
            var data: any = document.getElementById(i.toString());
            if (data) {
                currentPageNumber++;
                this.pageNumberMap.set(data.id, currentPageNumber);
            }
        }
    }

    downloadPdf() {
        this.msgService.successMessage(
            "Report Downloading... Access the report in your 'Downloads' folder"
        );
        this.mixpanelService.track('Report Downloaded', {
            ...this.user_object,
            reportType: this.reportName
        });
        this.pdf.save(`${this.reportName} Report.pdf`);
    }

    loadText() {
        let dotCount = 1 + (this.canvasData.length % 3);
        let text = 'Preparing Download' + '.'.repeat(dotCount);
        return text;
    }
    getCurrentUniqueStyleImage(): string {
        return (
            this.uniqueStyleImages[
                this.uniqueStyleAndDescription?.behaviorTypeName
            ] || ''
        );
    }

    getPrimaryColor(condition: boolean) {
        return {
            backgroundColor: condition ? this.reportColor : '',
            color: condition ? 'white' : ''
        };
    }
    getThumbPosition(value: number) {
        switch (value) {
            case 1:
                return 7;
            case 2:
                return 22;
            case 3:
                return 39;
            case 4:
                return 53;
            case 5:
                return 68;
            case 6:
                return 82;
            case 7:
                return 97;
            default:
                return null;
        }
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.unsubscribe();
    }
}
