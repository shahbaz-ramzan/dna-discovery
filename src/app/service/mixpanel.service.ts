import { Injectable } from '@angular/core';
import * as mixpanel from 'mixpanel-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  /**
   * Initialize mixpanel.
   *
   * 
   * @memberof MixpanelService
   */
  init(): void {
    mixpanel.init(environment.mixpanelToken);
    
  }

  addUser(userToken: any): void{
    mixpanel.identify(userToken);
  }

  createProfile(profileData: any){
    mixpanel.people.set(profileData);
  }

  /**
   * Push new action to mixpanel.
   *
   * @param {string} id Name of the action to track.
   * @param {*} [action={}] Actions object with custom properties.
   * @memberof MixpanelService
   */
  track(id: string, action: any = {}): void {
    // Dev-only visibility into every payload sent to Mixpanel (same environment.production guard
    // pattern as ApiErrorInterceptor's [API SUCCESS]/[API FAILED] logging in api-error.ts) - lets
    // you verify the exact fields ('X Failed' events included) before they leave the app, without
    // needing the Mixpanel dashboard or network inspector.
    if (!environment.production) {
      console.log(`[Mixpanel] ${id}`, action);
    }
    mixpanel.track(id, action);
  }
}