import { Component, Event, EventEmitter, h, Method, Prop } from '@stencil/core';
import { Modal } from '../../../interfaces/modal';
import { Status } from '../../../types/types';

@Component({
  tag: 'dash-confirm',
  styleUrl: 'dash-confirm.css',
  shadow: true,
})
export class DashConfirm implements Modal {
  //#region Own properties
  modal: HTMLDashModalElement;
  cancelButton: HTMLDashButtonElement;
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
      <dash-modal
        ref={element => (this.modal = element)}
        heading={this.heading ? this.heading : 'Are you sure?'}
        scale='s'
        hideCloseButton
        disableFullscreenMobileView
        closeOnHistoryChanged
      >
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