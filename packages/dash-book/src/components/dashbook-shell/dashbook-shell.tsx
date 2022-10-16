import { Component, h } from '@stencil/core';

@Component({
  tag: 'dashbook-shell',
  styleUrl: 'dashbook-shell.css',
  shadow: true,
})
export class DashbookShell {
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
      <main>
        <div class='sidebar-wrapper'>
          <slot name="sidebar"></slot>
        </div>
        <slot name="content"></slot>
      </main>
    );
  }
}
