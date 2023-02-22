import { Component, Event, EventEmitter, h, Host, Method } from '@stencil/core';

@Component({
  tag: 'hellodash-nav-bar',
  styleUrl: 'hellodash-nav-bar.css',
  shadow: true,
})
export class HellodashNavBar {
  //#region Own properties

  menuButton: HTMLDashIconButtonElement;

  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashMenuToggled', composed: true }) menuToggled: EventEmitter;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method

  @Method()
  async setFocus() {
    this.menuButton.setFocus();
  }

  //#endregion

  //#region Local methods
  //#endregion

  render() {
    return (
      <Host>
        <header>
          <dash-icon-button ref={element => (this.menuButton = element)} icon='list' onClick={() => this.menuToggled.emit()} scale='l' rounded />

          <div class='content'>
            <slot />
          </div>

          <slot name='content-end'></slot>
        </header>
      </Host>
    );
  }
}
