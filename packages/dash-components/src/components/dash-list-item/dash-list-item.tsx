import { Component, h, Prop, Event, EventEmitter, Element, Host, Method, State } from '@stencil/core';
import { contains, isClick, spaceConcat } from '@didyoumeantoast/dash-utils';
import { SelectionMode } from '../dash-list/dash-list';
import { Scale } from '../../types/types';
import { Focusable } from '../../interfaces/focusable';

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

  @Element()
  element: HTMLDashListItemElement;

  //#endregion

  //#region @State

  /**
   * When true, list item visually indicates it's active
   */
  @State()
  isActive: boolean;

  //#endregion

  //#region @Prop

  /**
   * Selection mode of the list item
   * @internal
   * @default 'single'
   */
  @Prop({
    reflect: true,
  })
  selectionMode: SelectionMode = 'single';

  /**
   * Size of the list-item
   * @internal
   * @default 'm'
   */
  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';

  /**
   * When true, list-item is selected
   * @default false
   */
  @Prop({
    reflect: true,
    mutable: true,
  })
  selected: boolean = false;

  /**
   * When true, interaction is disabled
   */
  @Prop({
    reflect: true,
  })
  disabled: boolean;

  //#endregion

  //#region @Event

  /**
   * Emitted when selected has changed
   */
  @Event({
    eventName: 'dashListItemSelectedChanged',
    composed: true,
  })
  dashListItemSelectedChanged: EventEmitter<void>;

  /**
   * Emitted when list-item indicates focus should be moved to the next list-item
   * @internal
   */
  @Event({
    eventName: 'dashInternalListItemMoveNext',
  })
  internalListItemMoveNext: EventEmitter<void>;

  /**
   * Emitted when list-item indicates focus should be moved to the previous list-item
   * @internal
   */
  @Event({
    eventName: 'dashInternalListItemMovePrevious',
  })
  internalListItemMovePrevious: EventEmitter<void>;

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
   * Handles mouse click
   * @param e - mouse click event
   */
  click(e: MouseEvent) {
    if (isClick(e) && !this.disabled) {
      this.selected = !this.selected;
      this.dashListItemSelectedChanged.emit();
    }
  }

  /**
   * Handles keydown event
   * @param e - keyboard event
   */
  keyDown(e: KeyboardEvent) {
    const sourceNode = e.composedPath()[0];
    if (sourceNode !== this.element && !contains(this.listItem, sourceNode as HTMLElement)) {
      return;
    }

    if (isClick(e) && !this.disabled) {
      this.updateIsActive(true);
      this.selected = !this.selected;
      this.dashListItemSelectedChanged.emit();
    }

    if (e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Space') {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.code === 'ArrowUp') {
      this.internalListItemMovePrevious.emit();
    } else if (e.code === 'ArrowDown') {
      this.internalListItemMoveNext.emit();
    }
  }

  /**
   * Handles keyup event
   * @param e - keyboard event
   */
  keyUp(e: KeyboardEvent) {
    if (isClick(e)) {
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
        <div class={spaceConcat('list-item-wrapper', this.isActive ? 'active' : undefined)}>
          <slot name='actions-start'></slot>

          <div
            class='list-item'
            ref={e => (this.listItem = e)}
            onClick={e => this.click(e)}
            onPointerDown={this.updateIsActive.bind(this, true)}
            onPointerUp={this.updateIsActive.bind(this, false)}
            onPointerLeave={this.updateIsActive.bind(this, false)}
            onFocusout={this.updateIsActive.bind(this, false)}
          >
            {this.selectionMode !== 'none' && (this.selectionMode === 'multiple' ? this.checkElement : this.bulletElement)}
            <slot></slot>
          </div>

          <slot name='actions-end'></slot>
        </div>
      </Host>
    );
  }
}
