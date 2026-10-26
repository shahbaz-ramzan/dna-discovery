import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import K from 'src/app/constants/index';
import { NetworkService } from 'src/app/service/network.service';
import Request from 'src/app/service/requests';
@Injectable({
    providedIn: 'root'
})
export class RegistrationRequest extends Request {
    constructor(@Inject('params') private params: any) {
        super(params);
    }

    static getGroupSettings(registrationLinkId: any,accountId: any) {
        return new Request(
            K.NETWORK.URL.GET_GROUP_SETTINGS + '/' + registrationLinkId + '/' + accountId,
            K.NETWORK.METHOD.GET
        );
    }

    static getGroupPackageAccess(accountId: number) {
        return new Request(
            K.NETWORK.URL.GET_GROUP_PACKAGE_ACCESS + '/' + accountId,
            K.NETWORK.METHOD.GET
        )
    }

    static selfRegisterUser(registrationPayload: any) {
        return new Request(
            K.NETWORK.URL.SELF_REGISTER_USER,
            K.NETWORK.METHOD.POST,
            registrationPayload,
            true
        )
    }

    static userApiRegistration(registrationPayload: any,userRole: string) {
        return new Request(
            K.NETWORK.URL.USER_API_REGISTRATION + '/' + userRole,
            K.NETWORK.METHOD.POST,
            registrationPayload
        )
    }
  
}
