import { Injectable } from '@angular/core';
import K from 'src/app/constants';
import { NetworkService } from 'src/app/service/network.service';
import { InstructionsRequest } from 'src/app/service/requests/instructions-requests';

@Injectable({
    providedIn: 'root'
})
export class InstructionsService {
    constructor(private networkService: NetworkService) {}

    getPersonCreditIdCall(personId: any) {
        return this.networkService.httpCall(
            InstructionsRequest.getPersonCreditId(personId)
        );
    }

    userScheduleDiscoveryCall(discoveryPayload: any) {
        return this.networkService.httpCall(
            InstructionsRequest.userScheduleDiscovery(discoveryPayload)
        );
    }

    getDiscoveryStatusCall(creditId: any) {
        return this.networkService.httpCall(
            InstructionsRequest.getDiscoveryStatus(creditId)
        );
    }
}
