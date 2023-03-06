import { replaceAt, wait } from '@didyoumeantoast/dash-utils';

interface ItemData {
  item: HTMLElement;
  left: number;
  top: number;
  relTop: number;
  relBottom: number;
  index: number;
}

export class Sortable {
  /**
   * Items to be sorted
   * @required
   */
  items: HTMLElement[];

  /**
   * Container to scroll when dragging
   * @optional
   */
  scrollContainer: HTMLElement;

  /**
   * Callback to be called when drag ends
   * @optional
   */
  dragEndCb: (orderChanged: boolean) => void;

  private pointerOffset = { x: 0, y: 0 };
  private dragItemIndex: number;
  private dragItem: HTMLElement;
  private tempItem: HTMLElement;
  private itemDatas: ItemData[] = [];
  private currentItemData: ItemData;
  private scrollTimeout: number;

  private performDragCb: (e: PointerEvent | MouseEvent) => void;
  private endDragCb: (e: PointerEvent | MouseEvent) => void;

  constructor(items: HTMLElement[] = [], scrollContainer?: HTMLElement) {
    this.items = items;
    this.scrollContainer = scrollContainer;
  }

  /**
   * Start dragging an item
   * @param e Mouse or Pointer event that triggered the drag
   * @param item Item to be dragged
   * @returns void
   */
  startDrag(e: PointerEvent, item: HTMLElement) {
    if (!this.items?.length) {
      return;
    }

    const itemBounds = item.getBoundingClientRect();
    this.pointerOffset = {
      x: e.clientX - itemBounds.left,
      y: e.clientY - itemBounds.top,
    };

    // create a temporary item to fill the space of the dragged item
    const tempItem = document.createElement('div');
    tempItem.classList.add('list-item-placeholder');
    tempItem.style.width = `${item.offsetWidth}px`;
    tempItem.style.height = `${item.offsetHeight}px`;
    item.parentElement.insertBefore(tempItem, item);
    this.tempItem = tempItem;
    this.dragItem = item;

    // ensure item size is preserved during drag
    item.style.width = `${item.offsetWidth}px`;
    item.style.height = `${item.offsetHeight}px`;

    // move the item to the end of the body so it is on top of all other items
    document.body.appendChild(item);
    item.style.position = 'fixed';
    item.style.top = `${0}px`;
    item.style.left = `${0}px`;

    // To calculate relative positions of the items, we need to know the bounding rect of the first item.
    // This is to reduce the amount of getBoundingClientRect() calls we make during the drag.
    const initialFirstItemBounds = this.items[0].getBoundingClientRect();

    // get a reference to all other items to move them when dragging
    this.dragItemIndex = this.items.indexOf(item);
    this.itemDatas = replaceAt(this.items, listItem => listItem === item, tempItem).map((listItem, i) => {
      const { top, bottom, left } = listItem.getBoundingClientRect();
      return {
        item: listItem,
        top,
        bottom,
        left: left,
        relTop: top - initialFirstItemBounds.top,
        relBottom: bottom - initialFirstItemBounds.top,
        index: i,
      };
    });

    this.currentItemData = this.itemDatas[this.dragItemIndex];

    this.performDragCb = this.performDrag.bind(this);
    this.endDragCb = this.endDrag.bind(this);

    window.addEventListener('pointermove', this.performDragCb);
    window.addEventListener('touchmove', this.performDragCb);

    window.addEventListener('pointerup', this.endDragCb);
    window.addEventListener('touchend', this.endDragCb);

    this.performDrag(e);
  }

  /**
   * Ends the drag
   */
  async endDrag() {
    clearTimeout(this.scrollTimeout);
    window.removeEventListener('pointermove', this.performDragCb);
    window.removeEventListener('touchmove', this.performDragCb);
    window.removeEventListener('pointerup', this.endDragCb);
    window.removeEventListener('touchend', this.endDragCb);

    const firstItemBounds = this.items[0].getBoundingClientRect();

    // move the item back to its new position with a transition
    const transitionTime = 0.25;
    const item = this.dragItem;
    const currentItemData = this.currentItemData;
    item.style.transition = `transform ${transitionTime}s cubic-bezier(0.2, 1, 0.1, 1)`;
    item.style.transform = `translate(${currentItemData.left}px, ${firstItemBounds.top + currentItemData.relTop}px)`;

    // wait for the transition to finish
    await wait(transitionTime * 1000);

    // remove any properties used for dragging
    item.style.removeProperty('transition');
    item.style.position = 'relative';
    item.style.removeProperty('transform');
    item.style.removeProperty('width');
    item.style.removeProperty('height');
    item.style.removeProperty('top');
    item.style.removeProperty('left');
    item.style.removeProperty('position');

    if (currentItemData.index <= this.dragItemIndex) {
      currentItemData.item.parentElement.insertBefore(item, currentItemData.item);
    } else {
      // get next sibling
      const nextSibling = currentItemData.item.nextElementSibling;
      if (nextSibling) {
        currentItemData.item.parentElement.insertBefore(item, nextSibling);
      } else {
        currentItemData.item.parentElement.appendChild(item);
      }
    }

    // remove the temporary item
    this.tempItem.remove();

    // remove any properties used for dragging from other items
    this.itemDatas.forEach(i => i.item.style.removeProperty('transform'));

    // call the drag end callback
    this.dragEndCb?.(this.currentItemData.index !== this.dragItemIndex);

    // reset all properties
    this.pointerOffset = { x: 0, y: 0 };
    this.dragItemIndex = 0;
    this.dragItem = null;
    this.tempItem = null;
    this.itemDatas = [];
    this.currentItemData = null;
    this.scrollTimeout = null;
  }

