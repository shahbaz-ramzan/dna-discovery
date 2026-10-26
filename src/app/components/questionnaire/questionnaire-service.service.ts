import { Injectable } from '@angular/core';
import K from 'src/app/constants';
import { NetworkService } from 'src/app/service/network.service';
import { QuestionnaireRequest } from 'src/app/service/requests/questionnaire-requests';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {
    constructor(private networkService: NetworkService) {}

    getQuestionListCall(profileId: any, languageId: any) {
        return this.networkService.httpCall(
            QuestionnaireRequest.getQuestionsList(profileId, languageId)
        );
    }

    getQuestionaAnswerStatusCall(personId: any) {
        return this.networkService.httpCall(
            QuestionnaireRequest.getQuestionAnswerStatus(personId)
        );
    }

    saveQuestionAnswerCall(questionData: any) {
        return this.networkService.httpCall(
            QuestionnaireRequest.saveQuestionAnswer(questionData)
        );
    }
}
