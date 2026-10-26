import { createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    getBehavioralBiasesAction,
    getBehavioralBiasesActionFailure,
    getBehavioralBiasesActionSuccess,
    getCustomReportNameAction,
    getCustomReportNameFailureAction,
    getCustomReportNameSuccessAction,
    getFDNA5ScoresAction,
    getFDNA5ScoresActionFailure,
    getFDNA5ScoresActionSuccess,
    getFDNADashboardSettingAction,
    getFDNADashboardSettingActionFailure,
    getFDNADashboardSettingActionSuccess,
    getFDNAFinancialPlanningInsightsAction,
    getFDNAFinancialPlanningInsightsActionFailure,
    getFDNAFinancialPlanningInsightsActionSuccess,
    getMarketMoodArrayAction,
    getMarketMoodArrayActionFailure,
    getMarketMoodArrayActionSuccess,
    getPerformanceGuideArrayAction,
    getPerformanceGuideArrayActionFailure,
    getPerformanceGuideArrayActionSuccess,
    getRiskAllocationAction,
    getRiskAllocationActionFailure,
    getRiskAllocationActionSuccess,
    getTScoreAction,
    getTScoreActionFailure,
    getTScoreActionSuccess,
    getUniqueStyleAndDescriptionAction,
    getUniqueStyleAndDescriptionActionFailure,
    getUniqueStyleAndDescriptionActionSuccess,
    getVideoUrlAction,
    getVideoUrlActionFailure,
    getVideoUrlActionSuccess
} from './fdna-reports.actions';

export const initialState: { [key: string]: any } = {
    // == error handlers (reducer-only - no toast/mixpanel tied to these) ===
    uniqueStyleAndDescriptionError: undefined as ApiError | undefined,
    dashboardFDNASettingError: undefined as ApiError | undefined,
    performanceGuideError: undefined as ApiError | undefined,
    videoUrlError: undefined as ApiError | undefined,
    scoreFDNA5Error: undefined as ApiError | undefined,
    marketMoodError: undefined as ApiError | undefined,
    behavioralBiasesError: undefined as ApiError | undefined,
    financialPlanningInsightsError: undefined as ApiError | undefined,
    tScoreError: undefined as ApiError | undefined,
    riskAllocationError: undefined as ApiError | undefined,
    reportError: undefined as ApiError | undefined
};

export const fdnaReportReducer = createReducer(
    initialState,
    on(getUniqueStyleAndDescriptionAction, state => ({
        ...state,
        isUniqueStyleLoading: true
    })),
    on(getUniqueStyleAndDescriptionActionSuccess, (state, { response }) => ({
        ...state,
        uniqueStyleAndDescriptionData: response?.body,
        isUniqueStyleLoading: false
    })),
    on(getUniqueStyleAndDescriptionActionFailure, (state, { error }) => ({
        ...state,
        uniqueStyleAndDescriptionError: error,
        isUniqueStyleLoading: false
    })),
    on(getFDNADashboardSettingAction, state => ({
        ...state,
        isDashboardFDNASettingLoading: true
    })),
    on(getFDNADashboardSettingActionSuccess, (state, { data }) => ({
        ...state,
        dashboardFDNASettingData: data,
        isDashboardFDNASettingLoading: false
    })),
    on(getFDNADashboardSettingActionFailure, (state, { error }) => ({
        ...state,
        dashboardFDNASettingError: error,
        isDashboardFDNASettingLoading: false
    })),
    on(getPerformanceGuideArrayAction, state => ({
        ...state,
        isPerformanceGuideLoading: true
    })),
    on(getPerformanceGuideArrayActionSuccess, (state, { response }) => ({
        ...state,
        performanceGuideData: response?.body,
        isPerformanceGuideLoading: false
    })),
    on(getPerformanceGuideArrayActionFailure, (state, { error }) => ({
        ...state,
        performanceGuideError: error,
        isPerformanceGuideLoading: false
    })),

    on(getVideoUrlAction, state => ({
        ...state,
        isVideoUrlLoading: true
    })),
    on(getVideoUrlActionSuccess, (state, { response }) => ({
        ...state,
        videoUrlData: response?.body,
        isVideoUrlLoading: false
    })),
    on(getVideoUrlActionFailure, (state, { error }) => ({
        ...state,
        videoUrlError: error,
        isVideoUrlLoading: false
    })),
    on(getFDNA5ScoresAction, state => ({
        ...state,
        isScoreFDNA5Loading: true
    })),
    on(getFDNA5ScoresActionSuccess, (state, { response }) => ({
        ...state,
        scoreFDNA5Data: response?.body,
        isScoreFDNA5Loading: false
    })),
    on(getFDNA5ScoresActionFailure, (state, { error }) => ({
        ...state,
        scoreFDNA5Error: error,
        isScoreFDNA5Loading: false
    })),
    on(getMarketMoodArrayAction, state => ({
        ...state,
        isMarketMoodLoading: true
    })),
    on(getMarketMoodArrayActionSuccess, (state, { response }) => ({
        ...state,
        marketMoodData: response?.body,
        isMarketMoodLoading: false
    })),
    on(getMarketMoodArrayActionFailure, (state, { error }) => ({
        ...state,
        marketMoodError: error,
        isMarketMoodLoading: false
    })),

    on(getBehavioralBiasesAction, state => ({
        ...state,
        isBehavioralBiasesLoading: true
    })),
    on(getBehavioralBiasesActionSuccess, (state, { response }) => ({
        ...state,
        behavioralBiasesData: response?.body,
        isBehavioralBiasesLoading: false
    })),
    on(getBehavioralBiasesActionFailure, (state, { error }) => ({
        ...state,
        behavioralBiasesError: error,
        isBehavioralBiasesLoading: false
    })),
    on(getFDNAFinancialPlanningInsightsAction, state => ({
        ...state,
        isFinancialPlanningInsightsLoading: true
    })),
    on(getFDNAFinancialPlanningInsightsActionSuccess, (state, { data }) => ({
        ...state,
        financialPlanningInsightsData: data,
        isFinancialPlanningInsightsLoading: false
    })),
    on(getFDNAFinancialPlanningInsightsActionFailure, (state, { error }) => ({
        ...state,
        financialPlanningInsightsError: error,
        isFinancialPlanningInsightsLoading: false
    })),
    on(getTScoreAction, state => ({
        ...state,
        isTScoreLoading: true
    })),
    on(getTScoreActionSuccess, (state, { response }) => ({
        ...state,
        tScoreData: response?.body,
        isTScoreLoading: false
    })),
    on(getTScoreActionFailure, (state, { error }) => ({
        ...state,
        tScoreError: error,
        isTScoreLoading: false
    })),
    on(getRiskAllocationAction, state => ({
        ...state,
        isRiskAllocationLoading: true
    })),
    on(getRiskAllocationActionSuccess, (state, { data }) => ({
        ...state,
        riskAllocationData: data,
        isRiskAllocationLoading: false
    })),
    on(getRiskAllocationActionFailure, (state, { error }) => ({
        ...state,
        riskAllocationError: error,
        isRiskAllocationLoading: false
    })),
    on(getCustomReportNameAction, state => ({
        ...state,
        isReportLoading: true
    })),
    on(getCustomReportNameSuccessAction, state => ({
        ...state,
        isReportLoading: false
    })),
    on(getCustomReportNameFailureAction, (state, { error }) => ({
        ...state,
        reportError: error,
        isReportLoading: false
    }))
);
