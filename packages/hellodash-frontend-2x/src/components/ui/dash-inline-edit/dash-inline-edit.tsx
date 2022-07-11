import { Component, Host, h, Prop, EventEmitter, Event, State } from '@stencil/core';

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
  //#endregion

  //#region @State
  @State()
  mode: EditMode = 'button';
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  value: string;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashInlineEditValueChanged',
  })
  dashInlineEditValueChanged: EventEmitter<string>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  inputChanged(e: CustomEvent<string>) {
    this.currentValue = e.detail;
  }

  switchToInputMode() {
    this.mode = 'input';
    setTimeout(() => {
      this.inputElement.setFocus();
    }, 0);
  }

  updateValue() {
    this.mode = 'button';
    if (!this.currentValue) {
      return;
    }

    this.dashInlineEditValueChanged.emit(this.currentValue);
    this.currentValue = undefined;
  }

  submit() {
    setTimeout(() => {
      this.buttonElement.setFocus();
    }, 0);
    this.updateValue();
  }
  //#endregion

  render() {
    return (
      <Host>
        <dash-button ref={element => (this.buttonElement = element)} class={this.mode !== 'button' ? 'hidden' : ''} onClick={this.switchToInputMode.bind(this)}>
          {this.value}
        </dash-button>

        <dash-input
          ref={element => (this.inputElement = element)}
          class={this.mode !== 'input' ? 'hidden' : ''}
          value={this.value}
          onDashInputInput={this.inputChanged.bind(this)}
          onDashInputSubmit={this.submit.bind(this)}
          onFocusout={this.updateValue.bind(this)}
        ></dash-input>
      </Host>
    );
  }
}
