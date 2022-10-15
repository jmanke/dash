import { Component, Event, EventEmitter, h, Method, Prop } from '@stencil/core';
import { isEmpty } from 'lodash';
import { Focusable } from '../../interfaces/focusable';
import { debounce, DebouncedFunc } from 'lodash';
import { Scale } from '../../types/types';
import { spaceConcat } from '@didyoumeantoast/dash-utils';

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

  inputChangeDebounce: DebouncedFunc<(val: string) => void>;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  placeholder: string;

  @Prop({
    reflect: true,
  })
  value: string;

  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';

  @Prop({
    reflect: true,
  })
  icon?: string;

  @Prop({
    reflect: true,
  })
  clearable: boolean;

  // Note: debounce is only initialized on component load. Modifying debounce after initialization will not do anything.
  @Prop({
    reflect: true,
  })
  debounce?: number;

  @Prop({
    reflect: true,
  })
  type: string;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashInputInput',
  })
  dashInputInput: EventEmitter<string>;

  @Event({
    eventName: 'dashInputSubmit',
  })
  dashInputSubmit: EventEmitter;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    if (this.debounce) {
      this.inputChangeDebounce = debounce(val => this.dashInputInput.emit(val), this.debounce);
    }
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async setFocus() {
    this.inputElement.focus();
  }

  @Method()
  async select() {
    this.inputElement.select();
  }

  //#endregion

  //#region Local methods
  clearInput(e: MouseEvent) {
    e.stopPropagation();

    this.inputChangeDebounce?.cancel();
    this.dashInputInput.emit(undefined);
    this.setFocus();
  }

  inputChanged(val: string) {
    if (this.inputChangeDebounce) {
      this.inputChangeDebounce(val);
      return;
    }

    this.dashInputInput.emit(val);
  }

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
            onInput={(e: InputEvent) => this.inputChanged((e.target as HTMLInputElement).value)}
            onKeyDown={this.keyDown.bind(this)}
          ></input>
          {this.clearable && (
            <dash-icon-button
              class={spaceConcat('clear-btn', !isEmpty(this.value) && 'visible')}
              icon='x'
              scale={ICON_SCALE[this.scale] ?? 's'}
              onClick={e => this.clearInput(e)}
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
