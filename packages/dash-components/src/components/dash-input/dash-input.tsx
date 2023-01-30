import { Component, Event, EventEmitter, h, Method, Prop } from '@stencil/core';
import { isEmpty } from 'lodash';
import { Focusable } from '../../interfaces/focusable';
import { debounce, DebouncedFunc } from 'lodash';
import { Scale } from '../../types/types';
import { spaceConcat } from '@didyoumeantoast/dash-utils';

/**
 * Maps scale of icon based on scale of input. For example, a 'm' input will have a 's' icon.
 */
const ICON_SCALE: { s: Scale; m: Scale; l: Scale } = Object.freeze({
  s: 's',
  m: 's',
  l: 'm',
});

@Component({
  tag: 'dash-input',
  styleUrl: 'dash-input.css',
  shadow: true,
})
export class DashInput implements Focusable {
  //#region Own properties

  inputElement: HTMLInputElement;

  /**
   * Debounce function - only required when there's a debounce value
   */
  inputChangeDebounce: DebouncedFunc<() => void>;

  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Placeholder text for input
   * @optional
   */
  @Prop({
    reflect: true,
  })
  placeholder?: string;

  /**
   * Value of input
   * @optional
   */
  @Prop({
    mutable: true,
  })
  value?: string;

  /**
   * Size of the input
   * @default 'm'
   */
  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';

  /**
   * Icon displayed at the end of the input
   * @optional
   */
  @Prop({
    reflect: true,
  })
  icon?: string;

  /**
   * When `true`, a clear button will be displayed at the end of the input
   * @default false
   */
  @Prop({
    reflect: true,
  })
  clearable: boolean;

  /**
   * Debounces input changes in milliseconds
   * Note: debounce is only initialized on component load. Modifying debounce after initialization will not do anything.
   * @optional
   */
  @Prop({
    reflect: true,
  })
  debounce?: number;

  /**
   * Input type
   * @optional
   */
  @Prop({
    reflect: true,
  })
  type: string;

  //#endregion

  //#region @Event

  /**
   * Emitted when input changes
   */
  @Event({
    eventName: 'dashInputInput',
  })
  dashInputInput: EventEmitter<void>;

  /**
   * Emitted only when input is submitted
   */
  @Event({
    eventName: 'dashInputSubmit',
  })
  dashInputSubmit: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    if (this.debounce) {
      this.inputChangeDebounce = debounce(() => this.dashInputInput.emit(), this.debounce);
    }
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method

  /**
   * Sets focus on this element
   */
  @Method()
  async setFocus() {
    this.inputElement.focus();
  }

  /**
   * Selects text in input
   */
  @Method()
  async select() {
    this.inputElement.select();
  }

  //#endregion

  //#region Local methods

  /**
   * Clears the current input value
   */
  clearInput() {
    this.inputChangeDebounce?.cancel();
    this.value = undefined;
    this.dashInputInput.emit();
    this.setFocus();
  }

  /**
   * Reacts to the clear button being clicked
   * @param e - mouse click event
   */
  clearButtonClicked(e: MouseEvent) {
    e.stopPropagation();
    this.clearInput();
  }

  /**
   * Updates the input value
   * @param value - new value
   */
  updateValue(value: string) {
    this.value = value;
    if (this.inputChangeDebounce) {
      this.inputChangeDebounce();
      return;
    }

    this.dashInputInput.emit();
  }

  /**
   * Reacts to keydown events
   * @param e - keyboard event
   */
  keyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.dashInputSubmit.emit();
    }
  }

  //#endregion

  render() {
    return (
      <div class='wrapper' onClick={() => this.setFocus()}>
        <div class='input-wrapper'>
          {this.icon && <dash-icon icon={this.icon} scale={ICON_SCALE[this.scale] ?? 's'}></dash-icon>}
          <input
            type={this.type ?? 'text'}
            ref={e => (this.inputElement = e)}
            value={this.value}
            placeholder={this.placeholder}
            size={1}
            onInput={(e: InputEvent) => this.updateValue((e.target as HTMLInputElement).value)}
            onKeyDown={this.keyDown.bind(this)}
          ></input>
          {this.clearable && (
            <dash-icon-button
              class={spaceConcat('clear-btn', !isEmpty(this.value) && 'visible')}
              icon='x'
              scale={ICON_SCALE[this.scale] ?? 's'}
              onClick={e => this.clearButtonClicked(e)}
              tabindex='-1'
              rounded
            ></dash-icon-button>
          )}
        </div>
        <slot name='content-end'></slot>
      </div>
    );
  }
}
