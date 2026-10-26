import { createAction } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    EMAIL_OPT_OUT_ACTION,
    EMAIL_OPT_OUT_ACTION_SUCCESS,
    EMAIL_OPT_OUT_ACTION_FAILURE,
    GET_ACCOUNT_DETAILS_ACTION,
    GET_ACCOUNT_DETAILS_ACTION_SUCCESS,
    GET_ACCOUNT_DETAILS_ACTION_FAILURE,
    GET_CUSTOM_WELCOME_DETAILS_ACTION,
    GET_CUSTOM_WELCOME_DETAILS_ACTION_SUCCESS,
    GET_CUSTOM_WELCOME_DETAILS_ACTION_FAILURE,
    GET_LEGAL_TEXT_ACTION,
    GET_LEGAL_TEXT_ACTION_SUCCESS,
    GET_LEGAL_TEXT_ACTION_FAILURE,
    GET_PARTICIPANT_DETAILS_ACTION,
    GET_PARTICIPANT_DETAILS_ACTION_SUCCESS,
    GET_PARTICIPANT_DETAILS_ACTION_FAILURE,
    GET_SELF_REGISTRATION_DETAILS_ACTION,
    GET_SELF_REGISTRATION_DETAILS_ACTION_SUCCESS,
    GET_SELF_REGISTRATION_DETAILS_ACTION_FAILURE,
    GET_SUBSCRIPTION_ACCOUNT_ACTION,
    GET_SUBSCRIPTION_ACCOUNT_ACTION_SUCCESS,
    GET_SUBSCRIPTION_ACCOUNT_ACTION_FAILURE,
    VALIDATE_REGISTRATION_LINK_ACTION,
    VALIDATE_REGISTRATION_LINK_ACTION_SUCCESS,
    VALIDATE_REGISTRATION_LINK_ACTION_FAILURE,
    SET_NEW_SIGNUP_ACTION
} from './welcome-action-constants';

export const getAccountDetailsAction = createAction(
    GET_ACCOUNT_DETAILS_ACTION,
    (accountId: any, registrationId: any) => ({
        accountId,
        registrationId
    })
);
export const getAccountDetailsActionSuccess = createAction(
    GET_ACCOUNT_DETAILS_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getAccountDetailsActionFailure = createAction(
    GET_ACCOUNT_DETAILS_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);

export const getLegalTextAction = createAction(
    GET_LEGAL_TEXT_ACTION,
    (accountId: any) => ({
        accountId
    })
);
export const getLegalTextActionSuccess = createAction(
    GET_LEGAL_TEXT_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getLegalTextActionFailure = createAction(
    GET_LEGAL_TEXT_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const validateRegistrationLinkAction = createAction(
    VALIDATE_REGISTRATION_LINK_ACTION,
    (registrationPayload: any) => ({
        registrationPayload
    })
);
export const validateRegistrationLinkActionSuccess = createAction(
    VALIDATE_REGISTRATION_LINK_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const validateRegistrationLinkActionFailure = createAction(
    VALIDATE_REGISTRATION_LINK_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);

export const getSelfRegistrationDetailsAction = createAction(
    GET_SELF_REGISTRATION_DETAILS_ACTION,
    (personId: any) => ({
        personId
    })
);
export const getSelfRegistrationDetailsActionSuccess = createAction(
    GET_SELF_REGISTRATION_DETAILS_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getSelfRegistrationDetailsActionFailure = createAction(
    GET_SELF_REGISTRATION_DETAILS_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);

export const emailOptoutAction = createAction(
    EMAIL_OPT_OUT_ACTION,
    (personId: any, creditId: any) => ({
        personId,
        creditId
    })
);
export const emailOptoutActionSuccess = createAction(
    EMAIL_OPT_OUT_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const emailOptoutActionFailure = createAction(
    EMAIL_OPT_OUT_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getCustomWelcomeDetailAction = createAction(
    GET_CUSTOM_WELCOME_DETAILS_ACTION,
    (accountId: number) => ({ accountId })
);
export const getCustomWelcomeDetailActionSuccess = createAction(
    GET_CUSTOM_WELCOME_DETAILS_ACTION_SUCCESS,
    (data: any) => ({ data })
);
export const getCustomWelcomeDetailActionFailure = createAction(
    GET_CUSTOM_WELCOME_DETAILS_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getParticipantDetailsAction = createAction(
    GET_PARTICIPANT_DETAILS_ACTION,
    (participantPayload: any) => ({
        participantPayload
    })
);
export const getParticipantDetailsActionSuccess = createAction(
    GET_PARTICIPANT_DETAILS_ACTION_SUCCESS,
    (response: any) => ({
        response
    })
);
export const getParticipantDetailsActionFailure = createAction(
    GET_PARTICIPANT_DETAILS_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const getSubscriptionAccountAction = createAction(
    GET_SUBSCRIPTION_ACCOUNT_ACTION,
    (accountId: any) => ({ accountId })
);
export const getSubscriptionAccountActionSuccess = createAction(
    GET_SUBSCRIPTION_ACCOUNT_ACTION_SUCCESS,
    (response: any) => ({ response })
);
export const getSubscriptionAccountActionFailure = createAction(
    GET_SUBSCRIPTION_ACCOUNT_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);
export const setNewSignupAction = createAction(
    SET_NEW_SIGNUP_ACTION,
    (isNewSignup: boolean) => ({ isNewSignup })
);
