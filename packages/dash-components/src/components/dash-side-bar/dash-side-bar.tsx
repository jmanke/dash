import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'dash-side-bar',
  styleUrl: 'dash-side-bar.css',
  shadow: true,
})
export class DashSideBar {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * When `true`, the sidebar is collapsed
   * @default false
   */
  @Prop({
    reflect: true,
    mutable: true,
  })
  collapsed: boolean;

  //#endregion

  //#region @Event

  /**
   * Emitted when the sidebar is closed
   */
  @Event({
    eventName: 'dashSideBarClose',
  })
  dashSideBarClose: EventEmitter;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Closes the sidebar
   */
  close() {
    this.collapsed = true;
    this.dashSideBarClose.emit();
  }

  //#endregion

  render() {
    return (
      <Host>
        {!this.collapsed && <div class='backdrop' onClick={this.close.bind(this)}></div>}
        <aside>
          <slot></slot>
        </aside>
      </Host>
    );
  }
}
