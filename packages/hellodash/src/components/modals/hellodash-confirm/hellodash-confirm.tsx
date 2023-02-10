import { Component, Event, EventEmitter, h, Method, Prop } from '@stencil/core';
import { Modal } from '@didyoumeantoast/dash-components/dist/types/interfaces/modal';
import { Status } from '@didyoumeantoast/dash-components/dist/types/types/types';
import { dashRootService } from '../../dash-root/dash-root-service';

@Component({
  tag: 'hellodash-confirm',
  styleUrl: 'hellodash-confirm.css',
  shadow: true,
})
export class HellodashConfirm implements Modal {
  //#region Own properties
  modal: HTMLDashModalElement;
  cancelButton: HTMLDashButtonElement;
  closeModalCb: () => void;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  heading: string;

  @Prop({
    reflect: true,
  })
  confirmText: string;

  @Prop({
    reflect: true,
  })
  cancelText: string;

  @Prop({
    reflect: true,
  })
  confirmButtonStatus: Status = 'error';
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashModalBeforeClose',
  })
  dashModalBeforeClose: EventEmitter;

  @Event({
    eventName: 'dashModalClosed',
  })
  dashModalClosed: EventEmitter;

  @Event({
    eventName: 'dashConfirmConfirmed',
  })
  dashConfirmConfirmed: EventEmitter;
  //#endregion

  //#region Component lifecycle
  componentDidLoad() {
    this.cancelButton.setFocus();
  }

  connectedCallback() {
    this.closeModalCb = () => this.modal.close();
    dashRootService.addHistoryChangedListener(this.closeModalCb);
  }

  disconnectedCallback() {
    dashRootService.removeHistoryChangedListener(this.closeModalCb);
    this.closeModalCb = null;
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async close() {
    return this.modal.close();
  }
  //#endregion

  //#region Local methods
  confirm() {
    this.dashConfirmConfirmed.emit();
    this.close();
  }
  //#endregion

  render() {
    return (
      <dash-modal ref={element => (this.modal = element)} heading={this.heading ? this.heading : 'Are you sure?'} scale='s' hideCloseButton disableFullscreenMobileView open>
        <slot></slot>

        <div slot='footer-end'>
          <dash-button class='confirm-button' onClick={this.confirm.bind(this)} status={this.confirmButtonStatus}>
            {this.confirmText ? this.confirmText : 'Confirm'}
          </dash-button>
          <dash-button ref={element => (this.cancelButton = element)} onClick={this.close.bind(this)}>
            {this.cancelText ? this.cancelText : 'Cancel'}
          </dash-button>
        </div>
      </dash-modal>
    );
  }
}
