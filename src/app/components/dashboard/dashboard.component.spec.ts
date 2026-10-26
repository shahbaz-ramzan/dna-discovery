import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DashboardComponent } from './dashboard.component';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MockMixpanelService } from 'src/mock/mock-mixpanel.service';
import { DashboardServiceService } from './dashboard-service.service';
import { MockDashboardService } from 'src/mock/mock-dashboard.service';
import { MockAppService } from 'src/mock/mock-app.service';
import { AppService } from 'src/app/service/app.service';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './store/dashboard.reducer';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({ dashboardReducer: dashboardReducer }),
                CommonModule,
                NgChartsModule,
                SharedModule
            ],
            declarations: [DashboardComponent],
            providers: [
                provideMockStore(),
                { provide: AppService, useClass: MockAppService },
                { provide: MixpanelService, useClass: MockMixpanelService },
                {
                    provide: DashboardServiceService,
                    useClass: MockDashboardService
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render header properly', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="header"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render logo on header properly', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="logo"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render logout dropdown on header properly', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="logout-dropdown"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render view report section', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="report-section"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render view report button', fakeAsync(() => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="view-report-btn"]'
        );
        expect(el).toBeTruthy();

        spyOn(component, 'viewReport');
        el.click();
        tick();
        expect(component.viewReport).toHaveBeenCalled();
    }));

    it('should render work talent overview card', () => {
        component.showCard = {};
        component.showCard['workTalents'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="work-talent-card"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render financial behavior overview card', () => {
        component.showCard = {};
        component.showCard['fbOverview'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="financial-behavior-card"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render market mood overview card', () => {
        component.showCard = {};
        component.showCard['marketMood'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="market-mood-card"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render financial behavior insights card', () => {
        component.showCard = {};
        component.showCard['fbInsights'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="fb-insights-card"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render performance keys card', () => {
        component.showCard = {};
        component.showCard['performanceKeys'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="performance-keys-card"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render desired tasks card', () => {
        component.showCard = {};
        component.showCard['careerInsights'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="desired-tasks-card"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render behavioral biases card', () => {
        component.showCard = {};
        component.showCard['bBiases'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="behavioral-biases"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render youtube video dialog', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="video-dialog"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render trial modal', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="trial-modal"]'
        );
        expect(el).toBeTruthy();
    });
});
