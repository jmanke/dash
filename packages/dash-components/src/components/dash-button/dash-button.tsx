import { Component, Element, h, Method, Prop } from '@stencil/core';
import { Scale, Status, Appearance } from '../../types/types';
import { Focusable } from '../../interfaces/focusable';

@Component({
  tag: 'dash-button',
  styleUrl: 'dash-button.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DashButton implements Focusable {
  //#region Own properties

  button: HTMLButtonElement;

  //#endregion

  //#region @Element

  @Element() element: HTMLDashButtonElement;

  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Icon displayed at the start of the button
   * @optional
   */
  @Prop({ reflect: true }) startIcon?: string;

  /**
   * Status of the button shown with various styles
   * @optional
   */
  @Prop({ reflect: true }) status?: Status;

  /**
   * When `true`, disables interaction
   * @default false
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Size of button
   * @default 'm'
   */
  @Prop({ reflect: true }) scale: Scale = 'm';

  /**
   * Visible appearance of the button
   * @default 'clear'
   */
  @Prop({ reflect: true }) appearance: Appearance = 'clear';

  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method

  /**
   * Sets focus on this element
   */
  @Method()
  async setFocus() {
    await this.element.componentOnReady();
    this.button.focus();
  }

  //#endregion

  //#region Local methods

  /**
   * Handles event emitted from button
   * @param e - button event
   */
  buttonClicked(e: Event) {
    if (this.disabled) {
      e.stopPropagation();
    }
  }

  //#endregion

  render() {
    const startIcon = this.startIcon ? <dash-icon icon={this.startIcon}></dash-icon> : null;

    return (
      <button ref={element => (this.button = element)} disabled={this.disabled} onClick={this.buttonClicked.bind(this)}>
        {startIcon}
        <slot />
      </button>
    );
  }
}
