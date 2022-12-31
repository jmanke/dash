import { Component, Host, h, State, Prop, Event, EventEmitter, Method, Listen, Element } from '@stencil/core';
import { contains, focus, SKIP_NODE_CLASS } from '@didyoumeantoast/dash-utils';
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
  //#endregion

  //#region @Prop
  @Prop({
    mutable: true,
    reflect: true,
  })
  open: boolean = false;

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

  /**
   * Auto focus dropdown content on open
   * @default true
   */
  @Prop({
    reflect: true,
  })
  autoFocus: boolean = true;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashDropdownOpenChange',
    composed: true,
    bubbles: true,
  })
  dropdownOpenChange: EventEmitter<void>;
  //#endregion

  //#region Component lifecycle
  disconnectedCallback() {
    this.close();
  }
  //#endregion

  //#region Listeners
  @Listen('dashDropdownOpenChange')
  handleDropdownVisibleChanged(e: Event) {
    // prevent this element from blocking its own event
    if (this.element === e.composedPath()[0]) {
      return;
    }

    // prevent nested dropdowns from propagating
    e.stopPropagation();
  }

  @Listen('dashPopoverOpen')
  popoverOpened() {
    if (this.autoFocus) {
      focus(this.popoverContentContainer);
    }
  }

  @Listen('dashPopoverClose')
  async popoverClosed(e: CustomEvent<PopoverCloseEvent>) {
    this.close(e.detail.escapeInitiated);
  }
  //#endregion

  //#region @Method
  @Method()
  async close(focusTarget?: boolean) {
    if (!this.open) {
      return;
    }

    this.updateOpen(false);
    if (focusTarget) {
      this.focusTarget();
    }
  }
  //#endregion

  //#region Local methods
  onDropdownTargetClicked: () => void;

  updateOpen(open: boolean) {
    this.open = open;
    this.dropdownOpenChange.emit();
  }

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
    this.updateOpen(!this.open);
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

        <dash-popover target={this.target as HTMLElement} placement={this.placement} placementStrategy={this.placementStrategy} active={this.open} autoClose>
          <div class='container' ref={element => (this.popoverContentContainer = element)}>
            {this.open && <slot></slot>}
          </div>
        </dash-popover>
      </Host>
    );
  }
}
