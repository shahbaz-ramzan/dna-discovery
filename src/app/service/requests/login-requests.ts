import { Inject, Injectable } from "@angular/core";
import K from "src/app/constants/index";
import Request from "src/app/service/requests";
@Injectable({
  providedIn: "root"
})
export class LoginRequest extends Request {
  constructor(@Inject("params") private params: any) {
    super(params);
  }

  static validateAdminUser(credentials: any) {
    return new Request(
      K.NETWORK.URL.VALIDATE_DNA_ADMIN_USER,
      K.NETWORK.METHOD.POST,
      credentials
    );
  }

  static getSubscriptionFeatures(accountId: string) {
    return new Request(
      K.NETWORK.URL.GET_SUBSCRIPTION_FEATURES + "/" + accountId,
      K.NETWORK.METHOD.GET
    );
  }

  static forgotPassword(email: string) {
    const payload = {
      'email': email
    };
    return new Request(
      K.NETWORK.URL.FORGOT_PASSWORD,
      K.NETWORK.METHOD.POST,
      payload
    );
  }
}
