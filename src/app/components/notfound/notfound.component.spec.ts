import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';

import { NotfoundComponent } from './notfound.component';
import { MockMixpanelService } from 'src/mock/mock-mixpanel.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';

describe('NotfoundComponent', () => {
    let component: NotfoundComponent;
    let fixture: ComponentFixture<NotfoundComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotfoundComponent],
            providers: [
                { provide: MixpanelService, useClass: MockMixpanelService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotfoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render title', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="title"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render a detail paragraph', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="details"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render a logo', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="logo"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render Work Talent Discovery button and call "investorClick" method on click', fakeAsync(() => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="fb-discovery-btn"]'
        );
        expect(el).toBeTruthy();

        spyOn(component, 'investorClick');
        el.click();
        tick();
        expect(component.investorClick).toHaveBeenCalled();
    }));

    it('should render Financial Behavior Discovery button and call "investorClick" method on click', fakeAsync(() => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="fb-discovery-btn"]'
        );
        expect(el).toBeTruthy();

        spyOn(component, 'investorClick');
        el.click();
        tick();
        expect(component.investorClick).toHaveBeenCalled();
    }));

    it('should render Work Talent Discovery button and call "talentClick" method on click', fakeAsync(() => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="wt-discovery-btn"]'
        );
        expect(el).toBeTruthy();

        spyOn(component, 'talentClick');
        el.click();
        tick();
        expect(component.talentClick).toHaveBeenCalled();
    }));
});
