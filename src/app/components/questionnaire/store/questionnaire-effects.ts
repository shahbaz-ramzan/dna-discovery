import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { catchApiError } from 'src/app/service/api-error';
import { QuestionnaireService } from '../questionnaire-service.service';
import {
    getQuestionListActionSuccess,
    getQuestionListActionFailure,
    getQuestionStatusActionFailure,
    saveQuestionAnswerActionSuccess,
    saveQuestionAnswerActionFailure
} from './questionnaire-actions';
import {
    GET_QUESTION_LIST_ACTION,
    GET_QUESTION_STATUS_ACTION,
    GET_QUESTION_STATUS_ACTION_SUCCESS,
    SAVE_QUESTION_ANSWER_ACTION
} from './questionnaire-action-constants';

@Injectable()
export class QuestionnaireEffects {
    getQuestionList = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_QUESTION_LIST_ACTION),
            mergeMap(({ profileId, languageId }) =>
                this.questionnaireService
                    .getQuestionListCall(profileId, languageId)
                    .pipe(
                        map(response => getQuestionListActionSuccess((response?.body as any)?.data)),
                        catchApiError(error => getQuestionListActionFailure(error))
                    )
            )
        )
    );

    getQuestionStatus = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_QUESTION_STATUS_ACTION),
            mergeMap(({ personId }) =>
                this.questionnaireService
                    .getQuestionaAnswerStatusCall(personId)
                    .pipe(
                        map(response => ({
                            type: GET_QUESTION_STATUS_ACTION_SUCCESS,
                            response
                        })),
                        catchApiError(error => getQuestionStatusActionFailure(error))
                    )
            )
        )
    );

    saveQuestionAnswer = createEffect(() =>
        this.actions$.pipe(
            ofType(SAVE_QUESTION_ANSWER_ACTION),
            mergeMap(({ questionData }) =>
                this.questionnaireService
                    .saveQuestionAnswerCall(questionData)
                    .pipe(
                        map(response => saveQuestionAnswerActionSuccess((response?.body as any)?.data)),
                        catchApiError(error => saveQuestionAnswerActionFailure(error))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private questionnaireService: QuestionnaireService
    ) {}
}
