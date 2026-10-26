import { createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    getBDNA5ScoresAction,
    getBDNA5ScoresActionSuccess,
    getBDNA5ScoresActionFailure,
    getBDNADashboardSettingAction,
    getBDNADashboardSettingActionSuccess,
    getBDNADashboardSettingActionFailure,
    getCareerInsightsAction,
    getCareerInsightsActionSuccess,
    getCareerInsightsActionFailure,
    getPerformanceGuideArrayAction,
    getPerformanceGuideArrayActionSuccess,
    getPerformanceGuideArrayActionFailure,
    getUniqueStyleAndDescriptionAction,
    getUniqueStyleAndDescriptionActionSuccess,
    getUniqueStyleAndDescriptionActionFailure,
    getVideoUrlAction,
    getVideoUrlActionSuccess,
    getVideoUrlActionFailure
} from './bdna-reports.actions';

export const initialState = {
    isUniqueStyleLoading: false,
    isDashboardBDNASettingLoading: false,
    isPerformanceGuideLoading: false,
    isVideoUrlLoading: false,
    isScoreBDNA5Loading: false,
    isCareerInsightsLoading: false,
    uniqueStyleAndDescriptionData: undefined,
    dashboardBDNASettingData: undefined,
    performanceGuideData: undefined,
    videoUrlData: undefined,
    scoreBDNA5Data: undefined,
    careerInsightsPayload: undefined,
    // == error handlers (reducer-only - no toast/mixpanel tied to these) ===
    uniqueStyleAndDescriptionError: undefined as ApiError | undefined,
    dashboardBDNASettingError: undefined as ApiError | undefined,
    performanceGuideError: undefined as ApiError | undefined,
    videoUrlError: undefined as ApiError | undefined,
    scoreBDNA5Error: undefined as ApiError | undefined,
    careerInsightsError: undefined as ApiError | undefined
};

export const bdnaReportReducer = createReducer(
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
    on(getBDNADashboardSettingAction, state => ({
        ...state,
        isDashboardBDNASettingLoading: true
    })),
    on(getBDNADashboardSettingActionSuccess, (state, { data }) => ({
        ...state,
        dashboardBDNASettingData: data,
        isDashboardBDNASettingLoading: false
    })),
    on(getBDNADashboardSettingActionFailure, (state, { error }) => ({
        ...state,
        dashboardBDNASettingError: error,
        isDashboardBDNASettingLoading: false
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
    on(getBDNA5ScoresAction, state => ({
        ...state,
        isScoreBDNA5Loading: true
    })),
    on(getBDNA5ScoresActionSuccess, (state, { response }) => ({
        ...state,
        scoreBDNA5Data: response?.body,
        isScoreBDNA5Loading: false
    })),
    on(getBDNA5ScoresActionFailure, (state, { error }) => ({
        ...state,
        scoreBDNA5Error: error,
        isScoreBDNA5Loading: false
    })),
    on(getCareerInsightsAction, state => ({
        ...state,
        isCareerInsightsLoading: true
    })),
    on(getCareerInsightsActionSuccess, (state, { response }) => ({
        ...state,
        careerInsightsPayload: response?.body?.data,
        isCareerInsightsLoading: false
    })),
    on(getCareerInsightsActionFailure, (state, { error }) => ({
        ...state,
        careerInsightsError: error,
        isCareerInsightsLoading: false
    }))
);
