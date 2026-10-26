// This file has no locally-unique actions - every action bdna-reports.component.ts dispatches is
// shared with dashboard.component.ts (and some with fdna-reports.component.ts too). Each used to
// be redefined here with its own copy sharing a type string with dashboard.actions.ts's, causing a
// double HTTP call + double Mixpanel event on every dispatch (STATUS_CODE_MIGRATION_PLAN.md §3a) -
// re-exporting the canonical definitions instead fixes that.
export {
    getBDNADashboardSettingAction,
    getBDNADashboardSettingActionSuccess,
    getBDNADashboardSettingActionFailure,
    getUniqueStyleAndDescriptionAction,
    getUniqueStyleAndDescriptionActionSuccess,
    getUniqueStyleAndDescriptionActionFailure,
    getPerformanceGuideArrayAction,
    getPerformanceGuideArrayActionSuccess,
    getPerformanceGuideArrayActionFailure,
    getVideoUrlAction,
    getVideoUrlActionSuccess,
    getVideoUrlActionFailure,
    getBDNA5ScoresAction,
    getBDNA5ScoresActionSuccess,
    getBDNA5ScoresActionFailure,
    getCareerInsightsAction,
    getCareerInsightsActionSuccess,
    getCareerInsightsActionFailure
} from '../../dashboard/store/dashboard.actions';
