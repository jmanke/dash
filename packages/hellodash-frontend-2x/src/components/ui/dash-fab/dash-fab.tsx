import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dash-fab',
  styleUrl: 'dash-fab.css',
  shadow: true,
})
export class DashFab {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  icon: string;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  //#endregion

  render() {
    return (
      <Host>
        <dash-icon-button icon={this.icon} scale='xl'></dash-icon-button>
        <slot></slot>
      </Host>
    );
  }
}
