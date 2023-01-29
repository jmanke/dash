import { Component, h, Prop, Method } from '@stencil/core';
import { Color, Scale } from '../../types/types';
import { isHex } from '@didyoumeantoast/dash-utils';
import { Focusable } from '../../interfaces/focusable';

@Component({
  tag: 'dash-color-swatch',
  styleUrl: 'dash-color-swatch.css',
  shadow: true,
})
export class DashColorSwatch implements Focusable {
  //#region Own properties

  button: HTMLDashIconButtonElement;

  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Color of the swatch
   * @required
   */
  @Prop({
    reflect: true,
  })
  color: Color | string;

  /**
   * Size of swatch
   * @default 'm'
   */
  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';

  /**
   * When true, the swatch is selected and provides visual feedback
   * @default false
   */
  @Prop({
    reflect: true,
  })
  selected: boolean = false;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method

  /**
   * Sets focus on this element
   */
  @Method()
  async setFocus() {
    this.button.setFocus();
  }

  //#endregion

  //#region Local methods
  //#endregion

  render() {
    const style = { '--dash-color-swatch-background': `${isHex(this.color) ? this.color : `var(--dash-color-${this.color})`}` };

    return (
      <dash-icon-button ref={element => (this.button = element)} scale={this.scale}>
        <div class='color-swatch' style={style}>
          {this.selected && <dash-icon icon='check' scale={this.scale}></dash-icon>}
        </div>
      </dash-icon-button>
    );
  }
}
