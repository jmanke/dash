import { Component, Element, h, Method, Prop } from '@stencil/core';
import { Focusable } from '../../interfaces/focusable';
import { Appearance, Scale, Status } from '../../types';

@Component({
  tag: 'dash-button',
  styleUrl: 'dash-button.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DashButton implements Focusable {
  //#region Own properties

  button: HTMLButtonElement | HTMLAnchorElement;

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
   * Icon displayed at the end of the button
   * @optional
   */
  @Prop({ reflect: true }) endIcon?: string;

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

  /**
   * When provided, button will behave as a link
   */
  @Prop({ reflect: true }) href?: string;

  /**
   * Target location of the link. Only functional if `href` is provided
   */
  @Prop({ reflect: true }) target?: string;

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
    const startIcon = this.startIcon ? <dash-icon class='start-icon' icon={this.startIcon}></dash-icon> : null;
    const endIcon = this.endIcon ? <dash-icon class='end-icon' icon={this.endIcon}></dash-icon> : null;

    return this.href ? (
      <a
        class='button'
        ref={element => (this.button = element)}
        href={this.href}
        target={this.target}
        onClick={this.buttonClicked.bind(this)}
      >
        {startIcon}
        <slot />
        {endIcon}
      </a>
    ) : (
      <button
        class='button'
        ref={element => (this.button = element)}
        disabled={this.disabled}
        onClick={this.buttonClicked.bind(this)}
      >
        {startIcon}
        <slot />
        {endIcon}
      </button>
    );
  }
}
