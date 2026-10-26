import { createAction } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    CHANGE_ACCOUNT_PASSWORD_ACTION,
    CHANGE_ACCOUNT_PASSWORD_ACTION_FAILURE,
    CHANGE_ACCOUNT_PASSWORD_ACTION_SUCCESS,
    CHANGE_INVESTOR_PASSWORD_ACTION,
    CHANGE_INVESTOR_PASSWORD_ACTION_FAILURE,
    CHANGE_INVESTOR_PASSWORD_ACTION_SUCCESS,
    GET_BDNA5_SCORE_ACTION,
    GET_BDNA5_SCORE_ACTION_FAILURE,
    GET_BDNA5_SCORE_ACTION_SUCCESS,
    GET_BDNA_DASHBOARD_SETTING_ACTION,
    GET_BDNA_DASHBOARD_SETTING_ACTION_FAILURE,
    GET_BDNA_DASHBOARD_SETTING_ACTION_SUCCESS,
    GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION,
    GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_FAILURE,
    GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_SUCCESS,
    GET_BEHAVIORAL_BIASES_ACTION,
    GET_BEHAVIORAL_BIASES_ACTION_FAILURE,
    GET_BEHAVIORAL_BIASES_ACTION_SUCCESS,
    GET_CAREER_INSIGHTS_ACTION,
    GET_CAREER_INSIGHTS_ACTION_FAILURE,
    GET_CAREER_INSIGHTS_ACTION_SUCCESS,
    GET_FDNA5_SCORE_ACTION,
    GET_FDNA5_SCORE_ACTION_FAILURE,
    GET_FDNA5_SCORE_ACTION_SUCCESS,
    GET_FDNA_DASHBOARD_SETTING_ACTION,
    GET_FDNA_DASHBOARD_SETTING_ACTION_FAILURE,
    GET_FDNA_DASHBOARD_SETTING_ACTION_SUCCESS,
    GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION,
    GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_FAILURE,
    GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_SUCCESS,
    GET_MARKET_MOOD_ARRAY_ACTION,
    GET_MARKET_MOOD_ARRAY_ACTION_FAILURE,
    GET_MARKET_MOOD_ARRAY_ACTION_SUCCESS,
    GET_PERFORMANCE_GUIDE_ACTION,
    GET_PERFORMANCE_GUIDE_ACTION_FAILURE,
    GET_PERFORMANCE_GUIDE_ACTION_SUCCESS,
    GET_SUBSCRIPTION_FEATURES_ACTION,
    GET_SUBSCRIPTION_FEATURES_ACTION_FAILURE,
    GET_SUBSCRIPTION_FEATURES_ACTION_SUCCESS,
    GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION,
    GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION_FAILURE,
    GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION_SUCCESS,
    GET_VIDEO_URL_ACTION,
    GET_VIDEO_URL_ACTION_FAILURE,
    GET_VIDEO_URL_ACTION_SUCCESS
} from './dashboard-actions-constants';

