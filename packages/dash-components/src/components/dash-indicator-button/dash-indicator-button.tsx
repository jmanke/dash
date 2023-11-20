import { spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'dash-indicator-button',
  styleUrl: 'dash-indicator-button.css',
  shadow: true,
})
export class DashIndicatorButton {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Whether the item is currently active
   * @default false
   */
  @Prop({ reflect: true }) active: boolean = false;

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
        <dash-button class='indicator-button' scale='s' appearance='clear'>
          <div class={spaceConcat('indicator', this.active && 'active')}></div>
        </dash-button>
      </Host>
    );
  }
}
