import { Component, Host, h, Prop } from '@stencil/core';

export type Resize = 'vertical' | 'horizontal' | 'both';

@Component({
  tag: 'dash-textarea',
  styleUrl: 'dash-textarea.css',
  shadow: true,
})
export class DashTextarea {
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
  resize: Resize = 'both';

  @Prop({
    reflect: true,
  })
  cols: number;

  @Prop({
    reflect: true,
  })
  rows: number;

  @Prop({
    reflect: true,
  })
  placeholder: string;

  @Prop({
    reflect: true,
  })
  readonly: boolean;

  @Prop({
    reflect: true,
  })
  required: boolean;
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
        <textarea cols={this.cols} rows={this.rows} placeholder={this.placeholder} readOnly={this.readonly} required={this.required}>
          <slot></slot>
        </textarea>
      </Host>
    );
  }
}
