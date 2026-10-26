import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';

import { InstructionsComponent } from './instructions.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { AppService } from 'src/app/service/app.service';
import { MockAppService } from 'src/mock/mock-app.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MockMixpanelService } from 'src/mock/mock-mixpanel.service';
import { MsgService } from 'src/app/service/msg.service';
import { MockMsgService } from 'src/mock/mock-msg.service';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/safe.pipe';
import { MockSafePipe } from 'src/mock/mock-safe.pipe';
import {
    getDiscoveryStatusActionFailure,
    userScheduleDiscoveryActionFailure
} from './store/instructions-actions';

describe('InstructionsComponent', () => {
    let component: InstructionsComponent;
    let fixture: ComponentFixture<InstructionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            declarations: [InstructionsComponent, SafePipe],
            providers: [
                provideMockStore(),
                { provide: AppService, useClass: MockAppService },
                { provide: MixpanelService, useClass: MockMixpanelService },
                {
                    provide: MsgService,
                    useClass: MockMsgService
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InstructionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render header with logo and logout dropdown', () => {
        component.pageLoading = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const headerEl = compiled.querySelector('[data-testId="header"]');
        expect(headerEl).toBeTruthy();

        const logoEl = compiled.querySelector('[data-testId="logo"]');
        expect(logoEl).toBeTruthy();

        const dropdownEl = compiled.querySelector(
            '[data-testId="logout-dropdown"]'
        );
        expect(dropdownEl).toBeTruthy();
    });

    it('should render title "Create Your Account"', () => {
        component.pageLoading = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const titleEl = compiled.querySelector('[data-testId="title"]');
        expect(titleEl.textContent).toContain('Create Your Account');
    });

    it('should render title "Discover Your DNA"', () => {
        component.pageLoading = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const titleEl = compiled.querySelector('[data-testId="title-2"]');
        expect(titleEl.textContent).toContain('Discover Your DNA');
    });

    it('should render instructions section', () => {
        component.pageLoading = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const el = compiled.querySelector('[data-testId="instructions"]');
        expect(el).toBeTruthy();
    });

    it('should render "Start Discovery" button and call "onClick" method on click', fakeAsync(() => {
        component.pageLoading = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const el = compiled.querySelector(
            '[data-testId="start-discovery-btn"]'
        );
        expect(el).toBeTruthy();

        spyOn(component, 'onClick');
        el.click();
        tick();
        expect(component.onClick).toHaveBeenCalled();
    }));

    it('should render video thumbnail content', () => {
        component.pageLoading = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const el = compiled.querySelector(
            '[data-testId="video-thumbnail-content"]'
        );
        expect(el).toBeTruthy();
    });
});

/**
 * Separate TestBed setup: feeds a *_FAILURE action directly into the component's `Actions` stream
 * via provideMockActions (no HTTP layer involved here - instructions-effects.spec.ts already
 * covers "does a bad payload/URL produce the right ApiError"). This proves the other half: "does
 * the component send the right thing to Mixpanel once it receives that ApiError" - the exact
 * question asked when testing Mixpanel accuracy, without touching the network or a browser.
 */
describe('InstructionsComponent - failure -> Mixpanel payload', () => {
    let component: InstructionsComponent;
    let fixture: ComponentFixture<InstructionsComponent>;
    let mixpanelService: MixpanelService;
    let actions$: Observable<any>;

    async function setupWithAction(action: any) {
        actions$ = of(action);

        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            declarations: [InstructionsComponent, SafePipe],
            providers: [
                provideMockStore(),
                provideMockActions(() => actions$),
                { provide: AppService, useClass: MockAppService },
                { provide: MixpanelService, useClass: MockMixpanelService },
                { provide: MsgService, useClass: MockMsgService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(InstructionsComponent);
        component = fixture.componentInstance;
        mixpanelService = TestBed.inject(MixpanelService);

        // Deterministic context fields, set the same way ngOnInit would populate them from
        // localStorage/user object - set here directly so the Mixpanel payload assertions below
        // don't depend on decrypting a real (or fake) token.
        component.personId = 'person-42';
        component.accountId = 'account-7';
        component.email = 'test@example.com';
        component.username = 'Test User';
        component.creditId = 'credit-99';
        component.discoveryType = 'talent';

        spyOn(mixpanelService, 'track');
        fixture.detectChanges(); // runs ngOnInit, which subscribes to `actions` and receives the fed action
    }

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('tracks "Get Discovery Status Failed" with the real error message/status and no undefined context fields', async () => {
        const error = { status: 503, message: 'The service is temporarily unavailable.' };
        await setupWithAction(getDiscoveryStatusActionFailure(error));

        expect(mixpanelService.track).toHaveBeenCalledWith(
            'Get Discovery Status Failed',
            jasmine.objectContaining({
                personId: 'person-42',
                accountId: 'account-7',
                email: 'test@example.com',
                name: 'Test User',
                creditId: 'credit-99',
                discoveryType: 'talent',
                errorMessage: error.message,
                statusCode: error.status
            })
        );

        // Fails loudly if a future edit accidentally reintroduces `apiResponse: response` (the
        // pre-migration field, which held a whole raw response object instead of a message/status).
        const call = (mixpanelService.track as jasmine.Spy).calls.mostRecent();
        expect(call.args[1].apiResponse).toBeUndefined();
    });

    it('tracks "Schedule Discovery Failed" with the real error message/status', async () => {
        const error = { status: 400, message: 'You have already scheduled a discovery.' };
        await setupWithAction(userScheduleDiscoveryActionFailure(error));

        expect(mixpanelService.track).toHaveBeenCalledWith(
            'Schedule Discovery Failed',
            jasmine.objectContaining({
                personId: 'person-42',
                accountId: 'account-7',
                errorMessage: error.message,
                statusCode: error.status
            })
        );
    });
});
