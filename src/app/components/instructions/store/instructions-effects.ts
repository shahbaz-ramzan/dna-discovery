import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { catchApiError } from 'src/app/service/api-error';
import { InstructionsService } from '../instructions-service.service';
import {
    getCreditIdActionFailure,
    getDiscoveryStatusActionSuccess,
    getDiscoveryStatusActionFailure,
    userScheduleDiscoveryActionSuccess,
    userScheduleDiscoveryActionFailure
} from './instructions-actions';
import {
    GET_CREDIT_ID_ACTION,
    GET_CREDIT_ID_ACTION_SUCCESS,
    GET_DISCOVERY_STATUS_ACTION,
    USER_SCHEDULE_DISCOVERY_ACTION
} from './instructions-actions-constants';

@Injectable()
export class InstructionsEffects {
    getCreditId = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_CREDIT_ID_ACTION),
            mergeMap(({ personId }) =>
                this.instructionService.getPersonCreditIdCall(personId).pipe(
                    map(response => ({
                        type: GET_CREDIT_ID_ACTION_SUCCESS,
                        response
                    })),
                    catchApiError(error => getCreditIdActionFailure(error))
                )
            )
        )
    );

    userScheduleDiscovery = createEffect(() =>
        this.actions$.pipe(
            ofType(USER_SCHEDULE_DISCOVERY_ACTION),
            mergeMap(({ discoveryPayload }) =>
                this.instructionService
                    .userScheduleDiscoveryCall(discoveryPayload)
                    .pipe(
                        map(response => userScheduleDiscoveryActionSuccess((response?.body as any)?.data)),
                        catchApiError(error => userScheduleDiscoveryActionFailure(error))
                    )
            )
        )
    );

    getDiscoveryStatus = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_DISCOVERY_STATUS_ACTION),
            mergeMap(({ creditId }) =>
                this.instructionService.getDiscoveryStatusCall(creditId).pipe(
                    map(response => getDiscoveryStatusActionSuccess((response?.body as any)?.data)),
                    catchApiError(error => getDiscoveryStatusActionFailure(error))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private instructionService: InstructionsService
    ) {}
}
