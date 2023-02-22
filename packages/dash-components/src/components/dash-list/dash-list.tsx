import { Component, Host, h, Prop, Element, Watch, State } from '@stencil/core';
import { isDefined } from '@didyoumeantoast/dash-utils';
import { Scale } from '../../types';

export type SelectionMode = 'single' | 'multiple' | 'none';

@Component({
  tag: 'dash-list',
  styleUrl: 'dash-list.css',
  shadow: true,
})
export class DashList {
  //#region Own properties

  /**
   * dash-list-items that are children of this component
   */
  listItems: HTMLDashListItemElement[] = [];

  resizeObserver: ResizeObserver;

  //#endregion

  //#region @Element

  @Element() element: HTMLElement;

  //#endregion

  //#region @State

  /**
   * Maximum height of the list
   */
  @State() maxHeight?: number;

  //#endregion

  //#region @Prop

  /**
   * Selection mode of the list and its items
   * @default 'single'
   */
  @Prop({ reflect: true }) selectionMode: SelectionMode = 'single';
  @Watch('selectionMode')
  selectionModeChanged() {
    this.updateChildProps();
  }

  /**
   * Size of the list and its items
   * @default 'm'
   */
  @Prop({ reflect: true }) scale: Scale = 'm';
  @Watch('scale')
  scaleChanged() {
    this.updateChildProps();
  }

  /**
   * Number of items to show in the list - a scrollbar appears for overflow
   * @optional
   */
  @Prop({ reflect: true }) maxItems?: number;
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
      this.updateMaxHeight();
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

  /**
   * Updates the resize observer
   */
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

  /**
   * Returns the next sibling in the list
   * @param element - reference element
   * @returns next sibling element
   */
  nextSibling(element: HTMLDashListItemElement) {
    return (element.nextSibling as HTMLDashListItemElement) ?? this.listItems[0];
  }

  /**
   * Returns the previous sibling in the list
   * @param element - reference element
   * @returns previous sibling element
   */
  prevSibling(element: HTMLDashListItemElement) {
    return (element.previousSibling as HTMLDashListItemElement) ?? this.listItems[this.listItems.length - 1];
  }

  /**
   * Sets focus on the next sibling list item
   * @param element - reference element
   */
  focusNextListItem(element: HTMLDashListItemElement) {
    element.tabIndex = -1;
    let nextSibling = this.nextSibling(element);
    while (!isDefined(nextSibling.getAttribute) || isDefined(nextSibling.getAttribute('disabled'))) {
      nextSibling = this.nextSibling(nextSibling);

      if (nextSibling === element) {
        break;
      }
    }

    nextSibling.focus();
    nextSibling.tabIndex = 0;
  }

  /**
   * Sets focus on the previous sibling list item
   * @param element - reference element
   */
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

  /**
   * Updates properties that need to be set on child dash-list-items
   */
  updateChildProps() {
    this.listItems = Array.from(this.element.childNodes).filter(child => child.nodeName === 'DASH-LIST-ITEM') as HTMLDashListItemElement[];
    this.listItems.forEach((element: HTMLDashListItemElement, index: number) => {
      element.selectionMode = this.selectionMode;
      element.scale = this.scale;
      element.tabIndex = index === 0 ? 0 : -1;
    });
  }

  /**
   * Updates maxHeight based on the maxItems property
   */
  updateMaxHeight() {
    if (!this.maxItems || this.maxItems < 1) {
      return;
    }

    let height = 0;
    const itemsLength = Math.min(this.maxItems ?? 0, this.listItems?.length ?? 0);
    for (let i = 0; i < itemsLength; i++) {
      height += this.listItems[i].offsetHeight;
    }

    if (this.maxHeight === height) {
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
