import { Component, Element, h, Method, Prop } from '@stencil/core';
import { Status } from '../../types/types';

@Component({
  tag: 'dash-button',
  styleUrl: 'dash-button.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DashButton {
  //#region Own properties
  button: HTMLButtonElement;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashButtonElement;
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  startIcon: string;

  @Prop({
    reflect: true,
  })
  status: Status;

  @Prop({
    reflect: true,
  })
  disabled: boolean;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async setFocus() {
    await this.element.componentOnReady();
    this.button.focus();
  }
  //#endregion

  //#region Local methods
  handleClick(e: Event) {
    if (this.disabled) {
      e.stopPropagation();
    }
  }
  //#endregion

  render() {
    const startIcon = this.startIcon ? <dash-icon icon={this.startIcon} width={20}></dash-icon> : null;

    return (
      <button ref={element => (this.button = element)} disabled={this.disabled} onClick={this.handleClick.bind(this)}>
        {startIcon}
        <slot />
      </button>
    );
  }
}
