import { Component, h, Prop, Method } from '@stencil/core';
import { Color, Scale } from '../../types/types';
import { isHex } from '@didyoumeantoast/dash-utils';

@Component({
  tag: 'dash-color-swatch',
  styleUrl: 'dash-color-swatch.css',
  shadow: true,
})
export class DashColorSwatch {
  //#region Own properties
  button: HTMLDashButtonElement;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  color: Color | string;

  @Prop({
    reflect: true,
  })
  scale: Scale;

  @Prop({
    reflect: true,
  })
  selected: boolean;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async setFocus() {
    this.button.focus();
  }
  //#endregion

  //#region Local methods
  //#endregion

  render() {
    const style = { '--dash-color-swatch-background': `${isHex(this.color) ? this.color : `var(--dash-color-${this.color})`}` };

    return (
      <dash-button ref={element => (this.button = element)} scale={this.scale}>
        <div class='color-swatch' style={style}>
          {this.selected && <dash-icon icon='check' scale={this.scale}></dash-icon>}
        </div>
      </dash-button>
    );
  }
}
