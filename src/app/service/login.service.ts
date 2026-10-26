import { Injectable } from "@angular/core";
import { NetworkService } from "src/app/service/network.service";
import { LoginRequest } from "./requests/login-requests";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private networkService: NetworkService) { }

  validateAdminUser(email: string, password: string) {
    const credentials = { email, password };
    return this.networkService.httpCall(LoginRequest.validateAdminUser(credentials));

  }

  forgotPassword(email: string) {
    return this.networkService.httpCall(LoginRequest.forgotPassword(email));
  }

  getSubscriptionFeatures(accountId: string) {
    return this.networkService.httpCall(LoginRequest.getSubscriptionFeatures(accountId));
  }

}
