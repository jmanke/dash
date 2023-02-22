import { Component, Host, h, Prop } from '@stencil/core';
import { ScaleExtended } from '../../types';

@Component({
  tag: 'dash-fab',
  styleUrl: 'dash-fab.css',
  shadow: true,
})
export class DashFab {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Icon to display
   * @required
   */
  @Prop({ reflect: true }) icon: string;

  /**
   * Size of the fab
   * @default 'm'
   */
  @Prop({ reflect: true }) scale: ScaleExtended = 'm';

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
        <dash-icon-button icon={this.icon} scale={this.scale || 'xl'} rounded></dash-icon-button>
      </Host>
    );
  }
}
