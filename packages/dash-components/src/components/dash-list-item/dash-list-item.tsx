import { contains, spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { Focusable } from '../../interfaces/focusable';
import { Scale } from '../../types';
import { SelectionMode } from '../dash-list/dash-list';

@Component({
  tag: 'dash-list-item',
  styleUrl: 'dash-list-item.css',
  shadow: true,
})
export class DashListItem implements Focusable {
  //#region Own properties

  listItem: HTMLElement;

  //#endregion

  //#region @Element

  @Element() element: HTMLDashListItemElement;

  //#endregion

  //#region @State

  /**
   * When `true`, list item visually indicates it's active
   */
  @State() isActive: boolean;

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
   */
  @Prop({ reflect: true }) disabled: boolean;

  /**
   * Whether the list item can be dragged
   * @default false
   */
  @Prop({ reflect: true }) dragEnabled: boolean;

  /**
   * When `true`, list-item is being dragged. Used for styling purposes
   */
  @Prop({ reflect: true }) isDragging: boolean;

  //#endregion

  //#region @Event

  /**
   * Emitted when selected has changed
   */
  @Event({ eventName: 'dashListItemSelectedChanged', composed: true })
  selectedChanged: EventEmitter<void>;

  /**
   * Emitted when list-item indicates focus should be moved to the next list-item
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemMoveNext' }) internalMoveNext: EventEmitter<void>;

  /**
   * Emitted when list-item indicates focus should be moved to the previous list-item
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemMovePrevious' }) internalMovePrevious: EventEmitter<void>;

  /**
   * Emitted when list-item is starting to be dragged
   * @internal
   */
  @Event({ eventName: 'dashInternalListItemStartDrag', bubbles: true }) startedDrag: EventEmitter<MouseEvent>;

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
  async setFocus() {
    this.element.focus();
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
    if (sourceNode !== this.element && !contains(this.listItem, sourceNode as HTMLElement)) {
      return;
    }

    this.click(e);

    if (e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Space') {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.code === 'ArrowUp') {
      this.internalMovePrevious.emit();
    } else if (e.code === 'ArrowDown') {
      this.internalMoveNext.emit();
    }
  }

  /**
   * Handles keyup event
   * @param e - keyboard event
   */
  keyUp(e: KeyboardEvent) {
    if (this.selectionMode === 'no-selection') {
      return;
    }

    if (this.isClick(e)) {
      this.updateIsActive(false);
    }
  }

  /**
   * Updates the isActive property
   * @param active - active value
   */
  updateIsActive(active: boolean) {
    if (this.disabled) {
      this.isActive = false;
      return;
    }

    this.isActive = active;
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
  startDrag(e: MouseEvent) {
    if (!this.dragEnabled) {
      return;
    }

    this.startedDrag.emit(e);
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

  //#endregion

  render() {
    return (
      <Host onKeyDown={(e: KeyboardEvent) => this.keyDown(e)} onKeyUp={this.keyUp.bind(this)}>
        <div
          class={spaceConcat('list-item-wrapper', this.isActive ? 'active' : undefined)}
          onClick={e => this.click(e)}
          onPointerDown={this.updateIsActive.bind(this, true)}
          onPointerUp={this.updateIsActive.bind(this, false)}
          onPointerLeave={this.updateIsActive.bind(this, false)}
          onFocusout={this.updateIsActive.bind(this, false)}
        >
          {this.dragEnabled && (
            <dash-icon
              class='grip'
              icon='grip-vertical'
              scale='s'
              onKeyDown={this.stopPropagation.bind(this)}
              onKeyUp={this.stopPropagation.bind(this)}
              onClick={this.stopPropagation.bind(this)}
              onPointerLeave={this.stopPropagation.bind(this)}
              onPointerDown={e => {
                this.startDrag(e);
              }}
            ></dash-icon>
          )}

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
          </div>

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
          </div>
        </div>
      </Host>
    );
  }
}
