import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MixpanelService } from 'src/app/service/mixpanel.service';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
    constructor(
        private router: Router,
        private mixpanelService: MixpanelService
    ) {}

    ngOnInit(): void {
        this.mixpanelService.track('404 Page Viewed');
    }

    investorClick() {
        this.mixpanelService.track('Clicked Investor Button');
        this.router.navigate(['/investor']);
    }

    talentClick() {
        this.mixpanelService.track('Clicked Talent Button');
        this.router.navigate(['/talent']);
    }
}
