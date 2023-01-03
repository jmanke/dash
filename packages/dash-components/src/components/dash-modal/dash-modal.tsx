import { Component, Host, h, Prop, Element, State, Method, Event, EventEmitter } from '@stencil/core';
import { Modal } from '../../interfaces/modal';
import { Scale } from '../../types/types';
import { wait } from '@didyoumeantoast/dash-utils';

@Component({
  tag: 'dash-modal',
  styleUrl: 'dash-modal.css',
  shadow: true,
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
    mutable: true,
    reflect: true,
  })
  open: boolean;

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
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async close() {
    this.closing = true;
    this.dashModalBeforeClose.emit();
    const transitionTimeStr = getComputedStyle(this.element).getPropertyValue('--dash-transition-time-default');
    const transitionTime = parseInt(transitionTimeStr) - 50;

    await wait(transitionTime);

    this.open = false;
    this.closing = false;
    this.dashModalClosed.emit();
  }
  //#endregion

  //#region Local methods
  //#endregion

  render() {
    return (
      <Host>
        <div class={`modal ${this.closing ? 'closing' : ''}`}>
          <dash-scrim active={!this.closing} onClick={this.close.bind(this)}></dash-scrim>
          <dash-focus-trap class='body'>
            {this.heading && (
              <div class='heading'>
                <div class='heading-text'>{this.heading}</div>

                {!this.hideCloseButton && <dash-icon-button class='close-button-x' icon='x' scale='l' onClick={this.close.bind(this)}></dash-icon-button>}
              </div>
            )}

            <div class='content'>
              <slot></slot>
            </div>

            <div class='footer'>
              <slot name='footer-start'></slot>

              <div class='footer-end'>
                <slot name='footer-end'></slot>

                {!this.hideCloseButton && (
                  <dash-button ref={element => (this.closeButton = element)} class='close-button' scale='l' onClick={this.close.bind(this)}>
                    Close
                  </dash-button>
                )}
              </div>
            </div>
          </dash-focus-trap>
        </div>
      </Host>
    );
  }
}
