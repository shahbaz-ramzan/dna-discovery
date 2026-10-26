import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';

import { QuestionnaireComponent } from './questionnaire.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AppService } from 'src/app/service/app.service';
import { MockAppService } from 'src/mock/mock-app.service';
import { MockMixpanelService } from 'src/mock/mock-mixpanel.service';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import { MsgService } from 'src/app/service/msg.service';
import { MockMsgService } from 'src/mock/mock-msg.service';
import { StoreModule } from '@ngrx/store';

describe('QuestionnaireComponent', () => {
    let component: QuestionnaireComponent;
    let fixture: ComponentFixture<QuestionnaireComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            declarations: [QuestionnaireComponent],
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
        fixture = TestBed.createComponent(QuestionnaireComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render title "Discover Your DNA"', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="title"]'
        );
        expect(el.textContent).toContain('Discover Your DNA');
    });

    it('should render title "Discover Your DNA"', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="logour-dropdown"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render progress bar', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="progressbar"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render progress bar percentage', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="progressbar-percentage"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render question-number', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="question-number"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render questionaire section', () => {
        const el = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="questionair-section"]'
        );
        expect(el).toBeTruthy();
    });

    it('should render question title,description and options', () => {
        component.currentQuestion = [{}];
        fixture.detectChanges();
        const titleEl = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="question-title"]'
        );
        const descriptionEl = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="question-description"]'
        );
        const optionsEl = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="question-options"]'
        );
        expect(titleEl).toBeTruthy();
        expect(descriptionEl).toBeTruthy();
        expect(optionsEl).toBeTruthy();
    });

    it('should render questionaire footer with previous and next buttons and call "previousQuestion" and "nextQuestion" methods on click', fakeAsync(() => {
        const footerEl = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="questionaire-footer"]'
        );
        const prevBtnEl = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="prev-btn"]'
        );
        const nextBtnEl = fixture.debugElement.nativeElement.querySelector(
            '[data-testId="next-btn"]'
        );

        expect(footerEl).toBeTruthy();
        expect(prevBtnEl).toBeTruthy();
        expect(nextBtnEl).toBeTruthy();

        spyOn(component, 'previousQuestion');
        spyOn(component, 'nextQuestion');

        prevBtnEl.click();
        tick();
        expect(component.previousQuestion).toHaveBeenCalled();

        nextBtnEl.click();
        tick();
        expect(component.nextQuestion).toHaveBeenCalled();
    }));
});
