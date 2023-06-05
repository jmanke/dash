import { Component, h } from '@stencil/core';
import '../../services/global-service';

@Component({
  tag: 'dash-shell',
  styleUrl: 'dash-shell.css',
  shadow: true,
})
export class DashShell {
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
      <div class='shell'>
        <slot name='header'></slot>

        <div class='body'>
          <slot name='left-panel'></slot>

          <div class='content'>
            <slot name='content'></slot>
          </div>
        </div>
      </div>
    );
  }
}
