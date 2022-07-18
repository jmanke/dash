import { Component, h, Prop, Method } from '@stencil/core';
import { Color, Scale } from '../../../types/types';
import { isHex } from '../../../utils/is-hex';

@Component({
  tag: 'dash-color-swatch',
  styleUrl: 'dash-color-swatch.css',
  shadow: true,
})
export class DashColorSwatch {
  //#region Own properties
  button: HTMLButtonElement;
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

    return <button class='color-swatch' role='button' style={style} ref={element => (this.button = element)}></button>;
  }
}