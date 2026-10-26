import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { catchApiError } from 'src/app/service/api-error';
import { DashboardServiceService } from '../../dashboard/dashboard-service.service';
import {
    GET_CUSTOM_REPORT_NAME_ACTION,
    GET_FDNA_FINANCIAL_PLANNING_INSIGHTS_ACTION,
    GET_RISK_ALLOCATION_ACTION,
    GET_TSCORE_ACTION,
    GET_TSCORE_ACTION_SUCCESS
} from './fdna-reports-actions-constants';
import {
    getCustomReportNameFailureAction,
    getCustomReportNameSuccessAction,
    getFDNAFinancialPlanningInsightsActionFailure,
    getFDNAFinancialPlanningInsightsActionSuccess,
    getRiskAllocationActionFailure,
    getRiskAllocationActionSuccess,
    getTScoreActionFailure
} from './fdna-reports.actions';

// Every action shared with dashboard.component.ts (unique style/description, performance guide,
// video url, FDNA5 scores, market mood, behavioral biases) is now handled solely by
// dashboard.effect.ts - this file used to define its own colliding copy of each
// (STATUS_CODE_MIGRATION_PLAN.md §3a), firing a duplicate HTTP call and Mixpanel event on every
// dispatch. Only the actions unique to FDNA reports remain here.
@Injectable()
export class FDNAReportEffect {
    constructor(
        private actions$: Actions,
        private dashboardService: DashboardServiceService
    ) {}

    getFDNAFinancialPlanningInsights = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_FDNA_FINANCIAL_PLANNING_INSIGHTS_ACTION),
            mergeMap(({ personId, languageId }) =>
                this.dashboardService
                    .getFDNAFinancialPlanningInsights(personId, languageId)
                    .pipe(
                        map(response =>
                            getFDNAFinancialPlanningInsightsActionSuccess(
                                (response?.body as any)?.data
                            )
                        ),
                        catchApiError(error =>
                            getFDNAFinancialPlanningInsightsActionFailure(error)
                        )
                    )
            )
        )
    );

    getTScore = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_TSCORE_ACTION),
            mergeMap(({ personId }) =>
                this.dashboardService.getTScore(personId).pipe(
                    map(response => ({
                        type: GET_TSCORE_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error => getTScoreActionFailure(error))
                )
            )
        )
    );

    getRiskAllocation = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_RISK_ALLOCATION_ACTION),
            mergeMap(({ personId }) =>
                this.dashboardService.getRiskAllocation(personId).pipe(
                    map(response =>
                        getRiskAllocationActionSuccess(
                            (response?.body as any)?.data
                        )
                    ),
                    catchApiError(error =>
                        getRiskAllocationActionFailure(error)
                    )
                )
            )
        )
    );

    // Shared listener - bdna-reports.component.ts and fdna-reports.component.ts both dispatch
    // GET_CUSTOM_REPORT_NAME_ACTION and subscribe to its success/failure (imported from this file).
    getCustomReportName = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_CUSTOM_REPORT_NAME_ACTION),
            mergeMap(({ payload }) =>
                this.dashboardService.getCustomReportNameCall(payload).pipe(
                    map(response =>
                        getCustomReportNameSuccessAction(
                            (response?.body as any)?.data
                        )
                    ),
                    catchApiError(error =>
                        getCustomReportNameFailureAction(error)
                    )
                )
            )
        )
    );
}
