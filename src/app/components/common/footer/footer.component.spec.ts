import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { AppService } from 'src/app/service/app.service';
import { MockAppService } from 'src/mock/mock-app.service';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FooterComponent],
            providers: [{ provide: AppService, useClass: MockAppService }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render legal text in footer', () => {
        component.legalText = 'legal text';
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="legal-text"]'
        );

        expect(el).toBeTruthy();
    });

    it('should render copyright section in footer', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="copyright"]'
        );

        expect(el).toBeTruthy();
    });
});
