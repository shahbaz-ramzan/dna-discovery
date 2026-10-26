import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MixpanelService } from 'src/app/service/mixpanel.service';
import {
    emailOptoutAction,
    emailOptoutActionSuccess,
    emailOptoutActionFailure
} from '../wellcome/store/welcome-actions';

@Component({
    selector: 'app-email-optout',
    templateUrl: './email-optout.component.html',
    styleUrls: ['./email-optout.component.scss']
})
export class EmailOptoutComponent implements OnInit {
    accountId: number;
    personId: string;
    creditId: number;
    private readonly _destroyed$: Subject<boolean> = new Subject<boolean>();
    loading: boolean = false;
    constructor(
        private mixpanelService: MixpanelService,
        private router: Router,
        private store: Store<any>,
        private actions: Actions
    ) {}

    ngOnInit(): void {
        let urlParts = window.location.href.split('/');
        this.accountId = parseInt(urlParts[4]);
        this.personId = urlParts[5];
        this.creditId = parseInt(urlParts[6]);
        this.loading = true;
        this.store.dispatch(emailOptoutAction(this.personId, this.creditId));

        this.actions
            .pipe(ofType(emailOptoutActionSuccess), takeUntil(this._destroyed$))
            .subscribe(() => {
                this.loading = false;
                this.mixpanelService.track('email-optout', {
                    accountId: this.accountId,
                    personId: this.personId,
                    creditId: this.creditId
                });
            });

        this.actions
            .pipe(ofType(emailOptoutActionFailure), takeUntil(this._destroyed$))
            .subscribe(() => {
                this.loading = false;
                this.router.navigate(['']);
            });
    }

    backToApp(): void {
        this.router.navigate(['']);
    }
}
