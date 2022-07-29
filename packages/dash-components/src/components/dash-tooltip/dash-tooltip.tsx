import { Component, h, Prop, State, Watch } from '@stencil/core';
import { isEmpty } from 'lodash';
import { Scale } from '../../types/types';
import { queryElementById } from '@didyoumeantoast/dash-utils';
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
  @State()
  active: boolean;
  //#endregion

  //#region @Prop
  @Prop()
  target: HTMLElement | string;
  @Watch('target')
  targetChanged(newTarget: HTMLElement | string, oldTarget: HTMLElement | string) {
    this.disconnectEvents(oldTarget);
    this.connectEvents(newTarget);
  }

  @Prop({
    reflect: true,
  })
  text: string;

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
  })
  scale: Scale = 'm';

  @Prop({
    reflect: true,
  })
  arrow: boolean;

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
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  getTargetElement(target: HTMLElement | string) {
    if (isEmpty(target)) {
      return;
    }

    return typeof target === 'string' ? queryElementById(document.body, target) : target;
  }

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
