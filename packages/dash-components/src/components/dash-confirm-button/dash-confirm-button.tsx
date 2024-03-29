import { classExists, contains, focus, spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { Scale } from '../../types';

@Component({
  tag: 'dash-confirm-button',
  styleUrl: 'dash-confirm-button.css',
  shadow: true,
})
export class DashConfirmButton {
  //#region Own properties

  confirmWrapper: HTMLElement;
  defaultButton: HTMLDashIconButtonElement;
  cancelButton: HTMLDashIconButtonElement;

  //#endregion

  //#region @Element
  //#endregion

  //#region @State

  /**
   * True when in the confirming state
   */
  @State() isConfirming: boolean;
  @Watch('isConfirming')
  async isConfirmingChanged(isConfirming: boolean) {
    if (isConfirming) {
      await classExists(this.confirmWrapper, 'hidden', false);
      focus(this.cancelButton);
    }
  }

  //#endregion

  //#region @Prop

  /**
   * Icon used in button that triggers confirm state
   * @required
   */
  @Prop({ reflect: true }) icon: string;

  /**
   * Size of the confirm button
   */
  @Prop({ reflect: true }) scale: Scale;

  //#endregion

  //#region @Event

  /**
   * Emitted when user confirms
   */
  @Event({ eventName: 'dashConfirmButtonConfirmed' }) confirmed: EventEmitter;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Handles when focus leaves confirm button wrapper
   * @param e - event
   */
  async confirmFocusedOut(e: FocusEvent) {
    if (contains(this.confirmWrapper, e.relatedTarget as HTMLElement)) {
      return;
    }

    this.isConfirming = false;
    if (!e.relatedTarget) {
      await classExists(this.confirmWrapper, 'hidden');
      focus(this.defaultButton);
    }
  }

  /**
   * Cancel confirmation
   */
  async cancel() {
    this.isConfirming = false;
    await classExists(this.confirmWrapper, 'hidden');
    focus(this.defaultButton);
  }

  /**
   * Trigger confirmation
   */
  async confirm() {
    this.isConfirming = false;
    this.confirmed.emit();
    await classExists(this.confirmWrapper, 'hidden');
    focus(this.defaultButton);
  }

  //#endregion

  render() {
    return (
      <Host>
        <dash-icon-button
          ref={element => (this.defaultButton = element)}
          class={this.isConfirming ? 'hidden' : undefined}
          icon={this.icon}
          scale={this.scale}
          onClick={() => (this.isConfirming = true)}
        ></dash-icon-button>

        <div
          ref={element => (this.confirmWrapper = element)}
          class={spaceConcat(this.isConfirming ? undefined : 'hidden', 'confirm-wrapper')}
          onFocusout={this.confirmFocusedOut.bind(this)}
        >
          <dash-icon-button icon='check2' scale={this.scale} onClick={this.confirm.bind(this)}></dash-icon-button>
          <dash-icon-button ref={element => (this.cancelButton = element)} icon='x' scale={this.scale} onClick={this.cancel.bind(this)}></dash-icon-button>
        </div>
      </Host>
    );
  }
}
