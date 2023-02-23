import { classExists } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { DashInputCustomEvent } from '../../components';
import { Scale } from '../../types';

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

  /**
   * Stores the current value so we can update the value property when needed
   */
  currentValue: string;

  //#endregion

  //#region @Element

  @Element() element: HTMLDashInlineEditElement;

  //#endregion

  //#region @State

  /**
   * Current mode/state
   */
  @State() mode: EditMode = 'button';
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

  /**
   * Value to be used for editing
   * @required
   */
  @Prop({ mutable: true }) value: string;
  @Watch('value')
  valueChanged() {
    this.currentValue = this.value;
    if (this.inputElement) {
      this.inputElement.value = this.value;
    }
  }

  /**
   * Size of the inline edit
   * @default 'm'
   */
  @Prop({ reflect: true }) scale: Scale = 'm';

  /**
   * When `true`, disabled interaction
   * @default false
   */
  @Prop({ reflect: true }) disabled: boolean;

  //#endregion

  //#region @Event

  /**
   * Emitted when the value has been changed and confirmed
   */
  @Event({ eventName: 'dashInlineEditValueChanged' }) dashInlineEditValueChanged: EventEmitter<void>;

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

  /**
   * Sets focus on element when it is no longer hidden
   * @param element - element to focus
   */
  async setFocusOnVisible(element: HTMLDashInputElement | HTMLDashButtonElement) {
    await classExists(element, 'hidden', false);
    element.setFocus();
  }

  /**
   * Reacts to the input updating
   * @param e - input event
   */
  inputChanged(e: DashInputCustomEvent<void>) {
    this.currentValue = e.target.value;
  }

  /**
   * Switches to mode = 'input'
   */
  switchToInputMode() {
    this.mode = 'input';
  }

  /**
   * Update the value property
   */
  updateValue() {
    this.value = this.currentValue;
    this.dashInlineEditValueChanged.emit();
    this.mode = 'button';
  }

  /**
   * User submit to update value
   */
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
