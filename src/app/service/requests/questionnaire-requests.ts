import { Inject, Injectable } from '@angular/core';
import K from 'src/app/constants/index';
import Request from 'src/app/service/requests';
@Injectable({
    providedIn: 'root'
})
export class QuestionnaireRequest extends Request {
    constructor(@Inject('params') private params: any) {
        super(params);
    }

    static getQuestionsList(profileId: any, languageId: any) {
        return new Request(
            K.NETWORK.URL.GET_QUESTIONS_LIST +
                '/' +
                profileId +
                '/' +
                languageId,
            K.NETWORK.METHOD.GET
        );
    }

    static getQuestionAnswerStatus(personId: any) {
        return new Request(
            K.NETWORK.URL.GET_QUESTION_ANSWER_STATUS + '/' + personId,
            K.NETWORK.METHOD.GET
        );
    }

    static saveQuestionAnswer(questionData: any) {
        return new Request(
            K.NETWORK.URL.SAVE_QUESTION_ANSWER,
            K.NETWORK.METHOD.POST,
            questionData
        );
    }
}
