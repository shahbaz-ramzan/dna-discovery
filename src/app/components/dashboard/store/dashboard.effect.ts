import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { catchApiError } from 'src/app/service/api-error';
import { DashboardServiceService } from '../dashboard-service.service';
import {
    CHANGE_ACCOUNT_PASSWORD_ACTION,
    CHANGE_ACCOUNT_PASSWORD_ACTION_SUCCESS,
    CHANGE_INVESTOR_PASSWORD_ACTION,
    CHANGE_INVESTOR_PASSWORD_ACTION_SUCCESS,
    GET_BDNA5_SCORE_ACTION,
    GET_BDNA5_SCORE_ACTION_SUCCESS,
    GET_BDNA_DASHBOARD_SETTING_ACTION,
    GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION,
    GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_SUCCESS,
    GET_BEHAVIORAL_BIASES_ACTION,
    GET_BEHAVIORAL_BIASES_ACTION_SUCCESS,
    GET_CAREER_INSIGHTS_ACTION,
    GET_CAREER_INSIGHTS_ACTION_SUCCESS,
    GET_FDNA5_SCORE_ACTION,
    GET_FDNA5_SCORE_ACTION_SUCCESS,
    GET_FDNA_DASHBOARD_SETTING_ACTION,
    GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION,
    GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_SUCCESS,
    GET_MARKET_MOOD_ARRAY_ACTION,
    GET_MARKET_MOOD_ARRAY_ACTION_SUCCESS,
    GET_PERFORMANCE_GUIDE_ACTION,
    GET_PERFORMANCE_GUIDE_ACTION_SUCCESS,
    GET_SUBSCRIPTION_FEATURES_ACTION,
    GET_SUBSCRIPTION_FEATURES_ACTION_SUCCESS,
    GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION,
    GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION_SUCCESS,
    GET_VIDEO_URL_ACTION,
    GET_VIDEO_URL_ACTION_SUCCESS
} from './dashboard-actions-constants';
import {
    changeAccountPasswordActionFailure,
    changeInvestorPasswordActionFailure,
    getBDNA5ScoresActionFailure,
    getBDNADashboardSettingActionFailure,
    getBDNADashboardSettingActionSuccess,
    getBDNAUniqueStyleVideoLinksActionFailure,
    getBehavioralBiasesActionFailure,
    getCareerInsightsActionFailure,
    getFDNA5ScoresActionFailure,
    getFDNADashboardSettingActionFailure,
    getFDNADashboardSettingActionSuccess,
    getFDNAUniqueStyleVideoLinksActionFailure,
    getMarketMoodArrayActionFailure,
    getPerformanceGuideArrayActionFailure,
    getSubscriptionFeaturesActionFailure,
    getUniqueStyleAndDescriptionActionFailure,
    getVideoUrlActionFailure
} from './dashboard.actions';
@Injectable()
export class DashboardEffect {
    constructor(
        private actions$: Actions,
        private dashboardService: DashboardServiceService
    ) {}

