import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';
import {
    MsalService,
    MsalBroadcastService,
    MSAL_GUARD_CONFIG,
    MsalGuardConfiguration,
    MsalModule,
    MSAL_INSTANCE
} from '@azure/msal-angular';

import { WellcomeComponent } from './wellcome.component';
import { AppService } from 'src/app/service/app.service';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/service/msg.service';
import { MockMsgService } from 'src/mock/mock-msg.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { InteractionType } from '@azure/msal-browser';
import { PublicClientApplication, Configuration } from '@azure/msal-browser';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/safe.pipe';

describe('WellcomeComponent', () => {
    let component: WellcomeComponent;
    let fixture: ComponentFixture<WellcomeComponent>;
    let msalGuardConfig: MsalGuardConfiguration;

    const mockMsalInstance = new PublicClientApplication({
        auth: {
            clientId: '',
            authority: '',
            redirectUri: ''
        },
        cache: {
            cacheLocation: '',
            storeAuthStateInCookie: true
        }
    });

    beforeEach(async () => {
        msalGuardConfig = {
            interactionType: InteractionType.Redirect,
            authRequest: {
                scopes: ['user.read']
            }
        };

        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({}), MsalModule, CommonModule],
            declarations: [WellcomeComponent, SafePipe],
            providers: [
                provideMockStore(),
                {
                    provide: MsalBroadcastService,
                    usevalue: jasmine.createSpyObj('MsalBroadcastService', [
                        'msalSubject$'
                    ])
                },
                {
                    provide: MsalService,
                    useValue: jasmine.createSpyObj('MsalService', [
                        'loginPopup'
                    ])
                },
                {
                    provide: AppService,
                    useValue: jasmine.createSpyObj('AppService', [
                        'setLegalText',
                        'logout'
                    ])
                },
                { provide: MsgService, useValue: MockMsgService },
                {
                    provide: MixpanelService,
                    useValue: jasmine.createSpyObj('MixpanelService', ['track'])
                },
                {
                    provide: Router,
                    useValue: jasmine.createSpyObj('Router', ['navigate'])
                },
                {
                    provide: MSAL_GUARD_CONFIG,
                    useValue: msalGuardConfig
                },
                {
                    provide: MSAL_INSTANCE,
                    useValue: mockMsalInstance
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WellcomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render logo', () => {
        component.linkValidationLoading = false;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="header-logo"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render title', () => {
        component.linkValidationLoading = false;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="title"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render description', () => {
        component.linkValidationLoading = false;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="desc"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render login button and call login() method on click', fakeAsync(() => {
        component.linkValidationLoading = false;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="login-btn"]'
        );

        spyOn(component, 'login');
        el.click();
        tick();
        expect(component.login).toHaveBeenCalled();

        expect(el).toBeTruthy();
    }));

    it('should render signup button and call signup() method on click', fakeAsync(() => {
        component.linkValidationLoading = false;
        component.showSignUpButton = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="signup-btn"]'
        );

        spyOn(component, 'signup');
        el.click();
        tick();
        expect(component.signup).toHaveBeenCalled();

        expect(el).toBeTruthy();
    }));

    it('should render welcome video', () => {
        component.linkValidationLoading = false;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="welcome-image"]'
        );
        expect(el).toBeTruthy();
    });

    it('should play video on welcome video click', fakeAsync(() => {
        component.linkValidationLoading = false;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="welcome-video-player"]'
        );
        expect(el).toBeTruthy();

        spyOn(component, 'showModalDialog');
        el.click();
        tick();
        expect(component.showModalDialog).toHaveBeenCalled();
    }));
});
