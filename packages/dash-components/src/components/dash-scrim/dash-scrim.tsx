import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dash-scrim',
  styleUrl: 'dash-scrim.css',
  shadow: true,
})
export class DashScrim {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * When `true`, the scrim is visible
   * @default false
   */
  @Prop()
  active: boolean;

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
    return <div class={this.active ? 'active' : ''}></div>;
  }
}
