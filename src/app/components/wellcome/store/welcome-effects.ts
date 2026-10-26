import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { catchApiError } from 'src/app/service/api-error';
import { WelcomeService } from '../welcome-service.service';
import {
    emailOptoutActionSuccess,
    emailOptoutActionFailure,
    getAccountDetailsActionSuccess,
    getAccountDetailsActionFailure,
    getCustomWelcomeDetailActionSuccess,
    getCustomWelcomeDetailActionFailure,
    getLegalTextActionSuccess,
    getLegalTextActionFailure,
    getParticipantDetailsActionSuccess,
    getParticipantDetailsActionFailure,
    getSelfRegistrationDetailsActionSuccess,
    getSelfRegistrationDetailsActionFailure,
    getSubscriptionAccountActionSuccess,
    getSubscriptionAccountActionFailure,
    validateRegistrationLinkActionSuccess,
    validateRegistrationLinkActionFailure
} from './welcome-actions';
import {
    EMAIL_OPT_OUT_ACTION,
    GET_ACCOUNT_DETAILS_ACTION,
    GET_CUSTOM_WELCOME_DETAILS_ACTION,
    GET_LEGAL_TEXT_ACTION,
    GET_PARTICIPANT_DETAILS_ACTION,
    GET_SELF_REGISTRATION_DETAILS_ACTION,
    GET_SUBSCRIPTION_ACCOUNT_ACTION,
    VALIDATE_REGISTRATION_LINK_ACTION
} from './welcome-action-constants';

@Injectable()
export class WelcomeEffects {
    getAccountDetails = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_ACCOUNT_DETAILS_ACTION),
            mergeMap(({ accountId, registrationId }) =>
                this.welcomeService
                    .getAccountDetailsCall(accountId, registrationId)
                    .pipe(
                        map(response => getAccountDetailsActionSuccess((response?.body as any)?.data)),
                        catchApiError(error => getAccountDetailsActionFailure(error))
                    )
            )
        )
    );

    getLegalText = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_LEGAL_TEXT_ACTION),
            mergeMap(({ accountId }) =>
                this.welcomeService.getLegalTextCall(accountId).pipe(
                    map(response => getLegalTextActionSuccess((response?.body as any)?.data)),
                    catchApiError(error => getLegalTextActionFailure(error))
                )
            )
        )
    );

    validateRegistrationLink = createEffect(() =>
        this.actions$.pipe(
            ofType(VALIDATE_REGISTRATION_LINK_ACTION),
            mergeMap(({ registrationPayload }) =>
                this.welcomeService
                    .validateRegistrationLinkCall(registrationPayload)
                    .pipe(
                        map(response => validateRegistrationLinkActionSuccess((response?.body as any)?.data)),
                        catchApiError(error => validateRegistrationLinkActionFailure(error))
                    )
            )
        )
    );

    getSelfRegistrationDetails = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_SELF_REGISTRATION_DETAILS_ACTION),
            mergeMap(({ personId }) =>
                this.welcomeService
                    .getSelfRegistrationDetailsCall(personId)
                    .pipe(
                        map(response => getSelfRegistrationDetailsActionSuccess((response?.body as any)?.data)),
                        catchApiError(error => getSelfRegistrationDetailsActionFailure(error))
                    )
            )
        )
    );
    emailOptout = createEffect(() =>
        this.actions$.pipe(
            ofType(EMAIL_OPT_OUT_ACTION),
            mergeMap(({ personId, creditId }) =>
                this.welcomeService.emailOptoutCall(personId, creditId).pipe(
                    map(response => emailOptoutActionSuccess((response?.body as any)?.data)),
                    catchApiError(error => emailOptoutActionFailure(error))
                )
            )
        )
    );

    getCustomWelcomeDetails = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_CUSTOM_WELCOME_DETAILS_ACTION),
            mergeMap(({ accountId }) =>
                this.welcomeService.getCustomWelcomeDetails(accountId).pipe(
                    map(response => getCustomWelcomeDetailActionSuccess((response?.body as any)?.data)),
                    catchApiError(error => getCustomWelcomeDetailActionFailure(error))
                )
            )
        )
    );

    getParticipantDetails = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_PARTICIPANT_DETAILS_ACTION),
            mergeMap((action: any) =>
                this.welcomeService
                    .getParticipantDetailsCall(action.participantPayload)
                    .pipe(
                        map(response => getParticipantDetailsActionSuccess(response)),
                        catchApiError(error => getParticipantDetailsActionFailure(error))
                    )
            )
        )
    );

    getSubscriptionAccount = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_SUBSCRIPTION_ACCOUNT_ACTION),
            mergeMap(({ accountId }) =>
                this.welcomeService.getSubscriptionAccountCall(accountId).pipe(
                    map(response => getSubscriptionAccountActionSuccess(response)),
                    catchApiError(error => getSubscriptionAccountActionFailure(error))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private welcomeService: WelcomeService
    ) {}
}
