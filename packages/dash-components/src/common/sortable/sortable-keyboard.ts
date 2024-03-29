import { DragEnd, Sortable } from './sortable';

export class SortableKeyboard extends Sortable {
  constructor(items: HTMLElement[] = []) {
    super(items);
  }

  /**
   * Start dragging an item
   * @param item Item to be dragged
   */
  startDrag(item: HTMLElement) {
    this.dragItem = item;
    this.originalIndex = this.items.indexOf(item);
    this.currentIndex = this.originalIndex;
    this.currentItemOrder = this.items.map((_, index) => index);
  }

  /**
   * Move item up in the list
   */
  moveItemUp() {
    this.moveDragItem(-1);
  }

  /**
   * Move item down in the list
   */
  moveItemDown() {
    this.moveDragItem(1);
  }

  /**
   * End dragging an item
   * @returns DragEnd
   */
  endDrag() {
    this.insertElement(this.items, this.dragItem, this.originalIndex, this.currentIndex);
    this.items = this.currentItemOrder.map(index => {
      const item = this.items[index];
      item.style.removeProperty('transform');

      return item;
    });

    const ret: DragEnd = {
      orderChanged: this.currentIndex !== this.originalIndex,
      items: this.items,
    };

    this.dragItem.style.removeProperty('z-index');
    this.dragItem.style.removeProperty('position');

    this.dragItem = null;
    this.currentIndex = -1;
    this.currentItemOrder = this.items.map((_, index) => index);

    return ret;
  }

  /**
   * Move drag item
   * @param increment increment to move item by
   */
  private moveDragItem(increment: number) {
    if (!this.dragItem) {
      return;
    }

    let currentIndex = this.currentIndex + increment;
    if (currentIndex >= this.items.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = this.items.length - 1;
    }

    // scroll to target item
    const targetIndex = this.currentItemOrder[currentIndex];
    this.items[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    this.adjustOrder(this.currentIndex, currentIndex);
    this.currentIndex = currentIndex;

    this.reorderItems();
  }
}
