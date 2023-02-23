import { wait } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { Modal } from '../../interfaces/modal';
import { Scale } from '../../types';

@Component({
  tag: 'dash-modal',
  styleUrl: 'dash-modal.css',
  shadow: true,
})
export class DashModal implements Modal {
  //#region Own properties

  closeButton: HTMLDashButtonElement;

  /**
   * Callback when modal is closed
   */
  closeCb: () => void;

  //#endregion

  //#region @Element

  @Element() element: HTMLElement;

  //#endregion

  //#region @State

  /**
   * When `true`, the modal is closing and playing its animation
   */
  @State() closing = false;

  //#endregion

  //#region @Prop

  /**
   * When `true`, the modal is open
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) open: boolean;

  /**
   * Modal heading
   * @optional
   */
  @Prop({ reflect: true }) heading?: string;

  /**
   * When `true`, modal is in fullscreen mode
   * @default false
   */
  @Prop({ reflect: true }) fullscreen: boolean;

  /**
   * Size of the modal
   * @default 'm'
   */
  @Prop({ reflect: true }) scale: Scale = 'm';

  /**
   * When `true`, the close button is not displayed
   * @default false
   */
  @Prop({ reflect: true }) hideCloseButton: boolean;

  /**
   * When `true`, sets focus on the close button if it's available
   * @default false
   */
  @Prop({ reflect: true }) autoFocus: boolean;

  /**
   * When `true`, the modal will not automatically go into fullscreen mode when the screen size is mobile.
   * @default false
   */
  @Prop({ reflect: true }) disableFullscreenMobileView: boolean;

  //#endregion

  //#region @Event

  /**
   * Emitted when the modal is about to close (before the animation starts playing)
   */
  @Event({ eventName: 'dashModalBeforeClose', bubbles: true }) dashModalBeforeClose: EventEmitter;

  /**
   * Emitted after the modal's close animation completes and the modal is actually closed
   */
  @Event({ eventName: 'dashModalClosed', bubbles: true }) dashModalClosed: EventEmitter;

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

  /**
   * Closes the modal
   */
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
