import { Component, h } from '@stencil/core';

@Component({
  tag: 'dash-panel',
  styleUrl: 'dash-panel.css',
  shadow: true,
})
export class DashPanel {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
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
      <article>
        <slot />
      </article>
    );
  }
}