export const getBDNAUniqueStyleVideoLinksAction = createAction(
    GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION
);
export const getBDNAUniqueStyleVideoLinksActionSuccess = createAction(
    GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_SUCCESS,
    response => ({ response })
);
export const getBDNAUniqueStyleVideoLinksActionFailure = createAction(
    GET_BDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getFDNAUniqueStyleVideoLinksAction = createAction(
    GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION
);
export const getFDNAUniqueStyleVideoLinksActionSuccess = createAction(
    GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_SUCCESS,
    response => ({ response })
);
export const getFDNAUniqueStyleVideoLinksActionFailure = createAction(
    GET_FDNA_UNIQUE_STYLE_VIDEO_LINKS_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getUniqueStyleAndDescriptionAction = createAction(
    GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION,
    (personId, languageId) => ({ personId, languageId })
);
export const getUniqueStyleAndDescriptionActionSuccess = createAction(
    GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION_SUCCESS,
    response => ({ response })
);
export const getUniqueStyleAndDescriptionActionFailure = createAction(
    GET_UNIQUE_STYLE_AND_DESCRIPTION_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getSubscriptionFeaturesAction = createAction(
    GET_SUBSCRIPTION_FEATURES_ACTION,
    accountId => ({ accountId })
);
export const getSubscriptionFeaturesActionSuccess = createAction(
    GET_SUBSCRIPTION_FEATURES_ACTION_SUCCESS,
    response => ({ response })
);
export const getSubscriptionFeaturesActionFailure = createAction(
    GET_SUBSCRIPTION_FEATURES_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

// Canonical definitions - dashboard.component.ts, bdna-reports.component.ts and
// fdna-reports.component.ts all dispatch/consume these same actions (each used to redefine its own
// copy with a colliding type string, causing a double HTTP call + double Mixpanel event on every
// dispatch; bdna-reports.actions.ts / fdna-reports.actions.ts now re-export these instead of
// redefining them - see STATUS_CODE_MIGRATION_PLAN.md §3a).
export const getBDNADashboardSettingAction = createAction(
    GET_BDNA_DASHBOARD_SETTING_ACTION,
    (selfRegistrationId, accountId) => ({ selfRegistrationId, accountId })
);
export const getBDNADashboardSettingActionSuccess = createAction(
    GET_BDNA_DASHBOARD_SETTING_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getBDNADashboardSettingActionFailure = createAction(
    GET_BDNA_DASHBOARD_SETTING_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getFDNADashboardSettingAction = createAction(
    GET_FDNA_DASHBOARD_SETTING_ACTION,
    (selfRegistrationId, accountId) => ({ selfRegistrationId, accountId })
);
export const getFDNADashboardSettingActionSuccess = createAction(
    GET_FDNA_DASHBOARD_SETTING_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getFDNADashboardSettingActionFailure = createAction(
    GET_FDNA_DASHBOARD_SETTING_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getPerformanceGuideArrayAction = createAction(
    GET_PERFORMANCE_GUIDE_ACTION,
    (personId, languageId) => ({ personId, languageId })
);
export const getPerformanceGuideArrayActionSuccess = createAction(
    GET_PERFORMANCE_GUIDE_ACTION_SUCCESS,
    response => ({ response })
);
export const getPerformanceGuideArrayActionFailure = createAction(
    GET_PERFORMANCE_GUIDE_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getVideoUrlAction = createAction(
    GET_VIDEO_URL_ACTION,
    personId => ({ personId })
);
export const getVideoUrlActionSuccess = createAction(
    GET_VIDEO_URL_ACTION_SUCCESS,
    response => ({ response })
);
export const getVideoUrlActionFailure = createAction(
    GET_VIDEO_URL_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getBDNA5ScoresAction = createAction(
    GET_BDNA5_SCORE_ACTION,
    (personId, languageId) => ({ personId, languageId })
);
export const getBDNA5ScoresActionSuccess = createAction(
    GET_BDNA5_SCORE_ACTION_SUCCESS,
    response => ({ response })
);
export const getBDNA5ScoresActionFailure = createAction(
    GET_BDNA5_SCORE_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getFDNA5ScoresAction = createAction(
    GET_FDNA5_SCORE_ACTION,
    (personId, languageId) => ({ personId, languageId })
);
export const getFDNA5ScoresActionSuccess = createAction(
    GET_FDNA5_SCORE_ACTION_SUCCESS,
    response => ({ response })
);
export const getFDNA5ScoresActionFailure = createAction(
    GET_FDNA5_SCORE_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getMarketMoodArrayAction = createAction(
    GET_MARKET_MOOD_ARRAY_ACTION,
    (personId, portfolioValue, date) => ({ personId, portfolioValue, date })
);
export const getMarketMoodArrayActionSuccess = createAction(
    GET_MARKET_MOOD_ARRAY_ACTION_SUCCESS,
    response => ({ response })
);
export const getMarketMoodArrayActionFailure = createAction(
    GET_MARKET_MOOD_ARRAY_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getBehavioralBiasesAction = createAction(
    GET_BEHAVIORAL_BIASES_ACTION,
    (personId, languageId) => ({ personId, languageId })
);
export const getBehavioralBiasesActionSuccess = createAction(
    GET_BEHAVIORAL_BIASES_ACTION_SUCCESS,
    response => ({ response })
);
export const getBehavioralBiasesActionFailure = createAction(
    GET_BEHAVIORAL_BIASES_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const changeAccountPasswordAction = createAction(
    CHANGE_ACCOUNT_PASSWORD_ACTION,
    credentials => ({ credentials })
);
export const changeAccountPasswordActionSuccess = createAction(
    CHANGE_ACCOUNT_PASSWORD_ACTION_SUCCESS,
    (response: any) => ({ response })
);
export const changeAccountPasswordActionFailure = createAction(
    CHANGE_ACCOUNT_PASSWORD_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const changeInvestorPasswordAction = createAction(
    CHANGE_INVESTOR_PASSWORD_ACTION,
    credentials => ({ credentials })
);
export const changeInvestorPasswordActionSuccess = createAction(
    CHANGE_INVESTOR_PASSWORD_ACTION_SUCCESS,
    (response: any) => ({ response })
);
export const changeInvestorPasswordActionFailure = createAction(
    CHANGE_INVESTOR_PASSWORD_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getCareerInsightsAction = createAction(
    GET_CAREER_INSIGHTS_ACTION,
    personId => ({ personId })
);
export const getCareerInsightsActionSuccess = createAction(
    GET_CAREER_INSIGHTS_ACTION_SUCCESS,
    (response: any) => ({ response })
);
export const getCareerInsightsActionFailure = createAction(
    GET_CAREER_INSIGHTS_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);
