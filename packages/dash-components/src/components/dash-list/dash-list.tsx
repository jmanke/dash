import { isNone, spaceConcat, wait } from '@didyoumeantoast/dash-utils';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
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
    this.dragging = true;
    const item = e.target as HTMLDashListItemElement;
    const { left, top, bottom } = item.getBoundingClientRect();
    const offsetX = e.detail.clientX - left;
    const offsetY = e.detail.clientY - top;

    // create a temporary item to fill the space of the dragged item
    const tempItem = document.createElement('div');
    tempItem.classList.add('temp-item');
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

    // get a reference to all other items to move them when dragging
    const itemIndex = this.listItems.indexOf(item);
    const tempListItemData = {
      item: tempItem as HTMLElement,
      top,
      bottom,
      left,
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
        left,
        index: i,
      };
    });

    let currentItem = tempListItemData;

    const pointerMove = (e: PointerEvent) => {
      item.style.transform = `translate(${e.clientX - offsetX}px, ${e.clientY - offsetY}px)`;

      const outsideBoundary = e.clientY < currentItem.top || e.clientY > currentItem.bottom;
      if (outsideBoundary) {
        // know the dragged item is above its original position
        if (e.clientY < top) {
          let nextItem = currentItem;
          listItemDatas.forEach((itemData, i) => {
            if (itemData.index < itemIndex && e.clientY < itemData.bottom) {
              itemData.item.style.transform = `translate(0, ${item.offsetHeight}px)`;

              // since we're going top to bottom, the first item we need to translate will be the next item
              // when nextItem === currentItem, we know th next item has not been found yet, so we set it
              if (nextItem === currentItem) {
                nextItem = itemData;
              }
            } else {
              itemData.item.style.transform = 'translate(0, 0)';
            }

            if ((e.clientY <= itemData.bottom && e.clientY >= itemData.top) || (i === 0 && e.clientY < itemData.top)) {
              tempItem.style.transform = `translate(0, ${top - itemData.top}px)`;
            }
          });

          currentItem = nextItem;
        }
        // know the dragged item is below its original position
        else if (e.clientY > bottom) {
          listItemDatas.forEach((itemData, i) => {
            if (itemData.index > itemIndex && e.clientY > itemData.top) {
              itemData.item.style.transform = `translate(0, -${item.offsetHeight}px)`;
              currentItem = itemData;
            } else {
              itemData.item.style.transform = 'translate(0, 0)';
            }

            if ((e.clientY <= itemData.bottom && e.clientY >= itemData.top) || (i === listItemDatas.length - 1 && e.clientY > itemData.bottom)) {
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
    };
    pointerMove(e.detail);

    window.addEventListener('pointermove', pointerMove);
    window.addEventListener(
      'pointerup',
      async () => {
        window.removeEventListener('pointermove', pointerMove);

        // move the item back to its new position with a transition
        const transitionTime = 0.25;
        item.style.transition = `transform ${transitionTime}s cubic-bezier(0.2, 1, 0.1, 1)`;
        item.style.transform = `translate(${currentItem.left}px, ${currentItem.top}px)`;
        item.isDragging = false;

        // wait for the transition to finish
        await wait(transitionTime * 1000);

        // remove any properties used for dragging
        item.style.removeProperty('transition');
        item.style.position = 'relative';
        item.style.removeProperty('transform');
        item.style.removeProperty('width');
        item.style.removeProperty('height');

        if (currentItem.index <= itemIndex) {
          console.log('insert before', currentItem.index);

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
      },
      { once: true },
    );
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
    this.listItems = Array.from(this.element.childNodes).filter(child => child.nodeName === 'DASH-LIST-ITEM') as HTMLDashListItemElement[];
    this.listItems.forEach((element: HTMLDashListItemElement, index: number) => {
      element.selectionMode = this.selectionMode;
      element.disableDeselect = this.disableDeselect;
      element.dragEnabled = this.dragEnabled;
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
        <div class={spaceConcat('container', this.dragging && 'dragging')} style={typeof this.maxHeight === 'number' ? { maxHeight: `${this.maxHeight}px` } : null}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
