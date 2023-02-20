import { Component, h, Host, Prop, Event, EventEmitter, Method } from '@stencil/core';
import { Focusable } from '../../interfaces/focusable';

@Component({
  tag: 'dash-toggle-switch',
  styleUrl: 'dash-toggle-switch.css',
  shadow: true,
})
export class DashToggleSwitch implements Focusable {
  //#region Own properties

  slider: HTMLElement;

  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * When `true`, toggle is checked
   * @optional
   * @default false
   */
  @Prop({ reflect: true, mutable: true }) checked: boolean = false;

  //#endregion

  //#region @Event

  /**
   * Emitted when checked value has changed
   */
  @Event({ eventName: 'dashToggleSwitchCheckChanged', composed: true }) checkChanged: EventEmitter;

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
    this.slider?.focus();
  }

  //#endregion

  //#region Local methods

  /**
   * Toggles the checked state
   */
  toggleChecked() {
    this.checked = !this.checked;
    this.checkChanged.emit(this.checked);
  }

  /**
   * Handles keydown event
   * @param e - keydown event
   */
  keyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === 'Space') {
      this.toggleChecked();
    }
  }

  //#endregion

  render() {
    const checked = this.checked ?? false;

    return (
      <Host aria-checked={checked.toString()} role='switch' onClick={this.toggleChecked.bind(this)} onKeyDown={this.keyDown.bind(this)}>
        <input type='checkbox' checked={checked} />
        <span ref={element => (this.slider = element)} class='slider' tabIndex={0} />
      </Host>
    );
  }
}
