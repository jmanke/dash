import { isNone, spaceConcat, wait } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { Scale } from '../../types';

export type SelectionMode = 'single' | 'multiple' | 'none' | 'no-selection';

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

  /**
   * Whether a list item is currently being dragged
   */
  @State() dragging: boolean;

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
   * Whether the list items can be deselected
   * @default false
   */
  @Prop({ reflect: true }) disableDeselect: boolean;
  @Watch('disableDeselect')
  disableDeselectChanged() {
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

  /**
   * Whether the list item can be dragged
   * @default false
   */
  @Prop() dragEnabled: boolean;
  @Watch('dragEnabled')
  dragEnabledChanged() {
    this.updateChildProps();
  }

  //#endregion

  //#region @Event

  /**
   * Emitted when the list items are reordered
   */
  @Event({ eventName: 'dashListItemsReordered' }) listItemsReordered: EventEmitter<HTMLDashListItemElement[]>;

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

  @Listen('dashInternalListItemStartDrag')
  listItemStartedDrag(e: CustomEvent<PointerEvent>) {
    if (!this.listItems?.length) {
      return;
    }

    this.dragging = true;
    const item = e.target as HTMLDashListItemElement;
    const { left, top, bottom } = item.getBoundingClientRect();
    const offsetX = e.detail.clientX - left;
    const offsetY = e.detail.clientY - top;

    // create a temporary item to fill the space of the dragged item
    const tempItem = document.createElement('div');
    tempItem.classList.add('list-item-placeholder');
    tempItem.style.width = `${item.offsetWidth}px`;
    tempItem.style.height = `${item.offsetHeight}px`;
    item.parentElement.insertBefore(tempItem, item);

    // ensure item size if preserved during drag
    item.style.width = `${item.offsetWidth}px`;
    item.style.height = `${item.offsetHeight}px`;

    // move the item to the end of the body so it is on top of all other items
    document.body.appendChild(item);
    item.style.position = 'fixed';
    item.style.top = `${0}px`;
    item.style.left = `${0}px`;
    item.isDragging = true;

    // To calculate relative positions of the items, we need to know the bounding rect of the first item.
    // This is to reduce the amount of getBoundingClientRect() calls we make during the drag.
    const container = this.element.shadowRoot.querySelector('.container') as HTMLElement;
    const containerBounds = container.getBoundingClientRect();
    const initialBounds = this.listItems[0]?.getBoundingClientRect();

    // get a reference to all other items to move them when dragging
    const itemIndex = this.listItems.indexOf(item);
    const tempListItemData = {
      item: tempItem as HTMLElement,
      top,
      bottom,
      left: left,
      relTop: top - initialBounds.top,
      relBottom: bottom - initialBounds.top,
      index: itemIndex,
    };
    const listItemDatas = this.listItems.map((listItem, i) => {
      if (listItem === item) {
        return tempListItemData;
      }

      const { top, bottom, left } = listItem.getBoundingClientRect();
      return {
        item: listItem,
        top,
        bottom,
        left: left,
        relTop: top - initialBounds.top,
        relBottom: bottom - initialBounds.top,
        index: i,
      };
    });

    let currentItem = tempListItemData;

    let scrollTimeout: number;

    const scrollIntoView = (clientY: number, containerTop: number, containerBottom: number) => {
      clearTimeout(scrollTimeout);
      let scroll = 0;
      let diff = 0;
      if (clientY < containerTop) {
        scroll = -1;
        diff = containerTop - clientY;
      } else if (clientY > containerBottom) {
        scroll = 1;
        diff = clientY - containerBottom;
      }

      if (scroll) {
        diff = Math.min(Math.max(diff / 5, 5), 20);
        const speed = (20 / diff) * 1.5;
        container.scrollTop += scroll;

        scrollTimeout = setTimeout(() => {
          scrollIntoView(clientY, containerTop, containerBottom);
        }, speed);
      }
    };

    const dragMove = (e: PointerEvent | TouchEvent) => {
      if (!this.listItems?.length) {
        return;
      }

      const relativeBounds = this.listItems[0].getBoundingClientRect();
      const { clientX, clientY } = e instanceof PointerEvent ? e : e.touches[0];
      const relClientY = clientY - relativeBounds.top;

      item.style.transform = `translate(${clientX - offsetX}px, ${clientY - offsetY}px)`;

      /// TODO: make a convert function for label sort order

      const outsideBoundary = relClientY < currentItem.relTop || relClientY > currentItem.relBottom;
      if (outsideBoundary) {
        // know the dragged item is above its original position
        if (relClientY < tempListItemData.relTop) {
          let nextItem = currentItem;
          listItemDatas.forEach((itemData, i) => {
            if (itemData.index < itemIndex && relClientY < itemData.relBottom) {
              itemData.item.style.transform = `translate(0, ${item.offsetHeight}px)`;

              // since we're going top to bottom, the first item we need to translate will be the next item
              // when nextItem === currentItem, we know the next item has not been found yet, so we set it
              if (nextItem === currentItem) {
                nextItem = itemData;
              }
            } else {
              itemData.item.style.transform = 'translate(0, 0)';
            }

            if ((relClientY <= itemData.relBottom && relClientY >= itemData.relTop) || (i === 0 && relClientY < itemData.relTop)) {
              tempItem.style.transform = `translate(0, ${top - itemData.top}px)`;
            }
          });

          currentItem = nextItem;
        }
        // know the dragged item is below its original position
        else if (relClientY > tempListItemData.relBottom) {
          listItemDatas.forEach((itemData, i) => {
            if (itemData.index > itemIndex && relClientY > itemData.relTop) {
              itemData.item.style.transform = `translate(0, -${item.offsetHeight}px)`;
              currentItem = itemData;
            } else {
              itemData.item.style.transform = 'translate(0, 0)';
            }

            if ((relClientY <= itemData.relBottom && relClientY >= itemData.relTop) || (i === listItemDatas.length - 1 && relClientY > itemData.relBottom)) {
              tempItem.style.transform = `translate(0, -${top - itemData.top}px)`;
            }
          });
        }
        // know the dragged item is at its original position
        else {
          currentItem = tempListItemData;
          // reset all positions
          listItemDatas.forEach(i => {
            i.item.style.transform = 'translate(0, 0)';
          });
        }
      }

      scrollIntoView(clientY, containerBounds.top, containerBounds.bottom);
    };
    dragMove(e.detail);

    const dragEnd = async () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('pointermove', dragMove);
      window.removeEventListener('touchmove', dragMove);
      window.removeEventListener('pointerup', dragEnd);
      window.removeEventListener('touchend', dragEnd);

      const firstItemBounds = this.listItems[0].getBoundingClientRect();

      // move the item back to its new position with a transition
      const transitionTime = 0.25;
      item.style.transition = `transform ${transitionTime}s cubic-bezier(0.2, 1, 0.1, 1)`;
      item.style.transform = `translate(${currentItem.left}px, ${firstItemBounds.top + currentItem.relTop}px)`;

      // wait for the transition to finish
      await wait(transitionTime * 1000);

      item.isDragging = false;

      // remove any properties used for dragging
      item.style.removeProperty('transition');
      item.style.position = 'relative';
      item.style.removeProperty('transform');
      item.style.removeProperty('width');
      item.style.removeProperty('height');
      item.style.removeProperty('top');
      item.style.removeProperty('left');
      item.style.removeProperty('position');

      if (currentItem.index <= itemIndex) {
        currentItem.item.parentElement.insertBefore(item, currentItem.item);
      } else {
        // get next sibling
        const nextSibling = currentItem.item.nextElementSibling;
        if (nextSibling) {
          currentItem.item.parentElement.insertBefore(item, nextSibling);
        } else {
          currentItem.item.parentElement.appendChild(item);
        }
      }

      // remove the temporary item
      tempItem.remove();

      // remove any properties used for dragging from other items
      listItemDatas.forEach(i => i.item.style.removeProperty('transform'));

      this.dragging = false;

      if (currentItem.index !== itemIndex) {
        this.updateChildProps();
        this.listItemsReordered.emit(this.listItems);
      }
    };

    window.addEventListener('pointermove', dragMove);
    window.addEventListener('touchmove', dragMove);

    window.addEventListener('pointerup', dragEnd);
    window.addEventListener('touchend', dragEnd);
  }

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
    while (isNone(nextSibling.getAttribute) || !isNone(nextSibling.getAttribute('disabled'))) {
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
    while (isNone(prevSibling.getAttribute) || !isNone(prevSibling.getAttribute('disabled'))) {
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
    if (this.dragging) {
      return;
    }

    this.listItems = Array.from(this.element.childNodes).filter(child => child.nodeName === 'DASH-LIST-ITEM') as HTMLDashListItemElement[];
    this.listItems.forEach((element: HTMLDashListItemElement, index: number) => {
      element.selectionMode = this.selectionMode;
      element.disableDeselect = this.disableDeselect;
      element.dragEnabled = this.dragEnabled;
      element.scale = this.scale;

      if (this.selectionMode !== 'no-selection') {
        element.tabIndex = index === 0 ? 0 : -1;
      }
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
        <div class={spaceConcat('container', this.dragging && 'dragging')} style={typeof this.maxHeight === 'number' ? { maxHeight: `${this.maxHeight}px` } : null}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
