import { contains, focus, SKIP_NODE_CLASS } from '@didyoumeantoast/dash-utils';
import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State } from '@stencil/core';
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

  @Element() element: HTMLDashDropdownElement;

  //#endregion

  //#region @State

  /**
   * Popover target
   */
  @State() target: HTMLElement;

  //#endregion

  //#region @Prop

  /**
   * When `true`, dropdown is open
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Placement strategy for dropdown
   * @default 'absolute'
   */
  @Prop({ reflect: true }) placementStrategy: PlacementStrategy = 'absolute';

  /**
   * Placement of the dropdown relative to its target
   * @default 'bottom'
   */
  @Prop({ reflect: true }) placement: Placement = 'bottom';

  /**
   * When `true`, dropdown will close when focus is lost
   * @default false
   */
  @Prop({ reflect: true }) autoClose: boolean;

  //#endregion

  //#region @Event

  /**
   * Emitted when dropdown is either opened or closed
   */
  @Event({ eventName: 'dashDropdownOpenChange', composed: true, bubbles: true }) openChanged: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle

  disconnectedCallback() {
    this.close();
  }

  //#endregion

  //#region Listeners

  /**
   * Reacts to the dropdown visiblity changing
   * @param e - Event
   */
  @Listen('dashDropdownOpenChange')
  handleDropdownVisibleChanged(e: Event) {
    // prevent this element from blocking its own event
    if (this.element === e.composedPath()[0]) {
      return;
    }

    // prevent nested dropdowns from propagating
    e.stopPropagation();
  }

  /**
   * Reacts to the dropdown's popover opening
   */
  @Listen('dashPopoverOpen')
  popoverOpened() {
    focus(this.popoverContentContainer);
  }

  /**
   * Reacts to the dropdown's popover closing
   */
  @Listen('dashPopoverClose')
  async popoverClosed(e: CustomEvent<PopoverCloseEvent>) {
    this.close(e.detail.escapeInitiated);
  }

  //#endregion

  //#region @Method

  /**
   * Close the dropdown
   * @param focusTarget - target to focus once dropdown is closed
   */
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

  /**
   * callback for the target being clicked, must be a member variable to remove listener
   */
  onDropdownTargetClicked: () => void;

  /**
   * Updates `open` property
   * @param open - open value to assign
   */
  updateOpen(open: boolean) {
    this.open = open;
    this.openChanged.emit();
  }

  /**
   * Reacts to the dropdown target changing (slot changed)
   * @param e - Slot changed event
   */
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

  /**
   * Focuses target element
   */
  focusTarget() {
    this.target?.classList.remove(SKIP_NODE_CLASS);
    focus(this.target);
    this.target?.classList.add(SKIP_NODE_CLASS);
  }

  /**
   * Reacts to the dropdown target being clicked
   */
  dropdownTargetClicked() {
    this.updateOpen(!this.open);
  }

  /**
   * Reacts to focus out event on dropdown popover
   * @param e - dropdown focus out event
   */
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
