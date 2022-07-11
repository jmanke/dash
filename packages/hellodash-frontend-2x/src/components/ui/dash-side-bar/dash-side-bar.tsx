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
  @Prop({
    reflect: true,
  })
  collapsed: boolean;
  //#endregion

  //#region @Event
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
  close() {
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
