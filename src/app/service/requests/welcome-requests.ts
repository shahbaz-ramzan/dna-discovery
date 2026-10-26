import { Inject, Injectable } from '@angular/core';
import K from 'src/app/constants/index';
import Request from 'src/app/service/requests';
@Injectable({
    providedIn: 'root'
})
export class WelcomeRequest extends Request {
    constructor(@Inject('params') private params: any) {
        super(params);
    }

    static getAccountDetails(accountId: any, registrationId: any) {
        return new Request(
            K.NETWORK.URL.GET_ACCOUNT_DETAILS +
                '/' +
                accountId +
                '/' +
                registrationId,
            K.NETWORK.METHOD.GET,
            {},
            true
        );
    }

    static getLegalText(accountId: any) {
        return new Request(
            K.NETWORK.URL.GET_LEGAL_TEXT + '/' + accountId,
            K.NETWORK.METHOD.GET,
            {},
            true
        );
    }

    static validateRegistrationLink(regitrationPayload: any) {
        return new Request(
            K.NETWORK.URL.VALIDATE_REGISTRATION_LINK,
            K.NETWORK.METHOD.POST,
            regitrationPayload,
            true
        );
    }

    static getSelfRegistrationDetails(personId: any) {
        return new Request(
            K.NETWORK.URL.GET_SELF_REGISTRATION_DETAILS + '/' + personId,
            K.NETWORK.METHOD.GET
        );
    }

    static emailOptout(personId: any, creditId: any) {
        return new Request(
            K.NETWORK.URL.EMAIL_OPT_OUT + '/' + personId + '/' + creditId,
            K.NETWORK.METHOD.PUT,
            {},
            true
        );
    }

    static getCustomWelcomeDetail(accountId: number) {
        return new Request(
            K.NETWORK.URL.GET_CUSTOM_WELCOME_DETAIL + '/' + accountId,
            K.NETWORK.METHOD.GET,
            {},
            true
        );
    }

    static getParticipantDetails(payload: any) {
        return new Request(
            K.NETWORK.URL.GET_PARTICIPANTS_DETAIL,
            K.NETWORK.METHOD.POST,
            {
                accountId: payload.accountId,
                participants: [{ personId: payload.personId }]
            }
        );
    }

    static getSubscriptionAccount(accountId: any) {
        return new Request(
            K.NETWORK.URL.GET_SUBSCRIPTION_ACCOUNT + '/' + accountId,
            K.NETWORK.METHOD.GET
        );
    }
}
