import { createAction } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    GET_CUSTOM_REPORT_NAME_ACTION,
    GET_CUSTOM_REPORT_NAME_ACTION_FAILURE,
    GET_CUSTOM_REPORT_NAME_ACTION_SUCCESS,
    GET_FDNA_FINANCIAL_PLANNING_INSIGHTS_ACTION,
    GET_FDNA_FINANCIAL_PLANNING_INSIGHTS_ACTION_FAILURE,
    GET_FDNA_FINANCIAL_PLANNING_INSIGHTS_ACTION_SUCCESS,
    GET_RISK_ALLOCATION_ACTION,
    GET_RISK_ALLOCATION_ACTION_FAILURE,
    GET_RISK_ALLOCATION_ACTION_SUCCESS,
    GET_TSCORE_ACTION,
    GET_TSCORE_ACTION_FAILURE,
    GET_TSCORE_ACTION_SUCCESS
} from './fdna-reports-actions-constants';

// Re-exported, not redefined - see dashboard.actions.ts for why (STATUS_CODE_MIGRATION_PLAN.md §3a:
// a separate local definition here used to share a type string with dashboard.actions.ts's, causing
// a double HTTP call + double Mixpanel event on every dispatch).
export {
    getBehavioralBiasesAction,
    getBehavioralBiasesActionFailure,
    getBehavioralBiasesActionSuccess,
    getFDNA5ScoresAction,
    getFDNA5ScoresActionFailure,
    getFDNA5ScoresActionSuccess,
    getFDNADashboardSettingAction,
    getFDNADashboardSettingActionFailure,
    getFDNADashboardSettingActionSuccess,
    getMarketMoodArrayAction,
    getMarketMoodArrayActionFailure,
    getMarketMoodArrayActionSuccess,
    getPerformanceGuideArrayAction,
    getPerformanceGuideArrayActionFailure,
    getPerformanceGuideArrayActionSuccess,
    getUniqueStyleAndDescriptionAction,
    getUniqueStyleAndDescriptionActionFailure,
    getUniqueStyleAndDescriptionActionSuccess,
    getVideoUrlAction,
    getVideoUrlActionFailure,
    getVideoUrlActionSuccess
} from '../../dashboard/store/dashboard.actions';

export const getFDNAFinancialPlanningInsightsAction = createAction(
    GET_FDNA_FINANCIAL_PLANNING_INSIGHTS_ACTION,
    (personId, languageId) => ({ personId, languageId })
);
export const getFDNAFinancialPlanningInsightsActionSuccess = createAction(
    GET_FDNA_FINANCIAL_PLANNING_INSIGHTS_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getFDNAFinancialPlanningInsightsActionFailure = createAction(
    GET_FDNA_FINANCIAL_PLANNING_INSIGHTS_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);

export const getTScoreAction = createAction(GET_TSCORE_ACTION, personId => ({
    personId
}));
export const getTScoreActionSuccess = createAction(
    GET_TSCORE_ACTION_SUCCESS,
    response => ({ response })
);
export const getTScoreActionFailure = createAction(
    GET_TSCORE_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getRiskAllocationAction = createAction(
    GET_RISK_ALLOCATION_ACTION,
    personId => ({ personId })
);
export const getRiskAllocationActionSuccess = createAction(
    GET_RISK_ALLOCATION_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getRiskAllocationActionFailure = createAction(
    GET_RISK_ALLOCATION_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);

export const getCustomReportNameAction = createAction(
    GET_CUSTOM_REPORT_NAME_ACTION,
    (payload: any) => ({ payload })
);

export const getCustomReportNameSuccessAction = createAction(
    GET_CUSTOM_REPORT_NAME_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getCustomReportNameFailureAction = createAction(
    GET_CUSTOM_REPORT_NAME_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);
