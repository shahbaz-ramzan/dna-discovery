import { createAction } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    GET_CREDIT_ID_ACTION,
    GET_CREDIT_ID_ACTION_SUCCESS,
    GET_CREDIT_ID_ACTION_FAILURE,
    GET_DISCOVERY_STATUS_ACTION,
    GET_DISCOVERY_STATUS_ACTION_SUCCESS,
    GET_DISCOVERY_STATUS_ACTION_FAILURE,
    USER_SCHEDULE_DISCOVERY_ACTION,
    USER_SCHEDULE_DISCOVERY_ACTION_SUCCESS,
    USER_SCHEDULE_DISCOVERY_ACTION_FAILURE
} from './instructions-actions-constants';

export const getCreditIdAction = createAction(
    GET_CREDIT_ID_ACTION,
    (personId: any) => ({
        personId
    })
);

export const getCreditIdActionSuccess = createAction(
    GET_CREDIT_ID_ACTION_SUCCESS,
    (response: any) => ({
        response
    })
);

export const getCreditIdActionFailure = createAction(
    GET_CREDIT_ID_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const userScheduleDiscoveryAction = createAction(
    USER_SCHEDULE_DISCOVERY_ACTION,
    (discoveryPayload: any) => ({
        discoveryPayload
    })
);

export const userScheduleDiscoveryActionSuccess = createAction(
    USER_SCHEDULE_DISCOVERY_ACTION_SUCCESS,
    (data: any) => ({ data })
);

export const userScheduleDiscoveryActionFailure = createAction(
    USER_SCHEDULE_DISCOVERY_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);

export const getDiscoveryStatusAction = createAction(
    GET_DISCOVERY_STATUS_ACTION,
    (creditId: any) => ({
        creditId
    })
);

export const getDiscoveryStatusActionSuccess = createAction(
    GET_DISCOVERY_STATUS_ACTION_SUCCESS,
    (data: any) => ({ data })
);

export const getDiscoveryStatusActionFailure = createAction(
    GET_DISCOVERY_STATUS_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);
