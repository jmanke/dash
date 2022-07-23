import { Component, Host, h, State, Prop, Watch, Event, EventEmitter, Method, Listen, Element } from '@stencil/core';
import { contains } from '../../utils/contains';
import { focus, SKIP_NODE_CLASS } from '../../utils/focus';
import { Placement, PlacementStrategy, PopoverCloseEvent } from '../dash-popover/dash-popover';

@Component({
  tag: 'dash-dropdown',
  styleUrl: 'dash-dropdown.css',
  shadow: true,
})
export class DashDropdown {
  //#region Own properties
  popoverContentContainer: HTMLElement;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashDropdownElement;
  //#endregion

  //#region @State
  @State()
  target: HTMLElement;

  @State()
  showPopover: boolean = false;
  @Watch('showPopover')
  showPopoverChanged(showPopover: boolean) {
    this.dropdownVisibleChanged.emit(showPopover);
  }
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  placementStrategy: PlacementStrategy = 'absolute';

  @Prop({
    reflect: true,
  })
  placement: Placement = 'bottom';

  @Prop({
    reflect: true,
  })
  autoClose: boolean;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dropdownVisibleChanged',
    composed: true,
    bubbles: true,
  })
  dropdownVisibleChanged: EventEmitter<boolean>;
  //#endregion

  //#region Component lifecycle
  disconnectedCallback() {
    this.close();
  }
  //#endregion

  //#region Listeners
  @Listen('dropdownVisibleChanged')
  handleDropdownVisibleChanged(e: CustomEvent<boolean>) {
    // prevent this element from blocking its own event
    if (this.element === e.composedPath()[0]) {
      return;
    }

    // prevent nested dropdowns from propagating
    e.stopPropagation();
  }

  @Listen('dashPopoverOpen')
  popoverOpened() {
    focus(this.popoverContentContainer);
  }

  @Listen('dashPopoverClose')
  async popoverClosed(e: CustomEvent<PopoverCloseEvent>) {
    this.close(e.detail.escapeInitiated);
  }
  //#endregion

  //#region @Method
  @Method()
  async close(focusTarget?: boolean) {
    if (!this.showPopover) {
      return;
    }

    this.showPopover = false;
    if (focusTarget) {
      this.focusTarget();
    }
  }
  //#endregion

  //#region Local methods
  onDropdownTargetClicked: () => void;

  dropdownTargetChanged(e: Event) {
    if (this.target) {
      // remove click event on target if it exists
      this.target.removeEventListener('click', this.onDropdownTargetClicked);
      this.target.classList.remove(SKIP_NODE_CLASS);
    }

    // find the new slotted target element
    this.target = (e.target as HTMLSlotElement).assignedElements()?.[0] as HTMLElement;
    if (this.target) {
      // add click event listener
      this.onDropdownTargetClicked = this.dropdownTargetClicked.bind(this);
      this.target.addEventListener('click', this.onDropdownTargetClicked);

      this.target.classList.add(SKIP_NODE_CLASS);
    }
  }

  focusTarget() {
    this.target?.classList.remove(SKIP_NODE_CLASS);
    focus(this.target);
    this.target?.classList.add(SKIP_NODE_CLASS);
  }

  dropdownTargetClicked() {
    this.showPopover = !this.showPopover;
  }

  popoverFocusOut(e: FocusEvent) {
    if (this.autoClose && !!e.relatedTarget && !contains(this.element, e.relatedTarget as HTMLElement)) {
      this.close();
    }
  }
  //#endregion

  render() {
    return (
      <Host onFocusout={this.popoverFocusOut.bind(this)}>
        <slot name='dropdown-trigger' onSlotchange={e => this.dropdownTargetChanged(e)}></slot>

        <dash-popover target={this.target as HTMLElement} placement={this.placement} placementStrategy={this.placementStrategy} active={this.showPopover} autoClose>
          <div class='container' ref={element => (this.popoverContentContainer = element)}>
            {this.showPopover && <slot></slot>}
          </div>
        </dash-popover>
      </Host>
    );
  }
}
