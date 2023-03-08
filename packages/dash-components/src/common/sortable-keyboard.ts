import { Sortable } from './sortable';

interface DragEnd {
  orderChanged: boolean;
  items: HTMLElement[];
}

export class SortableKeyboard extends Sortable {
  dragItem: HTMLElement;
  originalIndex: number;
  currentIndex: number;

  constructor(items: HTMLElement[] = []) {
    super(items);
  }

  startDrag(item: HTMLElement) {
    this.dragItem = item;
    this.originalIndex = this.items.indexOf(item);
    this.currentIndex = this.originalIndex;
  }

  moveItemUp() {
    if (!this.dragItem) {
      return;
    }

    this.currentIndex -= 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.items.length - 1;
    }

    this.reorderItems();
  }

  moveItemDown() {
    if (!this.dragItem) {
      return;
    }

    this.currentIndex += 1;
    if (this.currentIndex >= this.items.length) {
      this.currentIndex = 0;
    }

    this.reorderItems();
  }

  endDrag() {
    this.insertNode(this.items, this.originalIndex, this.currentIndex);
    this.items.forEach(item => item.style.removeProperty('transform'));

    let ret: DragEnd;
    if (this.currentIndex === this.originalIndex) {
      ret = {
        orderChanged: false,
        items: this.items,
      };
    } else {
      this.items.splice(this.originalIndex, 1);
      this.items.splice(this.currentIndex, 0, this.dragItem);

      ret = {
        orderChanged: true,
        items: this.items,
      };
    }


    this.dragItem = null;
    this.currentIndex = -1;

    return ret;
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
