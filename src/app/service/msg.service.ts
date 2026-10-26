import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppService } from './app.service';

@Injectable({
    providedIn: 'root'
})
export class MsgService {
    constructor(
        private messageService: MessageService,
        private appService: AppService
    ) {}

    successMessage(message: string) {
        return this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message
        });
    }

    speedUpPrompt() {
        this.messageService.add({
            severity: 'warn',
            key: 'speedUp',
            detail: 'Message Content',
            sticky: true
        });
    }

    errorMessage(message: string) {
        return this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message
        });
    }
}
