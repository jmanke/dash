import { contains } from '@didyoumeantoast/dash-utils';
import { AutoPlacement, BasePlacement, createPopper, Instance, VariationPlacement } from '@popperjs/core';
import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core';

export type PlacementStrategy = 'absolute' | 'fixed';
export type Placement = AutoPlacement | BasePlacement | VariationPlacement;

export interface PopoverCloseEvent {
  escapeInitiated: boolean;
}

@Component({
  tag: 'dash-popover',
  styleUrl: 'dash-popover.css',
  shadow: true,
})
export class DashPopover {
  //#region Own properties

  /**
   * Tracks all popovers throughout the app
   */
  static currentPopovers: HTMLDashPopoverElement[] = [];

  /**
   * PopperJS instance
   */
  popper?: Instance;

  keyDownListener: (e: KeyboardEvent) => void;
  clickListener: (e: PointerEvent) => void;

  /**
   * When `true`, the popover was closed via the escape key
   */
  closedByEscape: boolean;

  //#endregion

  //#region @Element

  @Element() element: HTMLDashPopoverElement;

  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Popover target reference, can either be an element or element id
   * @required
   */
  @Prop() target: HTMLElement | string;
  @Watch('target')
  targetChanged() {
    this.updatePopover(true);
  }

  /**
   * Strategy of placing the popover
   * @default 'absolute'
   */
  @Prop({ reflect: true }) placementStrategy: PlacementStrategy = 'absolute';

  /**
   * Offset the popover in the x direction in pixels
   * @optional
   */
  @Prop({ reflect: true }) offsetX?: number;

  /**
   * Offset the popover in the y direction in pixels
   * @optional
   */
  @Prop({ reflect: true }) offsetY?: number;

  /**
   * Position of the popover relative to its target
   * @default 'bottom'
   */
  @Prop({ reflect: true }) placement: Placement = 'bottom';

  /**
   * Keeps the popover in view if it's positioned outside the window's view
   * @default false
   */
  @Prop({
    reflect: true,
  })
  stayInView: boolean;

  /**
   * When true, the popover will be open
   * @default false
   */
  @Prop({ reflect: true, mutable: true }) active: boolean;
  @Watch('active')
  activeChanged(active: boolean) {
    this.updatePopover();
    this.attachEvents();

    if (active) {
      DashPopover.currentPopovers.push(this.element);
      // allow content to load before emitting open event
      setTimeout(() => {
        this.dashPopoverOpen.emit();
      }, 0);
    } else {
      this.removeCurrentPopover();
      this.dashPopoverClose.emit({ escapeInitiated: this.closedByEscape });
    }

    this.closedByEscape = false;
  }

  /**
   * When `true`, popover will autoclose when it loses focus
   * @default false
   */
  @Prop({ reflect: true }) autoClose: boolean;

  //#endregion

  //#region @Event

  /**
   * Emitted when the popover is opened
   */
  @Event({ eventName: 'dashPopoverOpen' }) dashPopoverOpen: EventEmitter;

  /**
   * Emitted when the popover is closed
   */
  @Event({ eventName: 'dashPopoverClose' }) dashPopoverClose: EventEmitter<PopoverCloseEvent>;

  //#endregion

  //#region Component lifecycle

  componentDidLoad() {
    this.createPopover();
    const container = this.element.shadowRoot.querySelector('.container');
    container.addEventListener('dashPopoverOpen', (e: CustomEvent) => {
      // prevent nested popovers from propagating this event
      e.stopPropagation();
    });
    container.addEventListener('dashPopoverClose', (e: CustomEvent) => {
      // prevent nested popovers from propagating this event
      e.stopPropagation();
    });
  }

  disconnectedCallback() {
    this.removeWindowEventListeners();
    this.removeCurrentPopover();
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Removes popover from the tracked popovers
   */
  removeCurrentPopover() {
    DashPopover.currentPopovers = DashPopover.currentPopovers.filter(p => p !== this.element);
  }

  /**
   * Updates the popper instace
   * @param forceCreate - When `true`, forces the popper to be recreated
   */
  updatePopover(forceCreate = false) {
    if (this.popper && !forceCreate) {
      this.popper.update();
      return;
    }

    this.createPopover();
  }

  /**
   * Closes the modal
   * @param escape - When `true`, modal was closed via the escape key
   */
  close(escape: boolean = false) {
    this.closedByEscape = escape;
    this.active = false;
  }

  /**
   * Attaches all events required for the popover
   */
  async attachEvents() {
    if (this.active) {
      if (this.autoClose) {
        this.keyDownListener = (e: KeyboardEvent) => {
          if (DashPopover.currentPopovers[DashPopover.currentPopovers.length - 1] === this.element && e.code === 'Escape') {
            this.close(true);
          }
        };

        this.clickListener = (e: MouseEvent) => {
          if (DashPopover.currentPopovers[DashPopover.currentPopovers.length - 1] === this.element && !contains(this.element, e.composedPath()[0] as HTMLElement)) {
            this.close();
          }
        };

        window.addEventListener('keydown', this.keyDownListener);
        window.addEventListener('click', this.clickListener);
      }
    } else {
      this.removeWindowEventListeners();
    }
  }

  /**
   * Removes event listeners attached to the window
   */
  removeWindowEventListeners() {
    window.removeEventListener('keydown', this.keyDownListener);
    window.removeEventListener('click', this.clickListener);
    this.keyDownListener = null;
    this.clickListener = null;
  }

  /**
   * Creates the popper instance
   */
  createPopover() {
    const target = typeof this.target === 'string' ? document.body.querySelector('#' + this.target) : this.target;

    if (!target) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    const modifiers = [
      {
        name: 'offset',
        options: {
          offset: () => [this.offsetY ?? 0, this.offsetX ?? 0],
        },
      },
    ];

    if (this.stayInView) {
      modifiers.push({
        name: 'preventOverflow',
        options: {
          // @ts-ignore
          altAxis: true,
        },
      });
    }

    this.popper = createPopper(target, this.element, {
      strategy: this.placementStrategy,
      placement: this.placement,
      modifiers,
    });
  }

  //#endregion

  render() {
    return (
      <Host>
        <div class='container'>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
