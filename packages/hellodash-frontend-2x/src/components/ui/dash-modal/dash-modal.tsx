import { Component, Host, h, Prop, Element, State, Method, Event, EventEmitter } from '@stencil/core';
import { Modal } from '../../../interfaces/modal';
import { Scale } from '../../../types/types';
import { wait } from '../../../utils/wait';
import { dashRootService } from '../../dash-root/dash-root-service';

@Component({
  tag: 'dash-modal',
  styleUrl: 'dash-modal.css',
})
export class DashModal implements Modal {
  //#region Own properties
  closeButton: HTMLDashButtonElement;
  closeCb: () => void;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLElement;
  //#endregion

  //#region @State
  @State()
  closing = false;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  heading: string;

  @Prop({
    reflect: true,
  })
  fullscreen: boolean;

  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';

  @Prop({
    reflect: true,
  })
  hideCloseButton: boolean;

  @Prop({
    reflect: true,
  })
  autoFocus: boolean;

  @Prop({
    reflect: true,
  })
  disableFullscreenMobileView: boolean;

  @Prop({
    reflect: true,
  })
  closeOnHistoryChanged: boolean;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashModalBeforeClose',
    bubbles: true,
  })
  dashModalBeforeClose: EventEmitter;

  @Event({
    eventName: 'dashModalClosed',
    bubbles: true,
  })
  dashModalClosed: EventEmitter;
  //#endregion

  //#region Component lifecycle
  componentDidLoad() {
    if (this.autoFocus) {
      setTimeout(() => {
        this.closeButton?.setFocus();
      }, 0);
    }
  }

  connectedCallback() {
    if (this.closeOnHistoryChanged) {
      this.closeCb = () => this.close();
      dashRootService.addHistoryChangedListener(this.closeCb);
    }
  }

  disconnectedCallback() {
    dashRootService.removeHistoryChangedListener(this.closeCb);
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async close() {
    if (this.closing) {
      return;
    }

    this.closing = true;
    const transitionTimeStr = getComputedStyle(this.element).getPropertyValue('--dash-transition-time-default');
    const transitionTime = parseInt(transitionTimeStr);
    this.dashModalBeforeClose.emit();

    await wait(transitionTime + 50);

    this.dashModalClosed.emit();
  }
  //#endregion

  //#region Local methods
  //#endregion

  render() {
    return (
      <Host class={this.closing && 'closing'}>
        <dash-scrim active={!this.closing} onClick={() => this.close()}></dash-scrim>
        <dash-focus-trap class='body'>
          {this.heading && <div class='heading'>{this.heading}</div>}

          <div class='content'>
            <slot></slot>
          </div>

          <div class='footer'>
            <slot name='footer-start'></slot>

            <div class='footer-end'>
              <slot name='footer-end'></slot>

              {!this.hideCloseButton && (
                <dash-button ref={element => (this.closeButton = element)} class='close-button' onClick={() => this.close()}>
                  Close
                </dash-button>
              )}
            </div>
          </div>
        </dash-focus-trap>
      </Host>
    );
  }
}