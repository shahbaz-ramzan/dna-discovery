import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-sidebar-modal',
  templateUrl: './sidebar-modal.component.html',
  styleUrls: ['./sidebar-modal.component.css']
})
export class SidebarModalComponent implements OnInit {

  @Input() showModal: boolean = false;
  @Input() position: string = "";
  @Output() closeEmitter = new EventEmitter();
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  onCloseSideBar() {
    this.closeEmitter.emit(this.showModal);
  }

}
