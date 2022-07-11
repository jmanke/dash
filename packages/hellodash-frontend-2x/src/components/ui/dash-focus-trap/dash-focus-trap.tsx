import { Component, Host, h, Element } from '@stencil/core';
import { focus, SKIP_NODE_CLASS } from '../../../utils/focus';

@Component({
  tag: 'dash-focus-trap',
  styleUrl: 'dash-focus-trap.css',
  shadow: true,
})
export class DashFocusTrap {
  //#region Own properties
  topFence: HTMLElement;
  bottomFence: HTMLElement;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLElement;
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
  focusFirst() {
    focus(this.element);
  }

  async focusLast() {
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
