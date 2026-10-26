import { Injectable } from '@angular/core';
import K from 'src/app/constants';
import { NetworkService } from 'src/app/service/network.service';
import { WelcomeRequest } from 'src/app/service/requests/welcome-requests';

@Injectable({
    providedIn: 'root'
})
export class WelcomeService {
    constructor(private networkService: NetworkService) {}

    getAccountDetailsCall(accountId: any, registrationId: any) {
        return this.networkService.httpCall(
            WelcomeRequest.getAccountDetails(accountId, registrationId)
        );
    }

    getLegalTextCall(accountId: any) {
        return this.networkService.httpCall(
            WelcomeRequest.getLegalText(accountId)
        );
    }

    validateRegistrationLinkCall(regitrationPayload: any) {
        return this.networkService.httpCall(
            WelcomeRequest.validateRegistrationLink(regitrationPayload)
        );
    }

    getSelfRegistrationDetailsCall(personId: any) {
        return this.networkService.httpCall(
            WelcomeRequest.getSelfRegistrationDetails(personId)
        );
    }

    emailOptoutCall(personId: any, creditId: any) {
        return this.networkService.httpCall(
            WelcomeRequest.emailOptout(personId, creditId)
        );
    }

    getCustomWelcomeDetails(accountId: number) {
        return this.networkService.httpCall(
            WelcomeRequest.getCustomWelcomeDetail(accountId)
        );
    }

    getParticipantDetailsCall(personId: any) {
        return this.networkService.httpCall(
            WelcomeRequest.getParticipantDetails(personId)
        );
    }

    getSubscriptionAccountCall(accountId: any) {
        return this.networkService.httpCall(
            WelcomeRequest.getSubscriptionAccount(accountId)
        );
    }
}