  /**
   * Perform the drag
   * @param e Mouse or Pointer event that triggered the drag
   * @returns void
   */
  private performDrag(e: PointerEvent | TouchEvent) {
    if (!this.items?.length) {
      return;
    }

    const relativeBounds = this.items[0].getBoundingClientRect();
    const { clientX, clientY } = e instanceof PointerEvent ? e : e.touches[0];
    const relClientY = clientY - relativeBounds.top;

    this.dragItem.style.transform = `translate(${clientX - this.pointerOffset.x}px, ${clientY - this.pointerOffset.y}px)`;

    const outsideBoundary = relClientY < this.currentItemData.relTop || relClientY > this.currentItemData.relBottom;
    if (outsideBoundary) {
      // know the dragged item is above its original position
      if (relClientY < this.itemDatas[this.dragItemIndex].relTop) {
        let nextItemData = this.currentItemData;
        this.itemDatas.forEach((itemData, i) => {
          if (itemData.index < this.dragItemIndex && relClientY < itemData.relBottom) {
            itemData.item.style.transform = `translate(0, ${itemData.item.offsetHeight}px)`;

            // since we're going top to bottom, the first item we need to translate will be the next item
            // when nextItem === currentItem, we know the next item has not been found yet, so we set it
            if (nextItemData === this.currentItemData) {
              nextItemData = itemData;
            }
          } else {
            itemData.item.style.transform = 'translate(0, 0)';
          }

          if ((relClientY <= itemData.relBottom && relClientY >= itemData.relTop) || (i === 0 && relClientY < itemData.relTop)) {
            this.tempItem.style.transform = `translate(0, ${relativeBounds.top - itemData.top}px)`;
          }
        });

        this.currentItemData = nextItemData;
      }
      // know the dragged item is below its original position
      else if (relClientY > this.itemDatas[this.dragItemIndex].relBottom) {
        this.itemDatas.forEach((itemData, i) => {
          if (itemData.index > this.dragItemIndex && relClientY > itemData.relTop) {
            itemData.item.style.transform = `translate(0, -${itemData.item.offsetHeight}px)`;
            this.currentItemData = itemData;
          } else {
            itemData.item.style.transform = 'translate(0, 0)';
          }

          if ((relClientY <= itemData.relBottom && relClientY >= itemData.relTop) || (i === this.itemDatas.length - 1 && relClientY > itemData.relBottom)) {
            this.tempItem.style.transform = `translate(0, -${relativeBounds.top - itemData.top}px)`;
          }
        });
      }
      // know the dragged item is at its original position
      else {
        this.currentItemData = this.itemDatas[this.dragItemIndex];
        // reset all positions
        this.itemDatas.forEach(i => {
          i.item.style.transform = 'translate(0, 0)';
        });
      }
    }

    this.scrollIntoView(clientY);
  }

  /**
   * Scroll the container into view if the pointer is outside the container
   * @param clientY The y position of the pointer
   * @returns void
   */
  private scrollIntoView(clientY: number) {
    if (!this.scrollContainer) {
      return;
    }

    const { top, bottom } = this.scrollContainer.getBoundingClientRect();

    clearTimeout(this.scrollTimeout);
    let scroll = 0;
    let diff = 0;
    if (clientY < top) {
      scroll = -1;
      diff = top - clientY;
    } else if (clientY > bottom) {
      scroll = 1;
      diff = clientY - bottom;
    }

    if (scroll) {
      diff = Math.min(Math.max(diff / 5, 5), 20);
      const speed = (20 / diff) * 1.5;
      this.scrollContainer.scrollTop += scroll;

      this.scrollTimeout = setTimeout(() => {
        this.scrollIntoView(clientY);
      }, speed);
    }
  }
}
