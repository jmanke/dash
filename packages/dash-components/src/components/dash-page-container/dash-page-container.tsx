import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dash-page-container',
  styleUrl: 'dash-page-container.css',
})
export class DashPageContainer {
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
  fullpage?: boolean;
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
      <main class={`page-container ${this.fullpage ? 'full-page' : ''}`}>
        <slot></slot>
      </main>
    );
  }
}