    getUniqueStyleandDescription = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION),
            mergeMap(({ personId, languageId }) =>
                this.dashboardService
                    .getUniqueStyleandDescription(personId, languageId)
                    .pipe(
                        map(response => ({
                            type: GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION_SUCCESS,
                            response
                        })),
                        catchApiError(error =>
                            getUniqueStyleAndDescriptionActionFailure(error)
                        )
                    )
            )
        )
    );

    getSuscriptionFeatures = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_SUBSCRIPTION_FEATURES_ACTION),
            mergeMap(({ accountId }) =>
                this.dashboardService.getSubscriptionFeatures(accountId).pipe(
                    map(response => ({
                        type: GET_SUBSCRIPTION_FEATURES_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error =>
                        getSubscriptionFeaturesActionFailure(error)
                    )
                )
            )
        )
    );

    getBDNAUniqueStyleVideoLinks = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION),
            mergeMap(() =>
                this.dashboardService.getBDNAUniqueStyleVideoLinks().pipe(
                    map(response => ({
                        type: GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error =>
                        getBDNAUniqueStyleVideoLinksActionFailure(error)
                    )
                )
            )
        )
    );

    getFDNAUniqueStyleVideoLinks = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION),
            mergeMap(() =>
                this.dashboardService.getFDNAUniqueStyleVideoLinks().pipe(
                    map(response => ({
                        type: GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error =>
                        getFDNAUniqueStyleVideoLinksActionFailure(error)
                    )
                )
            )
        )
    );

    // Single shared listener for GET_BDNA_DASHBOARD_SETTING_ACTION - dashboard.component.ts and
    // bdna-reports.component.ts both dispatch it, but only one effect now handles it (see
    // dashboard.actions.ts and STATUS_CODE_MIGRATION_PLAN.md §3a for why there used to be two).
    getBDNADashboardSetting = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_BDNA_DASHBOARD_SETTING_ACTION),
            mergeMap(({ selfRegistrationId, accountId }) =>
                this.dashboardService
                    .getBDNADashboardSetting(selfRegistrationId, accountId)
                    .pipe(
                        map(response =>
                            getBDNADashboardSettingActionSuccess(
                                (response?.body as any)?.data
                            )
                        ),
                        catchApiError(error =>
                            getBDNADashboardSettingActionFailure(error)
                        )
                    )
            )
        )
    );

    // Single shared listener for GET_FDNA_DASHBOARD_SETTING_ACTION - see comment above.
    getFDNADashboardSetting = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_FDNA_DASHBOARD_SETTING_ACTION),
            mergeMap(({ selfRegistrationId, accountId }) =>
                this.dashboardService
                    .getFDNADashboardSetting(selfRegistrationId, accountId)
                    .pipe(
                        map(response =>
                            getFDNADashboardSettingActionSuccess(
                                (response?.body as any)?.data
                            )
                        ),
                        catchApiError(error =>
                            getFDNADashboardSettingActionFailure(error)
                        )
                    )
            )
        )
    );

    getPerformanceGuide = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_PERFORMANCE_GUIDE_ACTION),
            mergeMap(({ personId, languageId }) =>
                this.dashboardService
                    .getPerformanceGuide(personId, languageId)
                    .pipe(
                        map(response => ({
                            type: GET_PERFORMANCE_GUIDE_ACTION_SUCCESS,
                            response
                        })),
                        catchApiError(error =>
                            getPerformanceGuideArrayActionFailure(error)
                        )
                    )
            )
        )
    );

    getVideoUrl = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_VIDEO_URL_ACTION),
            mergeMap(({ personId }) =>
                this.dashboardService.getVideoUrl(personId).pipe(
                    map(response => ({
                        type: GET_VIDEO_URL_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error => getVideoUrlActionFailure(error))
                )
            )
        )
    );

    getBDNA5Scores = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_BDNA5_SCORE_ACTION),
            mergeMap(({ personId, languageId }) =>
                this.dashboardService.getBDNA5Scores(personId, languageId).pipe(
                    map(response => ({
                        type: GET_BDNA5_SCORE_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error => getBDNA5ScoresActionFailure(error))
                )
            )
        )
    );

    getFDNA5Scores = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_FDNA5_SCORE_ACTION),
            mergeMap(({ personId, languageId }) =>
                this.dashboardService.getFDNA5Scores(personId, languageId).pipe(
                    map(response => ({
                        type: GET_FDNA5_SCORE_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error => getFDNA5ScoresActionFailure(error))
                )
            )
        )
    );

    getMarketMoodArray = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_MARKET_MOOD_ARRAY_ACTION),
            mergeMap(({ personId, portfolioValue, date }) =>
                this.dashboardService
                    .getMarketMoodArray(personId, portfolioValue, date)
                    .pipe(
                        map(response => ({
                            type: GET_MARKET_MOOD_ARRAY_ACTION_SUCCESS,
                            response
                        })),
                        catchApiError(error =>
                            getMarketMoodArrayActionFailure(error)
                        )
                    )
            )
        )
    );

    getBehavioralBiases = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_BEHAVIORAL_BIASES_ACTION),
            mergeMap(({ personId, languageId }) =>
                this.dashboardService
                    .getBehavioralBiases(personId, languageId)
                    .pipe(
                        map(response => ({
                            type: GET_BEHAVIORAL_BIASES_ACTION_SUCCESS,
                            response
                        })),
                        catchApiError(error =>
                            getBehavioralBiasesActionFailure(error)
                        )
                    )
            )
        )
    );

    changeAccountPassword = createEffect(() =>
        this.actions$.pipe(
            ofType(CHANGE_ACCOUNT_PASSWORD_ACTION),
            mergeMap(({ credentials }) =>
                this.dashboardService.changeAccountPassword(credentials).pipe(
                    map(response => ({
                        type: CHANGE_ACCOUNT_PASSWORD_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error =>
                        changeAccountPasswordActionFailure(error)
                    )
                )
            )
        )
    );

    changeInvestorPassword = createEffect(() =>
        this.actions$.pipe(
            ofType(CHANGE_INVESTOR_PASSWORD_ACTION),
            mergeMap(({ credentials }) =>
                this.dashboardService.changeInvestorPassword(credentials).pipe(
                    map(response => ({
                        type: CHANGE_INVESTOR_PASSWORD_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error =>
                        changeInvestorPasswordActionFailure(error)
                    )
                )
            )
        )
    );

    getCareerInsights = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_CAREER_INSIGHTS_ACTION),
            mergeMap(({ personId }) =>
                this.dashboardService.getCareerInsightsCall(personId).pipe(
                    map(response => ({
                        type: GET_CAREER_INSIGHTS_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error =>
                        getCareerInsightsActionFailure(error)
                    )
                )
            )
        )
    );
}
