import { Component, h, Host, Prop, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'dash-toggle-switch',
  styleUrl: 'dash-toggle-switch.css',
  shadow: true,
})
export class DashToggleSwitch {
  //#region Own properties
  slider: HTMLElement;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    attribute: 'checked',
    reflect: true,
    mutable: true,
  })
  checked: boolean = false;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashToggleSwitchCheckChanged',
    composed: true,
  })
  dashToggleSwitchCheckChanged: EventEmitter;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async setFocus() {
    this.slider?.focus();
  }
  //#endregion

  //#region Local methods
  toggleChecked() {
    this.checked = !this.checked;
    this.dashToggleSwitchCheckChanged.emit(this.checked);
  }

  keyDownHandler(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === 'Space') {
      this.toggleChecked();
    }
  }
  //#endregion

  render() {
    const checked = this.checked ?? false;

    return (
      <Host aria-checked={checked.toString()} role='switch' onClick={this.toggleChecked.bind(this)} onKeyDown={this.keyDownHandler.bind(this)}>
        <input type='checkbox' checked={checked} />
        <span ref={element => (this.slider = element)} class='slider' tabIndex={0} />
      </Host>
    );
  }
}
