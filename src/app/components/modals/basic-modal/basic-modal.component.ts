import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.css']
})
export class BasicModalComponent implements OnChanges {

  @Input() showModal: boolean = false;
  @Input() modalContent: string = "";
  @Output() onModalClose = new EventEmitter();

  onCloseClick() {
    this.onModalClose.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.modalContent;
  }



}
