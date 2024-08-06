import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { modalConfig } from '@models/modal-config';

import { Observable, Subscription } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ModalService {
  private overlayRef: OverlayRef | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(private overlay: Overlay) {}

  openPortal(config: modalConfig) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
    });

    const portal = new ComponentPortal(config.component);
    const componentRef = this.overlayRef.attach(portal) as ComponentRef<any>;

    if (config.inputs) {
      Object.keys(config.inputs).forEach((key: string) => {
        if (key in componentRef.instance) {
          componentRef.instance[key] = config.inputs[key];
        }
      });
    }
    if (config.outputs) {
      Object.keys(config.outputs).forEach((key: string) => {
        if (key in componentRef.instance) {
          const output = componentRef.instance[key] as Observable<any>;

          const subscription = output?.subscribe((res) => {
            config.outputs[key](res);
          });

          this.subscriptions.add(subscription);
        }
      });
    }

    const backDropSubscription = this.overlayRef
      .backdropClick()
      .subscribe((res) => {
        const output = config.outputs['closeCompModal'] as Function;
        output();

        console.log('back drop clicked');
        this.closePortal();
      });
    this.subscriptions.add(backDropSubscription);
  }

  closePortal() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
  }
}
