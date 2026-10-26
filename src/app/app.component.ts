import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MixpanelService } from './service/mixpanel.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'DNA Behavior';
    constructor(private mixpanelService: MixpanelService) {
        this.mixpanelService.init();
    }
}
