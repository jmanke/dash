import { Component, Host, h, Prop } from '@stencil/core';
import { Scale } from '../../types/types';

@Component({
  tag: 'dash-loader',
  styleUrl: 'dash-loader.css',
  shadow: true,
})
export class DashLoader {
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
  scale: Scale;
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
        <div class='spinner'></div>
      </Host>
    );
  }
}
