export interface DragEnd {
  orderChanged: boolean;
  items: HTMLElement[];
}

export abstract class Sortable {
  /**
   * Items to be sorted
   * @required
   */
  items: HTMLElement[];

  /** Item to be dragged */
  protected dragItem: HTMLElement;

  /** Index of drag item when dragging starts */
  protected originalIndex: number;

  /** Current index of drag item. Represents current position in items. */
  protected currentIndex: number;

  /** Keeps track of current visual order of the items */
  protected currentItemOrder: number[];

  // keyboard drag properties

  constructor(items: HTMLElement[] = []) {
    this.items = items;
  }

  /**
   * Adjust the currentItem order
   * @param fromIndex index of item to be moved
   * @param toIndex index of item to be moved to
   */
  protected adjustOrder(fromIndex: number, toIndex: number) {
    const index = this.currentItemOrder[fromIndex];
    this.currentItemOrder.splice(fromIndex, 1);
    this.currentItemOrder.splice(toIndex, 0, index);
  }

  /**
   * Insert element into DOM
   * @param items items in sortable
   * @param item item to be inserted
   * @param originalIndex original index of item
   * @param currentIndex current index of item
   */
  protected insertElement(items: HTMLElement[], item: HTMLElement, originalIndex: number, currentIndex: number) {
    if (currentIndex <= originalIndex) {
      items[currentIndex].parentElement.insertBefore(item, items[currentIndex]);
    } else {
      // get next sibling
      const nextSibling = items[currentIndex].nextElementSibling;
      if (nextSibling) {
        items[currentIndex].parentElement.insertBefore(item, nextSibling);
      } else {
        items[currentIndex].parentElement.appendChild(item);
      }
    }
  }

  /**
   * Reorder items by adjusting their transform property, visual only
   */
  protected reorderItems() {
    // case 1: item is at original position
    if (this.currentIndex === this.originalIndex) {
      this.items.forEach(item => (item.style.transform = 'translate(0, 0)'));
      return;
    }

    let offsetHeight = 0;

    // case 2: item is above original position
    if (this.currentIndex < this.originalIndex) {
      for (let i = this.originalIndex - 1; i >= 0; i--) {
        const item = this.items[i];

        if (i >= this.currentIndex) {
          // push item down
          item.style.transform = `translate(0, ${item.offsetHeight}px)`;
          offsetHeight -= item.offsetHeight;
          continue;
        }

        item.style.transform = 'translate(0, 0)';
      }

      // reset other item positions
      for (let i = this.originalIndex + 1; i < this.items.length; i++) {
        const item = this.items[i];
        item.style.transform = 'translate(0, 0)';
      }
    }
    // case 3: item is below original position
    else {
      for (let i = this.originalIndex + 1; i < this.items.length; i++) {
        const item = this.items[i];

        if (i <= this.currentIndex) {
          // push item up
          item.style.transform = `translate(0, -${item.offsetHeight}px)`;
          offsetHeight += item.offsetHeight;
          continue;
        }

        item.style.transform = 'translate(0, 0)';
      }

      // reset other item positions
      for (let i = this.originalIndex - 1; i >= 0; i--) {
        const item = this.items[i];
        item.style.transform = 'translate(0, 0)';
      }
    }

    this.items[this.originalIndex].style.transform = `translate(0, ${offsetHeight}px)`;
  }
}
