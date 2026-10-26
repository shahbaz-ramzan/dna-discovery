import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import K from 'src/app/constants/index';
import { NetworkService } from 'src/app/service/network.service';
import Request from 'src/app/service/requests';
@Injectable({
    providedIn: 'root'
})
export class InstructionsRequest extends Request {
    constructor(@Inject('params') private params: any) {
        super(params);
    }

    static getPersonCreditId(personId: any) {
        return new Request(
            K.NETWORK.URL.GET_CREDIT_ID + '/' + personId,
            K.NETWORK.METHOD.GET
        );
    }

    static userScheduleDiscovery(discoveryPayload: any) {
        return new Request(
            K.NETWORK.URL.USER_SCHEDULE_DISCOVERY,
            K.NETWORK.METHOD.POST,
            discoveryPayload
        )
    }

    static getDiscoveryStatus(creditID: any){
        return new Request(
            K.NETWORK.URL.GET_DISCOVERY_STATUS + '/' + creditID,
            K.NETWORK.METHOD.GET
        )
    }
}
