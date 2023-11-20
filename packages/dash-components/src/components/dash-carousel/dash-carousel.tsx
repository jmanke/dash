import { spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, Host, Listen, Prop, State, h } from '@stencil/core';
import { DashCarouselItemCustomEvent } from '../../components';

@Component({
  tag: 'dash-carousel',
  styleUrl: 'dash-carousel.css',
  shadow: true,
})
export class CarouselGallery {
  //#region Own properties

  get currentItemIndex() {
    return this.items.findIndex(item => item === this.currentItem);
  }

  //#endregion

  //#region @Element

  @Element() element: HTMLDashCarouselElement;

  //#endregion

  //#region @State

  @State() items: HTMLDashCarouselItemElement[] = [];

  //#endregion

  //#region @Prop

  /**
   * The carousel current item.
   */
  @Prop({ mutable: true }) currentItem: HTMLDashCarouselItemElement;

  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashCarouselItemChange',
  })
  itemChanged: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle
  componentDidLoad() {
    this.updateItems();

    const observer = new MutationObserver(this.updateItems.bind(this));
    observer.observe(this.element, { childList: true });
  }

  //#endregion

  //#region Listeners

  @Listen('dashCarouselItemVisibleChange')
  itemVisibleChanged(e: DashCarouselItemCustomEvent<void>) {
    if (!e.target.visible) {
      return;
    }

    this.updateCurrentItem();
  }

  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  updateItems() {
    this.items = Array.from(this.element.querySelectorAll('dash-carousel-item'));
    this.updateCurrentItem();
  }

  updateCurrentItem() {
    const visibleItem = this.items.find(item => item.visible);
    if (!visibleItem && this.items.length > 0) {
      // change the first item to visible, will be captured in event listener
      this.items[0].visible = true;
      return;
    }

    if (visibleItem === this.currentItem) {
      return;
    }

    this.currentItem = visibleItem;
    this.itemChanged.emit();
  }

  next() {
    const index = this.currentItemIndex + 1;
    if (index >= this.items.length) {
      return;
    }

    this.moveTo(index);
  }

  previous() {
    const index = this.currentItemIndex - 1;
    if (index < 0) {
      return;
    }

    this.moveTo(index);
  }

  moveTo(index: number) {
    if (index < 0 || index >= this.items.length) {
      return;
    }

    this.items.forEach((item, i) => (item.visible = index === i));
    this.updateCurrentItem();
  }

  //#endregion

  render() {
    return (
      <Host>
        <div class='items-container'>
          <slot></slot>
        </div>

        <div class='nav-footer'>
          <dash-icon-button
            class='move-left'
            icon='chevron-left'
            disabled={this.currentItem === this.items[0]}
            onClick={this.previous.bind(this)}
          ></dash-icon-button>

          {this.items.map((_, index) => (
            <dash-button class='indicator-button' scale='s' appearance='clear' onClick={this.moveTo.bind(this, index)}>
              <div class={spaceConcat('indicator', this.currentItem === this.items[index] && 'active')}></div>
            </dash-button>
          ))}

          <dash-icon-button
            class='move-right'
            icon='chevron-right'
            disabled={this.currentItem === this.items[this.items.length - 1]}
            onClick={this.next.bind(this)}
          ></dash-icon-button>
        </div>
      </Host>
    );
  }
}
