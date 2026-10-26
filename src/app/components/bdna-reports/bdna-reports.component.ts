import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import K from 'src/app/constants';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MsgService } from 'src/app/service/msg.service';
import Encryption from 'src/app/util/Encryption';
import { DashboardServiceService } from '../dashboard/dashboard-service.service';
import { getBDNAUniqueStyleVideoLinksAction } from '../dashboard/store/dashboard.actions';
import {
    getCustomReportNameAction,
    getCustomReportNameFailureAction,
    getCustomReportNameSuccessAction
} from '../fdna-reports/store/fdna-reports.actions';
import {
    getBDNA5ScoresAction,
    getBDNADashboardSettingAction,
    getBDNADashboardSettingActionFailure,
    getBDNADashboardSettingActionSuccess,
    getCareerInsightsAction,
    getPerformanceGuideArrayAction,
    getUniqueStyleAndDescriptionAction,
    getUniqueStyleAndDescriptionActionSuccess
} from './store/bdna-reports.actions';

function toTraitKey(name: string): string {
    if (!name) return '';
    const camel = name
        .replace(/\s+(.)/g, (_: string, c: string) => c.toUpperCase())
        .replace(/\W/g, '');
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

@Component({
    selector: 'app-bdna-reports',
    templateUrl: './bdna-reports.component.html',
    styleUrls: ['./bdna-reports.component.scss']
})
export class BdnaReportsComponent implements OnInit, OnDestroy {
    private readonly _destroyed$: Subject<boolean> = new Subject<boolean>();
    langId: any = K.APP.LANGUAGE_ID;
    accountId: any;
    selfRegId: any;
    user_object: any;
    logo: any;
    secondaryColor2: any;
    secondaryColor: any;
    primaryColor: any;
    footerDate: any;
    footerYear: any;
    participantName: any;
    isLoading: any;
    uniqueStyleAndDescription: any;
    dashboardBDNASetting: any;
    performanceGuide: any;
    videoUrl: any;
    scoreBDNA5: any;
    uniqueStyleVideo: string;
    discoveryDto: any;
    showCard: any = {
        video: false,
        performanceKeys: false,
        report: false,
        careerInsights: false,
        workTalents: false,
        isTopTwoTraits: false
    };
    reportColor: any;

    elementType = NgxQrcodeElementTypes.URL;
    correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    isDownloadReady: boolean;
    pageNumber: number = 7;
    canvasPrepared: boolean = false;
    vowels: any = ['a', 'e', 'i', 'o', 'u'];
    word = '';
    careerInsightsData: any;
    reportName: string = 'Work Talent';
    canvasData: any[] = [];
    pdf: any = new jsPDF('p', 'mm', 'letter', true);
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
    desiredTeamRoles: any[] = [];
    desiredWorkEnvironment: any[] = [];
    desiredWorkRewards: any[] = [];
    traitsDescription: any = [];
    firstTraitKey = '';
    secondTraitKey = '';
    firstTraitKeyHeading = '';
    secondTraitKeyHeading = '';
    top2Traits: string[] = [];
    factorRelationships: any = [];
    factorRelationShipName: any;
    coachingReportTraits: any = {};

    constructor(
        private store: Store<{ bdnaReportReducer: any; dashboardReducer: any }>,
        private dashboardService: DashboardServiceService,
        private _location: Location,
        private actions: Actions,
        private router: Router,
        private msgService: MsgService,
        private mixpanelService: MixpanelService
    ) {
        if (localStorage.getItem('discoveryStatus') !== 'true') {
            this.router.navigate(['instructions']);
        }
        this.accountId = localStorage.getItem('accountId');
        this.selfRegId = localStorage.getItem('registrationId');

        this.logo =
            !localStorage.getItem('accountLogo') ||
            localStorage.getItem('accountLogo') === ''
                ? 'assets/images/404-logo.png'
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
            this.reportColor = this.secondaryColor;
        } else {
            this.reportColor = this.primaryColor;
        }
        this.dashboardService.toDataURL(this.logo, (dataUrl: any) => {
            this.logo = dataUrl;
        });
        this.mixpanelService.track('Report Viewed', {
            ...this.user_object,
            discoveryType: 'Talent'
        });
    }

    ngOnInit(): void {
        const { personId } = this.user_object;

        this.store.dispatch(
            getCustomReportNameAction({
                accountId: this.accountId,
                reportId: K.APP.REPORTS.WORK_TALENT_REPORT_ID
            })
        );

        this.store.dispatch(
            getUniqueStyleAndDescriptionAction(personId, this.langId)
        );
        this.store.dispatch(
            getBDNADashboardSettingAction(this.selfRegId, this.accountId)
        );
        this.mixpanelService.track('Report Content Permission Request', {
            ...this.user_object,
            discoveryType: 'talent',
            requestBody: {
                selfRegId: this.selfRegId,
                accountId: this.accountId
            }
        });

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
                    discoveryType: 'talent',
                    accountId: this.accountId,
                    statusCode: error.status,
                    errorMessage: error.message
                });
            });
        this.store.dispatch(
            getPerformanceGuideArrayAction(personId, this.langId)
        );
        this.store.dispatch(getBDNA5ScoresAction(personId, this.langId));
        this.store.dispatch(getCareerInsightsAction(personId));

        this.dashboardService
            .getTScore(personId)
            .pipe(
                takeUntil(this._destroyed$),
                map((response: any) => {
                    const data = response?.body?.data ?? response?.data;
                    const strongest = data?.strogestFactors;
                    if (strongest?.length >= 2) {
                        this.top2Traits = strongest;
                        const [firstTrait, secondTrait] = this.top2Traits;
                        if (firstTrait && secondTrait) {
                            this.firstTraitKey = toTraitKey(firstTrait);
                            this.secondTraitKey = toTraitKey(secondTrait);
                            this.firstTraitKeyHeading = firstTrait;
                            this.secondTraitKeyHeading = secondTrait;
                        }
                    }
                    return response;
                }),
                catchError(error => {
                    this.mixpanelService.track(
                        'Get Assessment Results Failed',
                        {
                            ...this.user_object,
                            discoveryType: 'talent',
                            errorMessage: 'Failed to load assessment results',
                            statusCode: error?.status
                        }
                    );
                    this.msgService.errorMessage(
                        'Failed to load assessment results'
                    );
                    return of(null);
                })
            )
            .subscribe();

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
                catchError(error => {
                    this.mixpanelService.track(
                        'Get Factor Relationship Failed',
                        {
                            ...this.user_object,
                            discoveryType: 'talent',
                            errorMessage: 'Failed to load factor relationship',
                            statusCode: error?.status
                        }
                    );
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
                        this.mixpanelService.track(
                            'Get Coaching Report Traits Failed',
                            {
                                ...this.user_object,
                                discoveryType: 'talent',
                                errorMessage:
                                    'Failed to load coaching report traits data',
                                statusCode: response?.status
                            }
                        );
                        this.msgService.errorMessage(
                            'Failed to load coaching report traits data'
                        );
                    }
                    return response;
                }),
                catchError(error => {
                    this.mixpanelService.track(
                        'Get Coaching Report Traits Failed',
                        {
                            ...this.user_object,
                            discoveryType: 'talent',
                            errorMessage:
                                'Error loading coaching report traits data',
                            statusCode: error?.status
                        }
                    );
                    this.msgService.errorMessage(
                        'Error loading coaching report traits data'
                    );
                    return of(null);
                })
            )
            .subscribe();

        this.actions
            .pipe(
                ofType(getBDNADashboardSettingActionSuccess),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ data }) => {
                this.mixpanelService.track(
                    'Report Content Permissions Success',
                    {
                        ...this.user_object,
                        discoveryType: 'talent',
                        permissions: data
                    }
                );
            });

        this.actions
            .pipe(
                ofType(getBDNADashboardSettingActionFailure),
                takeUntil(this._destroyed$)
            )
            .subscribe(({ error }) => {
                this.mixpanelService.track(
                    'Report Content Permissions Failed',
                    {
                        ...this.user_object,
                        discoveryType: 'talent',
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
                this.store.dispatch(getBDNAUniqueStyleVideoLinksAction());
            });

        this.store
            .select(state => state.dashboardReducer)
            .subscribe(state => {
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
            });

        this.store
            .select(state => state.bdnaReportReducer)
            .subscribe(state => {
                this.isLoading =
                    state.isUniqueStyleLoading ||
                    state.isReportLoading ||
                    state.isDashboardBDNASettingLoading ||
                    state.isPerformanceGuideLoading ||
                    state.isVideoUrlLoading ||
                    state.isScoreBDNA5Loading ||
                    state.isCareerInsightsLoading;
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

                this.dashboardBDNASetting = state.dashboardBDNASettingData;

                this.performanceGuide = state.performanceGuideData?.data;
                this.videoUrl = state.videoUrlData?.data;
                this.scoreBDNA5 = state.scoreBDNA5Data?.data;
                this.careerInsightsData = state.careerInsightsPayload?.talents;
                this.desiredTeamRoles = state.careerInsightsPayload?.roles;
                this.desiredWorkEnvironment =
                    state.careerInsightsPayload?.environments;
                this.desiredWorkRewards = state.careerInsightsPayload?.rewards;

                this.discoveryDto = this.dashboardBDNASetting;

                this.showCard = {
                    workTalents: this.discoveryDto?.isBDNA5KeyWorkTalents,
                    report: this.discoveryDto?.isViewReport,
                    careerInsights: this.discoveryDto?.isDesiredTaskBasedTalent,
                    performanceKeys: this.discoveryDto?.isPGuide,
                    video: this.discoveryDto?.isVideo,
                    isTopTwoTraits: this.discoveryDto?.isTopTwoTraits ?? false
                };

                // this.pageNumber = this.showCard.topTraits ? 5 : 4;

                localStorage.setItem(
                    'discoveryDto',
                    JSON.stringify(this.discoveryDto)
                );
                if (!this.isLoading) {
                    this.scoreBDNA5 = this.dashboardService.parseFDNAandBDNAObjects(
                        this.scoreBDNA5
                    );
                    this.scoreBDNA5.map((talent: any) => {
                        talent['titleSparsed'] = talent?.title?.split(' ');
                    });

                    if (!this.canvasPrepared) {
                        this.setPageNumber();
                        setTimeout(() => {
                            this.prepareCanvas();
                        }, 2000);
                        this.canvasPrepared = true;
                    }
                }
            });
    }

    onBack() {
        this._location.back();
    }

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

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.unsubscribe();
    }
}
