import { createAction } from '@ngrx/store';
import { ApiError } from 'src/app/service/api-error';
import {
    GET_QUESTION_LIST_ACTION,
    GET_QUESTION_LIST_ACTION_SUCCESS,
    GET_QUESTION_LIST_ACTION_FAILURE,
    GET_QUESTION_STATUS_ACTION,
    GET_QUESTION_STATUS_ACTION_SUCCESS,
    GET_QUESTION_STATUS_ACTION_FAILURE,
    SAVE_QUESTION_ANSWER_ACTION,
    SAVE_QUESTION_ANSWER_ACTION_SUCCESS,
    SAVE_QUESTION_ANSWER_ACTION_FAILURE
} from './questionnaire-action-constants';

export const getQuestionListAction = createAction(
    GET_QUESTION_LIST_ACTION,
    (profileId: any, languageId: any) => ({
        profileId,
        languageId
    })
);

export const getQuestionListActionSuccess = createAction(
    GET_QUESTION_LIST_ACTION_SUCCESS,
    (data: any) => ({ data })
);

export const getQuestionListActionFailure = createAction(
    GET_QUESTION_LIST_ACTION_FAILURE,
    (error: ApiError) => ({ error, notify: true })
);

export const getQuestionStatusAction = createAction(
    GET_QUESTION_STATUS_ACTION,
    (personId: any) => ({
        personId
    })
);

export const getQuestionStatusActionSuccess = createAction(
    GET_QUESTION_STATUS_ACTION_SUCCESS,
    (response: any) => ({
        response
    })
);

export const getQuestionStatusActionFailure = createAction(
    GET_QUESTION_STATUS_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);

export const saveQuestionAnswerAction = createAction(
    SAVE_QUESTION_ANSWER_ACTION,
    (questionData: any) => ({
        questionData
    })
);

export const saveQuestionAnswerActionSuccess = createAction(
    SAVE_QUESTION_ANSWER_ACTION_SUCCESS,
    (data: any) => ({ data })
);

export const saveQuestionAnswerActionFailure = createAction(
    SAVE_QUESTION_ANSWER_ACTION_FAILURE,
    (error: ApiError) => ({ error })
);
