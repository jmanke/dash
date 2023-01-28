import { Component, Host, h, Prop, Element, Watch, State } from '@stencil/core';
import { isDefined } from '@didyoumeantoast/dash-utils';
import { Scale } from '../../types/types';

export type SelectionMode = 'single' | 'multiple' | 'none';

@Component({
  tag: 'dash-list',
  styleUrl: 'dash-list.css',
  shadow: true,
})
export class DashList {
  //#region Own properties
  listItems: HTMLDashListItemElement[] = [];
  resizeObserver: ResizeObserver;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLElement;
  //#endregion

  //#region @State
  @State()
  maxHeight?: number;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  selectionMode: SelectionMode = 'single';
  @Watch('selectionMode')
  selectionModeChanged() {
    this.updateChildProps();
  }

  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';
  @Watch('scale')
  scaleChanged() {
    this.updateChildProps();
  }

  @Prop({
    reflect: true,
  })
  maxItems?: number;
  @Watch('maxItems')
  maxItemsChanged() {
    this.updateResizeObserver();
  }
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  async componentWillLoad() {
    const mutationObserver = new MutationObserver(() => {
      this.updateChildProps();
    });

    mutationObserver.observe(this.element, { childList: true });
    this.updateChildProps();
    this.updateResizeObserver();
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  updateResizeObserver() {
    if (!this.maxItems || this.maxItems < 1) {
      this.resizeObserver?.disconnect();
      this.resizeObserver = null;
      this.maxHeight = null;
      return;
    }

    if (this.resizeObserver) {
      this.updateMaxHeight();
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.updateMaxHeight();
    });
    this.resizeObserver.observe(this.element);
  }

  nextSibling(e: HTMLDashListItemElement) {
    return (e.nextSibling as HTMLDashListItemElement) ?? this.listItems[0];
  }

  prevSibling(e: HTMLDashListItemElement) {
    return (e.previousSibling as HTMLDashListItemElement) ?? this.listItems[this.listItems.length - 1];
  }

  focusNextListItem(e: HTMLDashListItemElement) {
    e.tabIndex = -1;
    let nextSibling = this.nextSibling(e);
    while (!isDefined(nextSibling.getAttribute) || isDefined(nextSibling.getAttribute('disabled'))) {
      nextSibling = this.nextSibling(nextSibling);

      if (nextSibling === e) {
        break;
      }
    }

    nextSibling.focus();
    nextSibling.tabIndex = 0;
  }

  focusPreviousListItem(e: HTMLDashListItemElement) {
    e.tabIndex = -1;
    let prevSibling = this.prevSibling(e);
    while (!isDefined(prevSibling.getAttribute) || isDefined(prevSibling.getAttribute('disabled'))) {
      prevSibling = this.prevSibling(prevSibling);

      if (prevSibling === e) {
        break;
      }
    }

    prevSibling.focus();
    prevSibling.tabIndex = 0;
  }

  updateChildProps() {
    this.listItems = Array.from(this.element.childNodes).filter(child => child.nodeName === 'DASH-LIST-ITEM') as HTMLDashListItemElement[];
    this.listItems.forEach((element: HTMLDashListItemElement, index: number) => {
      element.selectionMode = this.selectionMode;
      element.scale = this.scale;
      element.tabIndex = index === 0 ? 0 : -1;
    });
  }

  updateMaxHeight() {
    let height = 0;
    const itemsLength = Math.min(this.maxItems ?? 0, this.listItems?.length ?? 0);
    for (let i = 0; i < itemsLength; i++) {
      height += this.listItems[i].offsetHeight;
    }

    if (this.maxHeight === this.maxHeight) {
      return;
    }

    this.maxHeight = height;
  }
  //#endregion

  render() {
    return (
      <Host role='list' onDashInternalListItemMoveNext={e => this.focusNextListItem(e.target)} onDashInternalListItemMovePrevious={e => this.focusPreviousListItem(e.target)}>
        <div class='container' style={typeof this.maxHeight === 'number' ? { maxHeight: `${this.maxHeight}px` } : null}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
