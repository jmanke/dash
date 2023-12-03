import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'dash-carousel-item',
  styleUrl: 'dash-carousel-item.css',
  shadow: true,
})
export class DashCarouselItem {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Whether the item is currently visible
   */
  @Prop({ reflect: true }) visible: boolean = false;
  @Watch('visible')
  visibleChangedHandler() {
    this.visibleChanged.emit();
  }

  /**
   * The item name.
   */
  @Prop({ reflect: true }) name: string;

  //#endregion

  //#region @Event

  @Event({
    eventName: 'dashCarouselItemVisibleChange',
  })
  visibleChanged: EventEmitter<void>;

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
      <Host class={!this.visible ? 'invisible' : ''}>
        <div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
