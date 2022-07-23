import { AutoPlacement, BasePlacement, createPopper, Instance, VariationPlacement } from '@popperjs/core';
import { Component, Host, h, Element, Prop, Watch, Event, EventEmitter, Listen } from '@stencil/core';
import { contains } from '../../utils/contains';

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
  popper?: Instance;
  keyDownListener: (e: KeyboardEvent) => void;
  clickListener: (e: PointerEvent) => void;
  static currentPopovers: HTMLDashPopoverElement[] = [];
  closedByEscape: boolean;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashPopoverElement;
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop()
  target: HTMLElement | string;
  @Watch('target')
  targetChanged() {
    this.updatePopover();
  }

  @Prop({
    reflect: true,
  })
  placementStrategy: PlacementStrategy = 'absolute';

  @Prop({
    reflect: true,
  })
  offsetX?: number;

  @Prop({
    reflect: true,
  })
  offsetY?: number;

  @Prop({
    reflect: true,
  })
  placement: Placement = 'bottom';

  @Prop({
    reflect: true,
    mutable: true,
  })
  active: boolean;
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

  @Prop({
    reflect: true,
  })
  autoClose: boolean;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashPopoverOpen',
  })
  dashPopoverOpen: EventEmitter;

  @Event({
    eventName: 'dashPopoverClose',
  })
  dashPopoverClose: EventEmitter<PopoverCloseEvent>;
  //#endregion

  //#region Component lifecycle
  componentDidLoad() {
    this.createPopover();
  }

  disconnectedCallback() {
    this.removeWindowEventListeners();
    this.removeCurrentPopover();
  }
  //#endregion

  //#region Listeners
  @Listen('dashPopoverOpen')
  handleDashPopoverOpen(e: CustomEvent) {
    // prevent nested popovers from propagating this event
    if (this.element === e.composedPath()[0]) {
      return;
    }

    e.stopPropagation();
  }

  @Listen('dashPopoverClose')
  handleDashPopoverClose(e: CustomEvent<PopoverCloseEvent>) {
    // prevent nested popovers from propagating this event
    if (this.element === e.composedPath()[0]) {
      return;
    }

    e.stopPropagation();
  }
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  removeCurrentPopover() {
    DashPopover.currentPopovers = DashPopover.currentPopovers.filter(p => p !== this.element);
  }

  updatePopover() {
    if (this.popper) {
      this.popper.update();

      return;
    }

    this.createPopover();
  }

  close(escape: boolean = false) {
    this.closedByEscape = escape;
    this.active = false;
  }

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

  removeWindowEventListeners() {
    window.removeEventListener('keydown', this.keyDownListener);
    window.removeEventListener('click', this.clickListener);
    this.keyDownListener = null;
    this.clickListener = null;
  }

  createPopover() {
    const target = typeof this.target === 'string' ? document.body.querySelector('#' + this.target) : this.target;

    if (!target) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    this.popper = createPopper(target, this.element, {
      strategy: this.placementStrategy,
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: () => [this.offsetY ?? 0, this.offsetX ?? 0],
          },
        },
      ],
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
