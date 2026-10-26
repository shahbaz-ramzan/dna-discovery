import { createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    getCreditIdAction,
    getCreditIdActionSuccess,
    getCreditIdActionFailure,
    getDiscoveryStatusAction,
    getDiscoveryStatusActionSuccess,
    getDiscoveryStatusActionFailure,
    userScheduleDiscoveryAction,
    userScheduleDiscoveryActionSuccess,
    userScheduleDiscoveryActionFailure
} from './instructions-actions';

export const initialState = {
    creditIdLoading: false,
    userScheduleDiscoveryLoading: false,
    discoveryStatusLoading: false,
    creditIdPayload: undefined,
    userScheduleDiscoveryPayload: undefined,
    discoveryStatusPayload: undefined,
    // == error handlers (reducer-only - no toast/mixpanel tied to these) ===
    creditIdError: undefined as ApiError | undefined,
    userScheduleDiscoveryError: undefined as ApiError | undefined,
    discoveryStatusError: undefined as ApiError | undefined
};

export const instructionsReducer = createReducer(
    initialState,
    on(getCreditIdAction, state => ({
        ...state,
        creditIdLoading: true
    })),
    on(getCreditIdActionSuccess, (state, { response }) => ({
        ...state,
        creditIdLoading: false,
        creditIdPayload: response?.body?.data
    })),
    on(getCreditIdActionFailure, (state, { error }) => ({
        ...state,
        creditIdLoading: false,
        creditIdError: error
    })),
    on(userScheduleDiscoveryAction, state => ({
        ...state,
        userScheduleDiscoveryLoading: true
    })),
    on(userScheduleDiscoveryActionSuccess, (state, { data }) => ({
        ...state,
        userScheduleDiscoveryLoading: false,
        userScheduleDiscoveryPayload: data
    })),
    on(userScheduleDiscoveryActionFailure, (state, { error }) => ({
        ...state,
        userScheduleDiscoveryLoading: false,
        userScheduleDiscoveryError: error
    })),
    on(getDiscoveryStatusAction, state => ({
        ...state,
        discoveryStatusLoading: true
    })),
    on(getDiscoveryStatusActionSuccess, (state, { data }) => ({
        ...state,
        discoveryStatusLoading: false,
        discoveryStatusPayload: data
    })),
    on(getDiscoveryStatusActionFailure, (state, { error }) => ({
        ...state,
        discoveryStatusLoading: false,
        discoveryStatusError: error
    }))
);
