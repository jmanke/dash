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

  protected dragItem: HTMLElement;
  protected originalIndex: number;
  protected currentIndex: number;
  protected currentItemOrder: number[];

  // keyboard drag properties

  constructor(items: HTMLElement[] = []) {
    this.items = items;
  }

  protected adjustOrder(fromIndex: number, toIndex: number) {
    const index = this.currentItemOrder[fromIndex];
    this.currentItemOrder.splice(fromIndex, 1);
    this.currentItemOrder.splice(toIndex, 0, index);
  }

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
