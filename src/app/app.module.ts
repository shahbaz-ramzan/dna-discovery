import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrimengModule } from './shared/primeng/primeng.module';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { NgChartsModule } from 'ng2-charts';
import { HomeComponent } from './components/home/home.component';
import { BasicModalComponent } from './components/modals/basic-modal/basic-modal.component';
import { SidebarModalComponent } from './components/modals/sidebar-modal/sidebar-modal.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { dashboardReducer } from './components/dashboard/store/dashboard.reducer';
import { DashboardEffect } from './components/dashboard/store/dashboard.effect';
import { FooterComponent } from './components/common/footer/footer.component';
import {
    MsalGuard,
    MsalInterceptor,
    MsalModule,
    MsalRedirectComponent
} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, protectedResources } from './auth/auth-config';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { SafePipe } from './safe.pipe';

import { WelcomeEffects } from './components/wellcome/store/welcome-effects';
import { QuestionnaireEffects } from './components/questionnaire/store/questionnaire-effects';
import { welcomeReducer } from './components/wellcome/store/welcome-reducers';
import { questionnaireReducer } from './components/questionnaire/store/questionnaire-reducers';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { InstructionsEffects } from './components/instructions/store/instructions-effects';
import { instructionsReducer } from './components/instructions/store/instructions-reducers';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from './shared/shared.module';
import { BdnaReportsComponent } from './components/bdna-reports/bdna-reports.component';
import { FdnaReportsComponent } from './components/fdna-reports/fdna-reports.component';
import { FDNAReportEffect } from './components/fdna-reports/store/fdna-reports.effect';
import { fdnaReportReducer } from './components/fdna-reports/store/fdna-reports.reducer';
import { bdnaReportReducer } from './components/bdna-reports/store/bdna-reports.reducer';
import { QrCodeModule } from 'ng-qrcode';
import { CookieService } from 'ngx-cookie-service';
import { ApiErrorInterceptor, ApiErrorNotificationEffects } from './service/api-error';
import { AuthErrorInterceptor } from './service/auth-error.interceptor';
// import { CreateAccountComponent } from './create-account/create-account.component';

// import { ReviewsLabelsComponent } from './components/onboarding/reviews-labels/reviews-labels.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BasicModalComponent,
        SidebarModalComponent,
        NotfoundComponent,
        FooterComponent,
        WellcomeComponent,
        QuestionnaireComponent,
        QuestionnaireComponent,
        InstructionsComponent,
        BdnaReportsComponent,
        FdnaReportsComponent
        // CreateAccountComponent
    ],
    imports: [
        SharedModule,
        DashboardModule,
        BrowserModule,
        QrCodeModule,
        StoreModule.forRoot({
            dashboardReducer: dashboardReducer,
            welcomeReducer: welcomeReducer,
            questionnaireReducer: questionnaireReducer,
            instructionsReducer: instructionsReducer,
            fdnaReportReducer: fdnaReportReducer,
            bdnaReportReducer: bdnaReportReducer
        }),
        EffectsModule.forRoot([
            DashboardEffect,
            WelcomeEffects,
            QuestionnaireEffects,
            InstructionsEffects,
            FDNAReportEffect,
            ApiErrorNotificationEffects
        ]),
        AppRoutingModule,
        PrimengModule,
        BrowserAnimationsModule,
        NgChartsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        TabViewModule,
        SidebarModule,
        NgCircleProgressModule.forRoot({
            radius: 74,
            space: -8,
            outerStrokeWidth: 16,
            innerStrokeWidth: 16,
            outerStrokeColor: '#78C000',
            innerStrokeColor: '#C7E596',
            animationDuration: 300,
            titleFontSize: '20',
            titleFontWeight: 'bold',
            imageHeight: 100,
            imageWidth: 100
        }),
        MsalModule.forRoot(
            new PublicClientApplication(msalConfig),
            {
                // The routing guard configuration.
                interactionType: InteractionType.Redirect,
                authRequest: {
                    scopes: protectedResources.todoListApi.scopes
                }
            },
            {
                // MSAL interceptor configuration.
                // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
                interactionType: InteractionType.Redirect,
                protectedResourceMap: new Map([
                    [
                        protectedResources.todoListApi.endpoint,
                        protectedResources.todoListApi.scopes
                    ]
                ])
            }
        )
    ],
    providers: [
        ConfirmationService,
        MsalGuard,
        CookieService,
        // Registration order matters: each interceptor's next.handle() invokes the next one in
        // this array, so the LAST entry is innermost (closest to the real HTTP call) and the
        // FIRST is outermost. AuthErrorInterceptor sits right after MsalInterceptor (which has
        // to stay first, to attach the auth token) so it uniformly catches 401s from everything
        // after it. ApiErrorInterceptor normalizes any remaining failure into an ApiError,
        // explicitly skipping 401s that AuthErrorInterceptor already owns.
        { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {}
