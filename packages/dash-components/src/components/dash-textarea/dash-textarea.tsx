import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

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

  @Prop({
    reflect: true,
  })
  value: string;
  //#endregion

  //#region @Event
  @Event({ eventName: 'dashTextareaInput' })
  textAreaInput: EventEmitter<string>;
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
        <textarea
          value={this.value}
          cols={this.cols}
          rows={this.rows}
          placeholder={this.placeholder}
          readOnly={this.readonly}
          required={this.required}
          onInput={e => this.textAreaInput.emit((e.target as HTMLTextAreaElement).value)}
        ></textarea>
      </Host>
    );
  }
}
