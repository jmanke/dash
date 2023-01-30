import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dash-drill-menu',
  styleUrl: 'dash-drill-menu.css',
  shadow: true,
})
export class DashDrillMenu {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * When `true`, drill menu is activated
   * @default false
   */
  @Prop({
    reflect: true,
  })
  active: boolean;

  /**
   * Heading for the drill menu
   * @optional
   */
  @Prop({
    reflect: true,
  })
  drillHeading: string;
  //#endregion

  //#region @Event

  /**
   * Emitted when drill menu is closed
   */
  @Event({
    eventName: 'dashDrillMenuClosed',
  })
  dashDrillMenuClosed: EventEmitter;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  //#endregion
  render() {
    return (
      <Host>
        <div class='main-content-wrapper'>
          <slot></slot>
        </div>

        {this.active && (
          <div class='drill-content-wrapper'>
            <div class='header'>
              <dash-icon-button ref={element => element?.setFocus()} class='back-button' icon='arrow-left' onClick={() => this.dashDrillMenuClosed.emit()}></dash-icon-button>
              {this.drillHeading && [<span class='heading'>{this.drillHeading}</span>, <span class='heading-end'></span>]}
            </div>

            <slot name='drill-content'></slot>
          </div>
        )}
      </Host>
    );
  }
}
