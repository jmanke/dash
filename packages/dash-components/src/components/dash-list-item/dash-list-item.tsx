import { Component, h, Prop, Event, EventEmitter, Element, Host, Method } from '@stencil/core';
import { contains } from 'didyoumeantoast-dash-utils';
import { isClick } from 'didyoumeantoast-dash-utils';
import { SelectionMode } from '../dash-list/dash-list';

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
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  selectionMode: SelectionMode = 'single';

  @Prop({
    reflect: true,
  })
  selected: boolean = false;

  @Prop({
    reflect: true,
  })
  disabled: boolean;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashListItemSelectedChanged',
    composed: true,
  })
  dashListItemSelectedChanged: EventEmitter<boolean>;

  @Event({
    eventName: 'dashListItemMoveNext',
  })
  dashListItemMoveNext: EventEmitter<HTMLDashListItemElement>;

  @Event({
    eventName: 'dashListItemMovePrevious',
  })
  dashListItemMovePrevious: EventEmitter<HTMLDashListItemElement>;
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
      this.dashListItemSelectedChanged.emit(!this.selected);
    }
  }

  keyDown(e: KeyboardEvent) {
    const sourceNode = e.composedPath()[0];
    if (sourceNode !== this.element && !contains(this.listItem, sourceNode as HTMLElement)) {
      return;
    }

    if (isClick(e) && !this.disabled) {
      this.dashListItemSelectedChanged.emit(!this.selected);
    }

    if (e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Space') {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.code === 'ArrowUp') {
      this.dashListItemMovePrevious.emit(this.element);
    } else if (e.code === 'ArrowDown') {
      this.dashListItemMoveNext.emit(this.element);
    }
  }

  get checkElement() {
    return <dash-icon class={`check ${!this.selected ? 'check-invisible' : ''}`} icon='check2' color='primary' scale='s'></dash-icon>;
  }

  get bulletElement() {
    return <dash-icon class={`check ${!this.selected ? 'check-invisible' : ''}`} icon='dot' color='primary' scale='s'></dash-icon>;
  }
  //#endregion

  render() {
    return (
      <Host onKeyDown={(e: KeyboardEvent) => this.keyDown(e)}>
        <div class='list-item' ref={e => (this.listItem = e)} onClick={e => this.handleClick(e)} onKeyDown={e => this.keyDown(e)}>
          {this.selectionMode !== 'none' && (this.selectionMode === 'multiple' ? this.checkElement : this.bulletElement)}
          <slot></slot>
        </div>
        <slot name='actions-end'></slot>
      </Host>
    );
  }
}
