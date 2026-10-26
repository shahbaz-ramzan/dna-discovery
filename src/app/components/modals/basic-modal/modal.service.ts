import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { BasicModalComponent as ModalComponent } from './basic-modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private rootViewContainer: any;

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
  }
  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }
  addDynamicComponent(content: string) {

    const factory =
      this.factoryResolver.resolveComponentFactory(ModalComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    component.instance.modalContent = content;

    this.rootViewContainer.insert(component.hostView);
  }


}
