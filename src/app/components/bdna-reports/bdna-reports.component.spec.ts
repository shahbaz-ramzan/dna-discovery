import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { BdnaReportsComponent } from './bdna-reports.component';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { StoreModule } from '@ngrx/store';
import { bdnaReportReducer } from './store/bdna-reports.reducer';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { MockMsgService } from 'src/mock/mock-msg.service';
import { MsgService } from 'src/app/service/msg.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MockMixpanelService } from 'src/mock/mock-mixpanel.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DropdownModule } from 'primeng/dropdown';
import { MockDashboardService } from 'src/mock/mock-dashboard.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DashboardServiceService } from '../dashboard/dashboard-service.service';
import { QrCodeModule } from 'ng-qrcode';

describe('BdnaReportsComponent', () => {
    let component: BdnaReportsComponent;
    let fixture: ComponentFixture<BdnaReportsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                StoreModule.forRoot({ bdnaReportReducer: bdnaReportReducer }),
                // RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                CommonModule,
                NgChartsModule,
                QrCodeModule
                // PrimengModule
                // DropdownModule
                // DropdownModule
                // DashboardModule
            ],
            declarations: [BdnaReportsComponent],
            providers: [
                provideMockStore(),
                // { provide: MsalService, useClass: MockMsalService },
                // { provide: SettingsService, useClass: MockSettingsService },
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
        fixture = TestBed.createComponent(BdnaReportsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render report title in header', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="header-title"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render report download button in header and call downloadPdf method on click.', fakeAsync(() => {
        component.isDownloadReady = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="header-download-btn"]'
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

    it('should render report title in report', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="unique-style-desc"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render QRCode for unique style video', () => {
        component.showCard = {};
        component.showCard['video'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="unique-style-video-qrcode"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render Performance Keys Guide', () => {
        component.showCard = {};
        component.showCard['performanceKeys'] = true;
        fixture.detectChanges();

        const elComm = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="performance-keys-communication"]'
        );
        expect(elComm).toBeTruthy();

        const elStrengths = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="performance-keys-strengths"]'
        );
        expect(elStrengths).toBeTruthy();

        const elStruggles = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="performance-keys-struggles"]'
        );
        expect(elStruggles).toBeTruthy();
    });

    it('should render report page footer', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="page-footer"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render report financial insights', () => {
        component.showCard = {};
        component.showCard['workTalents'] = true;
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="financial-insights"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render report career insights', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="career-insights"]'
        );
        expect(el).toBeTruthy();
    });
});
