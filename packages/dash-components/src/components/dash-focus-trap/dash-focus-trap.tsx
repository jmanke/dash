import { Component, Host, h, Element } from '@stencil/core';
import { focus, SKIP_NODE_CLASS } from '@didyoumeantoast/dash-utils';

@Component({
  tag: 'dash-focus-trap',
  styleUrl: 'dash-focus-trap.css',
  shadow: true,
})
export class DashFocusTrap {
  //#region Own properties

  /**
   * Topmost element that is focusable
   */
  topFence: HTMLElement;

  /**
   * Bottommost element that is focusable
   */
  bottomFence: HTMLElement;

  //#endregion

  //#region @Element

  @Element() element: HTMLElement;

  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
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

  /**
   * Focuses first element
   */
  focusFirst() {
    focus(this.element);
  }

  /**
   * Focuses last element
   */
  focusLast() {
    focus(this.element, true);
  }

  //#endregion

  render() {
    return (
      <Host>
        <div class={SKIP_NODE_CLASS} ref={element => (this.topFence = element)} onFocus={this.focusLast.bind(this)} tabIndex={0}></div>
        <slot></slot>
        <div class={SKIP_NODE_CLASS} ref={element => (this.bottomFence = element)} onFocus={this.focusFirst.bind(this)} tabIndex={0}></div>
      </Host>
    );
  }
}
