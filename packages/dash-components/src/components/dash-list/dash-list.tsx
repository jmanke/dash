import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { isDefined } from 'didyoumeantoast-dash-utils';

export type SelectionMode = 'single' | 'multiple' | 'none';

@Component({
  tag: 'dash-list',
  styleUrl: 'dash-list.css',
  shadow: true,
})
export class DashList {
  //#region Own properties
  listItems: HTMLDashListItemElement[] = [];
  //#endregion

  //#region @Element
  @Element()
  element: HTMLElement;
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  selectionMode: SelectionMode = 'single';
  @Watch('selectionMode')
  selectionModeChanged() {
    this.updateChildProps();
  }
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  async componentWillLoad() {
    const observer = new MutationObserver(() => {
      this.updateChildProps();
    });

    observer.observe(this.element, { childList: true });
    this.updateChildProps();
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  nextSibling(e: HTMLDashListItemElement) {
    return (e.nextSibling as HTMLDashListItemElement) ?? this.listItems[0];
  }

  prevSibling(e: HTMLDashListItemElement) {
    return (e.previousSibling as HTMLDashListItemElement) ?? this.listItems[this.listItems.length - 1];
  }

  focusNextListItem(e: HTMLDashListItemElement) {
    e.tabIndex = -1;
    let nextSibling = this.nextSibling(e);
    while (isDefined(nextSibling.getAttribute('disabled'))) {
      nextSibling = this.nextSibling(nextSibling);

      if (nextSibling === e) {
        break;
      }
    }

    nextSibling.focus();
    nextSibling.tabIndex = 0;
  }

  focusPreviousListItem(e: HTMLDashListItemElement) {
    e.tabIndex = -1;
    let prevSibling = this.prevSibling(e);
    while (isDefined(prevSibling.getAttribute('disabled'))) {
      prevSibling = this.prevSibling(prevSibling);

      if (prevSibling === e) {
        break;
      }
    }

    prevSibling.focus();
    prevSibling.tabIndex = 0;
  }

  updateChildProps() {
    this.listItems = Array.from(this.element.childNodes).filter(child => child.nodeName === 'DASH-LIST-ITEM') as HTMLDashListItemElement[];
    this.listItems.forEach((element: HTMLDashListItemElement, index: number) => {
      element.selectionMode = this.selectionMode;
      element.tabIndex = index === 0 ? 0 : -1;
    });
  }
  //#endregion

  render() {
    return (
      <Host role='list' onDashListItemMoveNext={e => this.focusNextListItem(e.detail)} onDashListItemMovePrevious={e => this.focusPreviousListItem(e.detail)}>
        <slot></slot>
      </Host>
    );
  }
}
