import { Component, h, Prop, Event, EventEmitter, Element, Host, Method, State } from '@stencil/core';
import { contains, isClick, spaceConcat } from '@didyoumeantoast/dash-utils';
import { SelectionMode } from '../dash-list/dash-list';
import { Scale } from '../../types/types';

@Component({
  tag: 'dash-list-item',
  styleUrl: 'dash-list-item.css',
  shadow: true,
})
export class DashListItem {
  //#region Own properties
  listItem: HTMLElement;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashListItemElement;
  //#endregion

  //#region @State
  @State()
  isActive: boolean;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  selectionMode: SelectionMode = 'single';

  @Prop({
    reflect: true,
    mutable: true,
  })
  selected: boolean = false;

  @Prop({
    reflect: true,
  })
  disabled: boolean;

  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashListItemSelectedChanged',
    composed: true,
  })
  dashListItemSelectedChanged: EventEmitter<void>;

  @Event({
    eventName: 'dashInternalListItemMoveNext',
  })
  internalListItemMoveNext: EventEmitter<void>;

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
  @Method()
  async setFocus() {
    this.element.focus();
  }
  //#endregion

  //#region Local methods
  handleClick(e: MouseEvent) {
    if (isClick(e) && !this.disabled) {
      this.selected = !this.selected;
      this.dashListItemSelectedChanged.emit();
    }
  }

  keyDown(e: KeyboardEvent) {
    const sourceNode = e.composedPath()[0];
    if (sourceNode !== this.element && !contains(this.listItem, sourceNode as HTMLElement)) {
      return;
    }

    if (isClick(e) && !this.disabled) {
      this.setActive(true);
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

  keyUp(e: KeyboardEvent) {
    if (isClick(e)) {
      this.setActive(false);
    }
  }

  setActive(active: boolean) {
    if (this.disabled) {
      this.isActive = false;
      return;
    }

    this.isActive = active;
  }

  get checkElement() {
    return <dash-icon class={`check ${!this.selected ? 'check-invisible' : ''}`} icon='check2' scale='s'></dash-icon>;
  }

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
            onClick={e => this.handleClick(e)}
            onPointerDown={this.setActive.bind(this, true)}
            onPointerUp={this.setActive.bind(this, false)}
            onPointerLeave={this.setActive.bind(this, false)}
            onFocusout={this.setActive.bind(this, false)}
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
