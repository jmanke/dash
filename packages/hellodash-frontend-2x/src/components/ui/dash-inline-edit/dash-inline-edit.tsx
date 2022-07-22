import { Component, Host, h, Prop, EventEmitter, Event, State, Watch, Element } from '@stencil/core';

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
  setFocusOnVisible(element: HTMLDashInputElement | HTMLDashButtonElement) {
    const isVisible = (target: HTMLElement) => {
      const classNames = target.className?.split(' ') ?? [];
      return !classNames.find(className => className === 'hidden');
    };

    if (isVisible(element)) {
      element.setFocus();
      return;
    }

    const observer = new MutationObserver(mutations => {
      for (let mutationRecord of mutations) {
        if (isVisible(mutationRecord.target as HTMLElement)) {
          element.setFocus();
          return;
        }
      }

      observer.disconnect();
    });

    observer.observe(element, { attributes: true });
  }

  inputChanged(e: CustomEvent<string>) {
    this.currentValue = e.detail;
  }

  switchToInputMode() {
    this.mode = 'input';
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
