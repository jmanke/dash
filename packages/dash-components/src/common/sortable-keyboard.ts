import { Sortable } from './sortable';

interface DragEnd {
  orderChanged: boolean;
  items: HTMLElement[];
}

export class SortableKeyboard extends Sortable {
  dragItem: HTMLElement;
  originalIndex: number;
  currentIndex: number;
  currentItemOrder: number[];

  constructor(items: HTMLElement[] = []) {
    super(items);
  }

  startDrag(item: HTMLElement) {
    this.dragItem = item;
    this.originalIndex = this.items.indexOf(item);
    this.currentIndex = this.originalIndex;
    this.currentItemOrder = this.items.map((_, index) => index);
    this.dragItem.style.zIndex = '1';
    this.dragItem.style.position = 'relative';
  }

  moveItemUp() {
    this.moveDragItem(-1);
  }

  moveItemDown() {
    this.moveDragItem(1);
  }

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
    this.moveOrder(this.currentIndex, currentIndex);
    this.currentIndex = currentIndex;

    this.reorderItems();
  }

  private moveOrder(fromIndex: number, toIndex: number) {
    const index = this.currentItemOrder[fromIndex];
    this.currentItemOrder.splice(fromIndex, 1);
    this.currentItemOrder.splice(toIndex, 0, index);
  }

  private reorderItems() {
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

    this.dragItem.style.transform = `translate(0, ${offsetHeight}px)`;
  }
}
