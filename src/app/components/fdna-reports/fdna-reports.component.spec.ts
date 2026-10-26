import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';

import { FdnaReportsComponent } from './fdna-reports.component';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'primeng/api';
import { fdnaReportReducer } from './store/fdna-reports.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { AppService } from 'src/app/service/app.service';
import { MockAppService } from 'src/mock/mock-app.service';
import { MockMixpanelService } from 'src/mock/mock-mixpanel.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { DashboardServiceService } from '../dashboard/dashboard-service.service';
import { MockDashboardService } from 'src/mock/mock-dashboard.service';
import { MsgService } from 'src/app/service/msg.service';
import { MockMsgService } from 'src/mock/mock-msg.service';

describe('FdnaReportsComponent', () => {
    let component: FdnaReportsComponent;
    let fixture: ComponentFixture<FdnaReportsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FdnaReportsComponent],
            imports: [
                StoreModule.forRoot({ fdnaReportReducer: fdnaReportReducer }),
                CommonModule,
                NgChartsModule,
                SharedModule
            ],
            providers: [
                provideMockStore(),
                { provide: MsgService, useClass: MockMsgService },
                { provide: MixpanelService, useClass: MockMixpanelService },
                {
                    provide: DashboardServiceService,
                    useClass: MockDashboardService
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FdnaReportsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render report header', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="report-header"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render report download button in header and call downloadPdf method on click.', fakeAsync(() => {
        component.isDownloadReady = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="report-download-btn"]'
        );
        expect(el).toBeTruthy();

        spyOn(component, 'downloadPdf');
        el.click();
        tick();
        expect(component.downloadPdf).toHaveBeenCalled();
    }));

    it('should render report title in report', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="report-title"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render unique style in report', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="unique-style"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render unique style video section in report', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="unique-style-video"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render unique style video qrcode in report', () => {
        component.showCard = {};
        component.showCard['video'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="unique-style-video-qrcode"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render financial behavior overview section in report', () => {
        component.showCard = {};
        component.showCard['fbOverview'] = true;
        fixture.detectChanges();
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="fb-overview"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render strongest behavioral biases section in report', () => {
        component.showCard = {};
        component.showCard['bBiases'] = true;
        component.behavioralBiases = [];
        fixture.detectChanges();
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="strongest-behavioral-biases"]'
        );
        expect(el).toBeTruthy();

        const firstBiaseQrCode = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="first-biase-qrcode"]'
        );
        expect(firstBiaseQrCode).toBeTruthy();

        const secondBiaseQrCode = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="second-biase-qrcode"]'
        );
        expect(secondBiaseQrCode).toBeTruthy();
    });

    it('should render market mood video qrcode in report', () => {
        component.showCard = {};
        component.showCard['marketMood'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="market-mood-qrcode"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render performance keys strengths section', () => {
        component.showCard = {};
        component.showCard['performanceKeys'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="strengths"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render performance keys struggles section', () => {
        component.showCard = {};
        component.showCard['performanceKeys'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="struggles"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render performance keys struggles section', () => {
        component.showCard = {};
        component.showCard['fbInsights'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="financial-insights"]'
        );
        expect(el).toBeTruthy();
    });
});
