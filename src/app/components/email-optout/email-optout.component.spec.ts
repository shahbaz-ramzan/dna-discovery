import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';

import { EmailOptoutComponent } from './email-optout.component';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'primeng/api';
import { provideMockStore } from '@ngrx/store/testing';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MockMixpanelService } from 'src/mock/mock-mixpanel.service';

describe('EmailOptoutComponent', () => {
    let component: EmailOptoutComponent;
    let fixture: ComponentFixture<EmailOptoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmailOptoutComponent],
            imports: [
                StoreModule.forRoot({}),
                CommonModule,
                NgChartsModule,
                SharedModule
            ],
            providers: [
                provideMockStore(),
                { provide: MixpanelService, useClass: MockMixpanelService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailOptoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render email output section', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="email-output"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render back to app button and call backToApp method on click', fakeAsync(() => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="back-to-app-btn"]'
        );
        expect(el).toBeTruthy();

        spyOn(component, 'backToApp');
        el.click();
        tick();
        expect(component.backToApp).toHaveBeenCalled();
    }));
});
