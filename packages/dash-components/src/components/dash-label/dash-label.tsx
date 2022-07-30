import { Component, h, Prop } from '@stencil/core';

export type Layout = 'inline';

@Component({
  tag: 'dash-label',
  styleUrl: 'dash-label.css',
  shadow: true,
})
export class DashLabel {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    attribute: 'layout',
    reflect: true,
  })
  layout: string;
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
      <label>
        <div class='content-wrapper'>
          <slot />
        </div>
      </label>
    );
  }
}
