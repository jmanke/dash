import { Component, h } from '@stencil/core';

@Component({
  tag: 'dashbook-sidebar',
  styleUrl: 'dashbook-sidebar.css',
  shadow: true,
})
export class DashbookSidebar {
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
      <aside>
        <dashbook-resize-container>
          <slot></slot>
        </dashbook-resize-container>
      </aside>
    );
  }
}
