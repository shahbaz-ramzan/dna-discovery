import { createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    getQuestionListAction,
    getQuestionListActionSuccess,
    getQuestionListActionFailure,
    getQuestionStatusAction,
    getQuestionStatusActionSuccess,
    getQuestionStatusActionFailure,
    saveQuestionAnswerAction,
    saveQuestionAnswerActionSuccess,
    saveQuestionAnswerActionFailure
} from './questionnaire-actions';

export const initialState = {
    questionListLoading: false,
    questionStatusLoading: false,
    savingQuestionLoading: false,
    questionListPayload: undefined,
    questionStatusPayload: undefined,
    savingQuestionPayload: undefined,
    // == error handlers (reducer-only - no toast/mixpanel tied to these) ===
    questionListError: undefined as ApiError | undefined,
    questionStatusError: undefined as ApiError | undefined,
    savingQuestionError: undefined as ApiError | undefined
};

export const questionnaireReducer = createReducer(
    initialState,
    on(getQuestionListAction, state => ({
        ...state,
        questionListLoading: true
    })),
    on(getQuestionListActionSuccess, (state, { data }) => ({
        ...state,
        questionListLoading: false,
        questionListPayload: data
    })),
    on(getQuestionListActionFailure, (state, { error }) => ({
        ...state,
        questionListLoading: false,
        questionListError: error
    })),
    on(getQuestionStatusAction, state => ({
        ...state,
        questionStatusLoading: true
    })),
    on(getQuestionStatusActionSuccess, (state, { response }) => ({
        ...state,
        questionStatusLoading: false,
        questionStatusPayload: response?.body?.data
    })),
    on(getQuestionStatusActionFailure, (state, { error }) => ({
        ...state,
        questionStatusLoading: false,
        questionStatusError: error
    })),
    on(saveQuestionAnswerAction, state => ({
        ...state,
        savingQuestionLoading: true
    })),
    on(saveQuestionAnswerActionSuccess, (state, { data }) => ({
        ...state,
        savingQuestionLoading: false,
        savingQuestionPayload: data
    })),
    on(saveQuestionAnswerActionFailure, (state, { error }) => ({
        ...state,
        savingQuestionLoading: false,
        savingQuestionError: error
    }))
);
