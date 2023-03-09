import { isNone, spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { SortableKeyboard } from '../../common/sortable-keyboard';
import { SortablePointer } from '../../common/sortable-pointer';
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
  listItemStartedDrag(e: CustomEvent<PointerEvent | KeyboardEvent>) {
    if (!this.listItems?.length) {
      return;
    }

    if (e.detail instanceof PointerEvent) {
      this.startPointerDrag(e.detail, e.target as HTMLDashListItemElement);
      return;
    }

    this.startKeyboardDrag(e.target as HTMLDashListItemElement);
  }

  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  startPointerDrag(e: PointerEvent, item: HTMLDashListItemElement) {
    const sortable = new SortablePointer(this.listItems);
    item.style.zIndex = '9999';

    sortable.onBeforeDragEnd = () => {
      item.isDragging = false;
    };
    sortable.onDragEnd = ({ orderChanged }) => {
      this.dragging = false;
      item.style.removeProperty('z-index');

      if (orderChanged) {
        this.updateChildProps();
        this.listItemsReordered.emit(this.listItems);
      }
    };
    this.dragging = true;
    item.isDragging = true;

    sortable.startDrag(e, item);
  }

  startKeyboardDrag(item: HTMLDashListItemElement) {
    if (this.dragging) {
      return;
    }

    const sortable = new SortableKeyboard(this.listItems);

    this.dragging = true;
    item.isDragging = true;

    const moveUp = () => sortable.moveItemUp();
    const moveDown = () => sortable.moveItemDown();

    item.addEventListener('dashInternalListItemDragMoveUp', moveUp);
    item.addEventListener('dashInternalListItemDragMoveDown', moveDown);
    item.addEventListener(
      'dashInternalListItemDragEnd',
      () => {
        this.dragging = false;
        item.isDragging = false;
        item.removeEventListener('dashInternalListItemDragMoveUp', moveUp);
        item.removeEventListener('dashInternalListItemDragMoveDown', moveDown);
        const { orderChanged, items } = sortable.endDrag();
        if (orderChanged) {
          this.updateChildProps();
          this.listItemsReordered.emit(items as HTMLDashListItemElement[]);
        }
      },
      { once: true },
    );

    sortable.startDrag(item);
  }

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
