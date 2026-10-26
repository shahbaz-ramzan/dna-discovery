import { createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    getBDNA5ScoresAction,
    getBDNA5ScoresActionFailure,
    getBDNA5ScoresActionSuccess,
    getBDNADashboardSettingAction,
    getBDNADashboardSettingActionFailure,
    getBDNADashboardSettingActionSuccess,
    getBDNAUniqueStyleVideoLinksAction,
    getBDNAUniqueStyleVideoLinksActionFailure,
    getBDNAUniqueStyleVideoLinksActionSuccess,
    getBehavioralBiasesAction,
    getBehavioralBiasesActionFailure,
    getBehavioralBiasesActionSuccess,
    getCareerInsightsAction,
    getCareerInsightsActionFailure,
    getCareerInsightsActionSuccess,
    getFDNA5ScoresAction,
    getFDNA5ScoresActionFailure,
    getFDNA5ScoresActionSuccess,
    getFDNADashboardSettingAction,
    getFDNADashboardSettingActionFailure,
    getFDNADashboardSettingActionSuccess,
    getFDNAUniqueStyleVideoLinksAction,
    getFDNAUniqueStyleVideoLinksActionFailure,
    getFDNAUniqueStyleVideoLinksActionSuccess,
    getMarketMoodArrayAction,
    getMarketMoodArrayActionFailure,
    getMarketMoodArrayActionSuccess,
    getPerformanceGuideArrayAction,
    getPerformanceGuideArrayActionFailure,
    getPerformanceGuideArrayActionSuccess,
    getSubscriptionFeaturesAction,
    getSubscriptionFeaturesActionFailure,
    getSubscriptionFeaturesActionSuccess,
    getUniqueStyleAndDescriptionAction,
    getUniqueStyleAndDescriptionActionFailure,
    getUniqueStyleAndDescriptionActionSuccess,
    getVideoUrlAction,
    getVideoUrlActionFailure,
    getVideoUrlActionSuccess
} from './dashboard.actions';

export const initialState = {
    // == loading handlers ===
    isUniqueStyleLoading: false,
    isSubscriptionFeaturesLoading: false,
    isDashboardBDNASettingLoading: false,
    isDashboardFDNASettingLoading: false,
    isPerformanceGuideLoading: false,
    isVideoUrlLoading: false,
    isScoreBDNA5Loading: false,
    isScoreFDNA5Loading: false,
    isMarketMoodLoading: false,
    isBehavioralBiasesLoading: false,
    isCareerInsightsLoading: false,
    // == state handlers ===
    uniqueStyleAndDescriptionData: undefined,
    subscriptionFeaturesData: undefined,
    dashboardBDNASettingData: undefined,
    dashboardFDNASettingData: undefined,
    performanceGuideData: undefined,
    videoUrlData: undefined,
    scoreBDNA5Data: undefined,
    scoreFDNA5Data: undefined,
    marketMoodData: undefined,
    behavioralBiasesData: undefined,
    careerInsightsPayload: undefined,
    // == error handlers (reducer-only - no toast/mixpanel tied to these) ===
    uniqueStyleAndDescriptionError: undefined as ApiError | undefined,
    subscriptionFeaturesError: undefined as ApiError | undefined,
    dashboardBDNASettingError: undefined as ApiError | undefined,
    dashboardFDNASettingError: undefined as ApiError | undefined,
    performanceGuideError: undefined as ApiError | undefined,
    videoUrlError: undefined as ApiError | undefined,
    scoreBDNA5Error: undefined as ApiError | undefined,
    scoreFDNA5Error: undefined as ApiError | undefined,
    marketMoodError: undefined as ApiError | undefined,
    behavioralBiasesError: undefined as ApiError | undefined,
    careerInsightsError: undefined as ApiError | undefined,
    bDNAUniqueStyleVideoLinksError: undefined as ApiError | undefined,
    fDNAUniqueStyleVideoLinksError: undefined as ApiError | undefined
};

export const dashboardReducer = createReducer(
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
    // FAILURE handlers below only reset the loading flag (+ store the error passively) - no new
    // toast/Mixpanel event is introduced by these, per the "reducer only" scoping for this pass.
    on(getUniqueStyleAndDescriptionActionFailure, (state, { error }) => ({
        ...state,
        uniqueStyleAndDescriptionError: error,
        isUniqueStyleLoading: false
    })),

    on(getSubscriptionFeaturesAction, state => ({
        ...state,
        isSubscriptionFeaturesLoading: true
    })),
    on(getSubscriptionFeaturesActionSuccess, (state, { response }) => ({
        ...state,
        subscriptionFeaturesData: response?.body,
        isSubscriptionFeaturesLoading: false
    })),
    on(getSubscriptionFeaturesActionFailure, (state, { error }) => ({
        ...state,
        subscriptionFeaturesError: error,
        isSubscriptionFeaturesLoading: false
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
    })),
    on(getBDNAUniqueStyleVideoLinksAction, state => ({
        ...state,
        isBDNAUniqueStyleVideoLinksLoading: true
    })),
    on(getBDNAUniqueStyleVideoLinksActionSuccess, (state, { response }) => ({
        ...state,
        bDNAUniqueStyleVideoLinksData: response?.body,
        isBDNAUniqueStyleVideoLinksLoading: false
    })),
    on(getBDNAUniqueStyleVideoLinksActionFailure, (state, { error }) => ({
        ...state,
        bDNAUniqueStyleVideoLinksError: error,
        isBDNAUniqueStyleVideoLinksLoading: false
    })),
    on(getFDNAUniqueStyleVideoLinksAction, state => ({
        ...state,
        isFDNAUniqueStyleVideoLinksLoading: true
    })),
    on(getFDNAUniqueStyleVideoLinksActionSuccess, (state, { response }) => ({
        ...state,
        fDNAUniqueStyleVideoLinksData: response?.body,
        isFDNAUniqueStyleVideoLinksLoading: false
    })),
    on(getFDNAUniqueStyleVideoLinksActionFailure, (state, { error }) => ({
        ...state,
        fDNAUniqueStyleVideoLinksError: error,
        isFDNAUniqueStyleVideoLinksLoading: false
    }))
);
