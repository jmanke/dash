import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

export type Resize = 'vertical' | 'horizontal' | 'both' | 'none';

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

  /**
   * Text of the text-area
   * @optional
   */
  @Prop({ mutable: true }) value: string;

  /**
   * Determines how the text area can be resized, if at all
   */
  @Prop({ reflect: true }) resize: Resize = 'both';

  /**
   * text-area cols
   * @optional
   */
  @Prop({ reflect: true }) cols: number;

  /**
   * text-area rows
   * @optional
   */
  @Prop({ reflect: true }) rows?: number;

  /**
   * Placeholder text when there is no current value
   * @optional
   */
  @Prop({ reflect: true }) placeholder: string;

  /**
   * When `true`, disables updating the text-area value
   * @default false
   */
  @Prop({ reflect: true }) readonly: boolean;

  /**
   * When `true`, a value is required for forms
   * @default false
   */
  @Prop({ reflect: true }) required: boolean;

  //#endregion

  //#region @Event

  /**
   * Emitted when text area value changes
   */
  @Event({ eventName: 'dashTextareaInput' }) textAreaInput: EventEmitter;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Reacts to the textarea's value changing
   * @param value - new value
   */
  inputChanged(value: string) {
    this.value = value;
    this.textAreaInput.emit();
  }

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
          onInput={e => this.inputChanged((e.target as HTMLTextAreaElement).value)}
        ></textarea>
      </Host>
    );
  }
}
