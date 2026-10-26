import { Component, Input, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import { PrimeNGConfig } from 'primeng/api';
import { BasicModalComponent } from '../modals/basic-modal/basic-modal.component';
import { SidebarModalComponent } from '../modals/sidebar-modal/sidebar-modal.component';
import { ModalService } from '../modals/basic-modal/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  visibleSidebar2: boolean = false;
  displayModal: boolean = false;
  displaySideModal: boolean = false;
  sideModalPosition: string = "";

  htmlOneAsString = `
    <div>Welcome Text Header</div>
  `;

  htmlTwoAsString = `
    <div>Welcome Text Content</div>
  `;

  htmlAsString: string = `
    <div><div>${this.htmlOneAsString}</div><div>${this.htmlTwoAsString}</div></div>
  `;
  constructor(private primengConfig: PrimeNGConfig,  private modalService: ModalService,
    private viewContainerRef: ViewContainerRef) {}



  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  onModalClose(event : boolean){
    this.displayModal=event;
  }

   showModal() {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addDynamicComponent(this.htmlAsString);
     this.displayModal = true;
    }

    showSideModal(position: string){
      this.sideModalPosition = position;
      this.displaySideModal = true;
    }

    onSideModalClose(event: boolean){
      this.displaySideModal=event;
    }




}
