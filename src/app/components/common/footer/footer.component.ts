import {
    Component,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/service/app.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
    @Output() graphEvent = new EventEmitter();

    footerYear = moment(new Date()).format('YYYY');
    legalText: string = '';
    expanded: boolean = false;
    private subscription: Subscription;
    constructor(private appService: AppService) {
        this.subscription = this.appService?.functionExecute$?.subscribe(() => {
            this.setLegalText();
        });
    }

    ngOnInit(): void {
        this.legalText = localStorage.getItem('legalText') || '';
    }

    setLegalText() {
        this.legalText = localStorage.getItem('legalText') || '';
    }
    expandCollapse() {
        this.expanded = !this.expanded;
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
