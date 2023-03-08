export abstract class Sortable {
  /**
   * Items to be sorted
   * @required
   */
  items: HTMLElement[];

  // keyboard drag properties

  constructor(items: HTMLElement[] = []) {
    this.items = items;
  }

  protected insertNode(items: HTMLElement[], originalIndex: number, currentIndex: number) {
    const item = items[originalIndex];
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
}
