import { contains, spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { Focusable } from '../../interfaces/focusable';
import { Scale } from '../../types';
import { SelectionMode } from '../dash-list/dash-list';

@Component({
  tag: 'dash-list-item',
  styleUrl: 'dash-list-item.css',
  shadow: {
    delegatesFocus: true,
  },
})
export class DashListItem implements Focusable {
  //#region Own properties

  listItem: HTMLElement;

  //#endregion

  //#region @Element

  @Element() element: HTMLDashListItemElement;

  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Selection mode of the list item
   * @internal
   * @default 'single'
   */
  @Prop({ reflect: true }) selectionMode: SelectionMode = 'single';

  /**
   * Whether the list item can be deselected
   * @default false
   */
  @Prop({ reflect: true }) disableDeselect: boolean;

  /**
   * Size of the list-item
   * @internal
   * @default 'm'
   */
  @Prop({ reflect: true }) scale: Scale = 'm';

  /**
   * When `true`, list-item is selected
   * @default false
   */
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  /**
   * When `true`, interaction is disabled
   * @default false
   */
  @Prop({ reflect: true }) disabled: boolean;

  /**
   * Whether the list item can be dragged
   * @default false
   */
  @Prop({ reflect: true }) dragEnabled: boolean;

  /**
   * When provided, list-item is rendered as an anchor
   */
  @Prop({ reflect: true }) href?: string;

  /**
   * Target of the anchor when href is provided
   */
  @Prop({ reflect: true }) target?: string;

  /**
   * When `true`, list-item is being dragged. Used for styling purposes
   * @internal
   * @default false
   */
  @Prop({ reflect: true }) internalIsDragging: boolean;

  /**
   * Tabindex of the list-item
   */
  @Prop() internalTabIndex?: number;

  /**
   * Value of the list-item
   */
  @Prop() value: any;

  //#endregion

  //#region @Event

  /**
   * Emitted when selected has changed
   */
  @Event({ eventName: 'dashListItemSelectedChanged', composed: true }) selectedChanged: EventEmitter<void>;

  /**
   * Emitted when list-item indicates focus should be moved to the next list-item
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemMoveNext' }) internalMoveNext: EventEmitter<HTMLDashListItemElement>;

  /**
   * Emitted when list-item indicates focus should be moved to the previous list-item
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemMovePrevious' }) internalMovePrevious: EventEmitter<HTMLDashListItemElement>;

  /**
   * Emitted when list-item is starting to be dragged
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemStartDrag', bubbles: true }) startedDrag: EventEmitter<PointerEvent | KeyboardEvent>;

  /**
   * Emitted when list-item drag moves up
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemDragMoveUp', bubbles: true }) dragMovedUp: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when list-item drag moves down
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemDragMoveDown', bubbles: true }) dragMovedDown: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when list-item drag moves down
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemDragEnd', bubbles: true }) endedDrag: EventEmitter<KeyboardEvent>;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Methods

  /**
   * Sets focus on this element
   */
  @Method()
  async setFocus(target: 'default' | 'grip' = 'default') {
    if (target === 'default') {
      this.element.focus();
      return;
    }

    (this.element.shadowRoot.querySelector('.grip') as HTMLElement)?.focus();
  }

  //#endregion

  //#region Local methods

  /**
   * Checks if the event is considered a click
   * @param e - keyboard or mouse event
   * @returns `true` if event is considered a click
   */
  isClick(e: KeyboardEvent | MouseEvent) {
    return e instanceof MouseEvent || e.code === 'Space' || e.code === 'Enter';
  }

  /**
   * Handles mouse click
   * @param e - mouse click event
   */
  click(e: MouseEvent | KeyboardEvent) {
    if (this.selectionMode === 'no-selection') {
      return;
    }

    if (this.isClick(e) && !this.disabled && !(this.disableDeselect && this.selected)) {
      this.selected = !this.selected;
      this.selectedChanged.emit();
    }
  }

  /**
   * Handles keydown event
   * @param e - keyboard event
   */
  keyDown(e: KeyboardEvent) {
    if (this.selectionMode === 'no-selection') {
      return;
    }

    const sourceNode = e.composedPath()[0];
    if (sourceNode !== this.element && !contains(sourceNode as HTMLElement, this.listItem)) {
      return;
    }

    this.click(e);

    if (e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Space') {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.code === 'ArrowUp') {
      this.internalMovePrevious.emit(this.element);
    } else if (e.code === 'ArrowDown') {
      this.internalMoveNext.emit(this.element);
    }
  }

  /**
   * Stops event propagation
   * @param e - Event to top propagating
   */
  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  /**
   * Starts drag, emits internal event
   */
  startDrag(e: PointerEvent) {
    if (!this.dragEnabled) {
      return;
    }

    this.startedDrag.emit(e);
  }

  gripKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowUp':
        this.dragMovedUp.emit(e);
        e.preventDefault();
        break;
      case 'ArrowDown':
        this.dragMovedDown.emit(e);
        e.preventDefault();
        break;
      case 'Space':
        this.startedDrag.emit(e);
        e.preventDefault();
        break;
    }

    e.stopPropagation();
  }

  gripKeyUp(e: KeyboardEvent) {
    if (e.code === 'Space') {
      this.endedDrag.emit(e);
    }

    e.stopPropagation();
  }

  /**
   * JSX checkmark element
   */
  get checkElement() {
    return <dash-icon class={`check ${!this.selected ? 'check-invisible' : ''}`} icon='check2' scale='s'></dash-icon>;
  }

  /**
   * JSX bullet element
   */
  get bulletElement() {
    return <dash-icon class={`check ${!this.selected ? 'check-invisible' : ''}`} icon='dot' scale='s'></dash-icon>;
  }

  itemContent() {
    return [
      this.dragEnabled && (
        <dash-icon
          tabIndex={0}
          class={spaceConcat('grip', this.internalIsDragging ? 'grip-active' : undefined)}
          icon='grip-vertical'
          scale='s'
          onKeyDown={this.gripKeyDown.bind(this)}
          onKeyUp={this.gripKeyUp.bind(this)}
          onClick={this.stopPropagation.bind(this)}
          onPointerLeave={this.stopPropagation.bind(this)}
          onPointerDown={e => {
            this.startDrag(e);
          }}
        ></dash-icon>
      ),

      <div class='list-item' ref={e => (this.listItem = e)}>
        {!['none', 'no-selection'].includes(this.selectionMode) && (this.selectionMode === 'multiple' ? this.checkElement : this.bulletElement)}

        <div
          class='actions-start-wrapper'
          onKeyDown={this.stopPropagation.bind(this)}
          onKeyUp={this.stopPropagation.bind(this)}
          onClick={this.stopPropagation.bind(this)}
          onPointerDown={this.stopPropagation.bind(this)}
          onPointerUp={this.stopPropagation.bind(this)}
          onPointerLeave={this.stopPropagation.bind(this)}
        >
          <slot name='actions-start'></slot>
        </div>

        <slot></slot>
      </div>,

      <div
        class='actions-end-wrapper'
        onKeyDown={this.stopPropagation.bind(this)}
        onKeyUp={this.stopPropagation.bind(this)}
        onClick={this.stopPropagation.bind(this)}
        onPointerDown={this.stopPropagation.bind(this)}
        onPointerUp={this.stopPropagation.bind(this)}
        onPointerLeave={this.stopPropagation.bind(this)}
      >
        <slot name='actions-end'></slot>
      </div>,
    ];
  }

  //#endregion

  render() {
    return (
      <Host onKeyDown={this.keyDown.bind(this)} onClick={this.click.bind(this)}>
        {this.href ? (
          <a class='list-item-wrapper' href={this.href} target={this.target} tabIndex={this.internalTabIndex ?? 0}>
            {this.itemContent()}
          </a>
        ) : (
          <div class='list-item-wrapper' tabIndex={this.internalTabIndex ?? 0}>
            {this.itemContent()}
          </div>
        )}
      </Host>
    );
  }
}
