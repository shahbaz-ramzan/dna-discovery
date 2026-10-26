import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import K from "../constants";
import { AppService } from "../service/app.service";
import Encryption from "../util/Encryption";

@Injectable({
  providedIn: "root"
})
export class AuthGuard  {
  constructor(private appService: AppService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log("token", localStorage.getItem(AppConstants.ACCESS_TOKEN))
    if (
      Encryption.decryptData(localStorage.getItem(K.APP.ACCESS_TOKEN) || "")
    ) {
      return true;
    } else {
      let discoveryType = localStorage.getItem('discoveryType');
      this.appService.logout(discoveryType);
      return false;
    }
  }

  validateRole(state: string): boolean {
    return true;
  }

  filterOnlyUrl(state: RouterStateSnapshot): string {
    return state.url.split("?")[0];
  }
}
