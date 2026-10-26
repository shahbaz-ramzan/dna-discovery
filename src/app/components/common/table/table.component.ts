import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent {
    @Input() header: string[] = [];
    @Input() dataKeys: string[] = [];
    @Input() data: {}[] = [];
    @Input() showPagination: boolean = false;
    @Input() rows: number = 10;
    @Input() showIcon: boolean = false;
    @Input() iconCol: string = '';
    @Input() canSelect: boolean = false;
    @Input() iconArrow: boolean = false;
    @Output() usersDataEvent = new EventEmitter();

    selectedItems = [];

    constructor() {}

    getSelectedItems() {
        this.selectedItems = this.selectedItems;
        this.usersDataEvent.emit(this.selectedItems);
    }
}
