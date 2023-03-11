import { wait } from '@didyoumeantoast/dash-utils';
import { DragEnd, Sortable } from './sortable';

export class SortablePointer extends Sortable {
  /**
   * Callback to be called before drag ends. This is called before the transition starts
   * @optional
   */
  onBeforeDragEnd: (orderChanged: boolean) => void;

  /**
   * Callback to be called when drag ends
   * @optional
   */
  onDragEnd: (result: DragEnd) => void;

  /** Offset of pointer when dragging starts */
  private pointerOffset = { x: 0, y: 0 };

  private performDragCb: (e: PointerEvent | MouseEvent) => void;
  private endDragCb: (e: PointerEvent | MouseEvent) => void;

  constructor(items: HTMLElement[] = []) {
    super(items);
  }

  /**
   * Start dragging an item
   * @param e Pointer event that triggered the drag
   * @param item Item to be dragged
   * @returns void
   */
  startDrag(e: PointerEvent, item: HTMLElement) {
    if (!this.items?.length) {
      return;
    }

    this.currentItemOrder = this.items.map((_, index) => index);

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
    tempItem.style.transition = 'unset';

    // ensure item size is preserved during drag
    item.style.width = `${item.offsetWidth}px`;
    item.style.height = `${item.offsetHeight}px`;

    item.parentElement.insertBefore(tempItem, item);
    this.dragItem = item;

    // move the item to the end of the body so it is on top of all other items
    document.body.appendChild(item);
    item.style.position = 'fixed';
    item.style.top = `${0}px`;
    item.style.left = `${0}px`;

    // get a reference to all other items to move them when dragging
    this.originalIndex = this.items.indexOf(item);
    this.currentIndex = this.originalIndex;
    // replace the item with the temporary item for transition purposes
    this.items[this.currentIndex] = tempItem;

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
    window.removeEventListener('pointermove', this.performDragCb);
    window.removeEventListener('touchmove', this.performDragCb);
    window.removeEventListener('pointerup', this.endDragCb);
    window.removeEventListener('touchend', this.endDragCb);

    let { top, left } = this.items[this.originalIndex].getBoundingClientRect();

    // move the item back to its new position with a transition
    const transitionTime = 0.25;
    const item = this.dragItem;
    item.style.transition = `transform ${transitionTime}s cubic-bezier(0.2, 1, 0.1, 1)`;
    item.style.transform = `translate(${left}px, ${top}px)`;

    const orderChanged = this.currentIndex !== this.originalIndex;
    this.onBeforeDragEnd?.(orderChanged);

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

    this.insertElement(this.items, this.dragItem, this.originalIndex, this.currentIndex);

    // remove the temporary item and put the drag item back in its place
    this.items[this.originalIndex].remove();
    this.items[this.originalIndex] = this.dragItem;

    // remove any properties used for dragging from other items and make sure order is reflected
    this.items = this.currentItemOrder.map(index => {
      const item = this.items[index];
      item.style.removeProperty('transform');

      return item;
    });

    // call the drag end callback
    this.onDragEnd?.({ orderChanged, items: this.items });

    // reset all properties
    this.pointerOffset = { x: 0, y: 0 };
    this.currentIndex = -1;
    this.dragItem = null;
    this.currentItemOrder = this.items.map((_, index) => index);
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

    const currentBounds = this.items[this.originalIndex].getBoundingClientRect();
    const { clientX, clientY } = e instanceof PointerEvent ? e : e.touches[0];

    this.dragItem.style.transform = `translate(${clientX - this.pointerOffset.x}px, ${clientY - this.pointerOffset.y}px)`;

    // move the item up or down the list if it is above or below the current item
    if ((clientY < currentBounds.top && this.currentIndex > 0) || (clientY > currentBounds.bottom && this.currentIndex < this.items.length - 1)) {
      const targetIndex = this.currentIndex + (clientY < currentBounds.top ? -1 : 1);
      this.adjustOrder(this.currentIndex, targetIndex);
      this.currentIndex = targetIndex;
      this.reorderItems();
      this.items[this.originalIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
