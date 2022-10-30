import { Component, h, Prop } from '@stencil/core';

export type LabelLayout = 'default' | 'inline-space-between';

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
    reflect: true,
  })
  for: string;

  @Prop({
    reflect: true,
  })
  layout: LabelLayout = 'default';
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
      <label htmlfor={this.for}>
        <slot></slot>
      </label>
    );
  }
}
