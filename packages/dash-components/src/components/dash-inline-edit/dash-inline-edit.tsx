import { classExists } from '@didyoumeantoast/dash-utils';
import { Component, Host, h, Prop, EventEmitter, Event, State, Watch, Element } from '@stencil/core';
import { DashInputCustomEvent } from '../../components';
import { Scale } from '../../types/types';

type EditMode = 'button' | 'input';

@Component({
  tag: 'dash-inline-edit',
  styleUrl: 'dash-inline-edit.css',
  shadow: true,
})
export class DashInlineEdit {
  //#region Own properties
  inputElement: HTMLDashInputElement;
  buttonElement: HTMLDashButtonElement;
  currentValue: string;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashInlineEditElement;
  //#endregion

  //#region @State
  @State()
  mode: EditMode = 'button';
  @Watch('mode')
  modeChanged(mode: EditMode) {
    if (mode === 'input') {
      this.setFocusOnVisible(this.inputElement);
    } else {
      this.setFocusOnVisible(this.buttonElement);
    }
  }

  //#endregion

  //#region @Prop
  @Prop({
    mutable: true,
  })
  value: string;
  @Watch('value')
  valueChanged() {
    this.currentValue = this.value;
    if (this.inputElement) {
      this.inputElement.value = this.value;
    }
  }

  @Prop({
    reflect: true,
  })
  scale: Scale;

  @Prop({
    reflect: true,
  })
  disabled: boolean;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashInlineEditValueChanged',
  })
  dashInlineEditValueChanged: EventEmitter<void>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.valueChanged();
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  async setFocusOnVisible(element: HTMLDashInputElement | HTMLDashButtonElement) {
    await classExists(element, 'hidden', false);
    element.setFocus();
  }

  inputChanged(e: DashInputCustomEvent<void>) {
    this.currentValue = e.target.value;
  }

  switchToInputMode() {
    this.mode = 'input';
  }

  updateValue() {
    this.value = this.currentValue;
    this.dashInlineEditValueChanged.emit();
    this.mode = 'button';
  }

  submit() {
    this.updateValue();
  }
  //#endregion

  render() {
    return (
      <Host>
        <dash-button
          ref={element => (this.buttonElement = element)}
          class={this.mode !== 'button' ? 'hidden' : ''}
          scale={this.scale}
          disabled={this.disabled}
          onClick={this.switchToInputMode.bind(this)}
        >
          {this.value}
        </dash-button>

        <dash-input
          ref={element => (this.inputElement = element)}
          class={this.mode !== 'input' || this.disabled ? 'hidden' : ''}
          value={this.value}
          scale={this.scale}
          onDashInputInput={this.inputChanged.bind(this)}
          onDashInputSubmit={this.submit.bind(this)}
          onFocusout={this.updateValue.bind(this)}
        ></dash-input>
      </Host>
    );
  }
}
