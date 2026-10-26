import { createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    emailOptoutAction,
    emailOptoutActionSuccess,
    emailOptoutActionFailure,
    getAccountDetailsAction,
    getAccountDetailsActionSuccess,
    getAccountDetailsActionFailure,
    getLegalTextAction,
    getLegalTextActionSuccess,
    getLegalTextActionFailure,
    getParticipantDetailsAction,
    getParticipantDetailsActionSuccess,
    getParticipantDetailsActionFailure,
    getSelfRegistrationDetailsAction,
    getSelfRegistrationDetailsActionSuccess,
    getSelfRegistrationDetailsActionFailure,
    getSubscriptionAccountAction,
    getSubscriptionAccountActionSuccess,
    getSubscriptionAccountActionFailure,
    validateRegistrationLinkAction,
    validateRegistrationLinkActionSuccess,
    validateRegistrationLinkActionFailure,
    setNewSignupAction
} from './welcome-actions';

export const initialState = {
    accountDetailsLoading: false,
    linkValidationLoading: false,
    selfRegistrationDetailsLoading: false,
    accountDetailsPayload: undefined,
    linkValidationPayload: undefined,
    selfRegistrationDetailsPayload: undefined,
    // In-memory only, so a page refresh drops it and falls back to the normal flow.
    isNewSignup: false,
    // == error handlers (reducer-only - no toast/mixpanel tied to these) ===
    accountDetailsError: undefined as ApiError | undefined,
    legalTextError: undefined as ApiError | undefined,
    linkValidationError: undefined as ApiError | undefined,
    selfRegistrationDetailsError: undefined as ApiError | undefined,
    emailOptoutError: undefined as ApiError | undefined,
    participantDetailsError: undefined as ApiError | undefined,
    subscriptionAccountError: undefined as ApiError | undefined
};

export const welcomeReducer = createReducer(
    initialState,

    on(getAccountDetailsAction, state => ({
        ...state,
        accountDetailsLoading: true
    })),
    on(getAccountDetailsActionSuccess, (state, { data }) => ({
        ...state,
        accountDetailsPayload: data,
        accountDetailsLoading: false
    })),
    on(getAccountDetailsActionFailure, (state, { error }) => ({
        ...state,
        accountDetailsError: error,
        accountDetailsLoading: false
    })),
    on(getLegalTextAction, state => ({
        ...state,
        getLegalTextLoading: true
    })),
    on(getLegalTextActionSuccess, (state, { data }) => ({
        ...state,
        legalTextResponse: data,
        getLegalTextLoading: false
    })),
    on(getLegalTextActionFailure, (state, { error }) => ({
        ...state,
        legalTextError: error,
        getLegalTextLoading: false
    })),
    on(validateRegistrationLinkAction, state => ({
        ...state,
        linkValidationLoading: true
    })),
    on(validateRegistrationLinkActionSuccess, (state, { data }) => ({
        ...state,
        linkValidationPayload: data,
        linkValidationLoading: false
    })),
    on(validateRegistrationLinkActionFailure, (state, { error }) => ({
        ...state,
        linkValidationError: error,
        linkValidationLoading: false
    })),
    on(getSelfRegistrationDetailsAction, state => ({
        ...state,
        selfRegistrationDetailsLoading: true
    })),
    on(getSelfRegistrationDetailsActionSuccess, (state, { data }) => ({
        ...state,
        selfRegistrationDetailsPayload: data,
        selfRegistrationDetailsLoading: false
    })),
    on(getSelfRegistrationDetailsActionFailure, (state, { error }) => ({
        ...state,
        selfRegistrationDetailsError: error,
        selfRegistrationDetailsLoading: false
    })),
    on(emailOptoutAction, state => ({
        ...state,
        emailOptoutLoading: true
    })),
    on(emailOptoutActionSuccess, (state, { data }) => ({
        ...state,
        emailOptoutResponse: data,
        emailOptoutLoading: false
    })),
    on(emailOptoutActionFailure, (state, { error }) => ({
        ...state,
        emailOptoutError: error,
        emailOptoutLoading: false
    })),
    on(getParticipantDetailsAction, state => ({
        ...state,
        participantDetailsLoading: true
    })),
    on(getParticipantDetailsActionSuccess, (state, { response }) => ({
        ...state,
        participantDetailsResponse: response?.body?.data,
        participantDetailsLoading: false
    })),
    on(getParticipantDetailsActionFailure, (state, { error }) => ({
        ...state,
        participantDetailsError: error,
        participantDetailsLoading: false
    })),
    on(getSubscriptionAccountAction, state => ({
        ...state,
        subscriptionAccountLoading: true
    })),
    on(getSubscriptionAccountActionSuccess, (state, { response }) => ({
        ...state,
        subscriptionAccountPayload: response?.body?.data,
        subscriptionAccountLoading: false
    })),
    on(getSubscriptionAccountActionFailure, (state, { error }) => ({
        ...state,
        subscriptionAccountError: error,
        subscriptionAccountLoading: false
    })),
    on(setNewSignupAction, (state, { isNewSignup }) => ({
        ...state,
        isNewSignup
    }))
);
