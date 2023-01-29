import { Component, h, Listen, Prop, State, Watch } from '@stencil/core';
import { Scale } from '../../types/types';
import { queryElementById, isNone } from '@didyoumeantoast/dash-utils';
import { Placement, PlacementStrategy } from '../dash-popover/dash-popover';

@Component({
  tag: 'dash-tooltip',
  styleUrl: 'dash-tooltip.css',
  shadow: true,
})
export class DashTooltip {
  //#region Own properties

  setActiveTrue: () => void;
  setActiveFalse: () => void;

  //#endregion

  //#region @Element
  //#endregion

  //#region @State

  /**
   * When true, the tooltip is visible
   */
  @State()
  active: boolean;

  //#endregion

  //#region @Prop

  /**
   * Target reference element where the tooltip will be positioned next to
   * @required
   */
  @Prop()
  target: HTMLElement | string;
  @Watch('target')
  targetChanged(newTarget: HTMLElement | string, oldTarget: HTMLElement | string) {
    this.disconnectEvents(oldTarget);
    this.connectEvents(newTarget);
  }

  /**
   * Text value to be displayed in tooltip
   * @required
   */
  @Prop({
    reflect: true,
  })
  text: string;

  /**
   * Strategy the tooltip is placed
   * @default 'absolute'
   */
  @Prop({
    reflect: true,
  })
  placementStrategy: PlacementStrategy = 'absolute';

  /**
   * Offset the tooltip in the x direction in pixels
   * @optional
   */
  @Prop({
    reflect: true,
  })
  offsetX?: number;

  /**
   * Offset the tooltip in the y direction in pixels
   * @optional
   */
  @Prop({
    reflect: true,
  })
  offsetY?: number;

  /**
   * Position of the tooltip relative to its target
   * @default 'bottom'
   */
  @Prop({
    reflect: true,
  })
  placement: Placement = 'bottom';

  /**
   * Size of the tooltip
   * @default 'm'
   */
  @Prop({
    reflect: true,
  })
  scale: Scale = 'm';

  /**
   * When true, an arrow is displayed on the tooltip
   * @default false
   */
  @Prop({
    reflect: true,
  })
  arrow: boolean;

  /**
   * When true, tooltip is visible
   * @default false
   */
  @Prop({
    reflect: true,
  })
  enabled: boolean;
  @Watch('enabled')
  enabledChanged(enabled: boolean) {
    if (!enabled) {
      this.active = false;
    }
  }

  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle

  componentDidLoad() {
    this.connectEvents(this.target);
  }

  disconnectedCallback() {
    this.disconnectEvents(this.target);
  }

  //#endregion

  //#region Listeners

  @Listen('dashPopoverOpen')
  handleDashPopoverOpen(e: CustomEvent) {
    // stop propagation of popover open event since tooltip behaves differently
    e.stopPropagation();
  }

  @Listen('dashPopoverClose')
  handleDashPopoverClose(e: CustomEvent) {
    // stop propagation of popover close event since tooltip behaves differently
    e.stopPropagation();
  }

  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Finds the target element
   * @param target - target reference
   * @returns target element
   */
  getTargetElement(target: HTMLElement | string) {
    if (isNone(target)) {
      return;
    }

    return typeof target === 'string' ? queryElementById(document.body, target) : target;
  }

  /**
   * Connects required events for tooltip
   * @param target - reference HTML element
   */
  connectEvents(target: HTMLElement | string) {
    const element = this.getTargetElement(target);
    if (!element) {
      return;
    }

    this.setActiveTrue = () => {
      if (this.enabled === undefined || this.enabled) {
        this.updateActive(true);
      }
    };
    this.setActiveFalse = () => this.updateActive(false);

    element.addEventListener('mouseenter', this.setActiveTrue);
    element.addEventListener('mouseleave', this.setActiveFalse);
    element.addEventListener('focusin', this.setActiveTrue);
    element.addEventListener('focusout', this.setActiveFalse);
  }

  /**
   * Disconnects required events for tooltip
   * @param target - reference HTML element
   */
  disconnectEvents(target: HTMLElement | string) {
    const element = this.getTargetElement(target);
    if (!element) {
      return;
    }

    element.removeEventListener('mouseenter', this.setActiveTrue);
    element.removeEventListener('mouseleave', this.setActiveFalse);
    element.removeEventListener('focusin', this.setActiveTrue);
    element.removeEventListener('focusout', this.setActiveFalse);

    this.setActiveTrue = null;
    this.setActiveFalse = null;
  }

  /**
   * Updates the active state of the tooltip
   * @param isActive - isActive value
   */
  updateActive(isActive: boolean) {
    this.active = isActive;
  }

  //#endregion

  render() {
    return (
      <dash-popover target={this.target} placementStrategy={this.placementStrategy} offsetX={this.offsetX} offsetY={this.offsetY} placement={this.placement} active={this.active}>
        <div class='tooltip'>{this.text}</div>
      </dash-popover>
    );
  }
}
