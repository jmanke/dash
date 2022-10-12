import { Component, Element, h, Method, Prop } from '@stencil/core';
import { ScaleExtended } from '../../types/types';
import { Placement } from '../dash-popover/dash-popover';

@Component({
  tag: 'dash-icon-button',
  styleUrl: 'dash-icon-button.css',
  shadow: true,
})
export class DashIconButton {
  //#region Own properties
  button: HTMLButtonElement;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashIconButtonElement;
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  icon: string;

  @Prop({
    reflect: true,
  })
  iconUrl: string;

  @Prop({
    reflect: true,
  })
  scale?: ScaleExtended;

  @Prop({
    reflect: true,
  })
  loading: boolean;

  @Prop({
    reflect: true,
  })
  disabled: boolean;

  @Prop({
    reflect: true,
  })
  type: string;

  @Prop({
    reflect: true,
  })
  rounded: boolean;

  @Prop({
    reflect: true,
  })
  tooltipText?: string;

  @Prop({
    reflect: true,
  })
  tooltipPlacement: Placement;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  @Method()
  async setFocus() {
    this.button.focus();
  }
  //#endregion

  //#region Local methods
  click(e: Event) {
    if (this.loading || this.disabled) {
      e.stopPropagation();
    }
  }
  //#endregion

  render() {
    return [
      <button ref={element => (this.button = element)} disabled={this.loading || this.disabled} onClick={this.click.bind(this)} type={this.type ?? 'button'}>
        {this.icon && <dash-icon scale={this.scale || 'm'} icon={this.icon} iconUrl={this.iconUrl} rounded />}
        <div class='content'>
          <slot />
        </div>
        {this.loading && <dash-loader scale='s'></dash-loader>}
      </button>,
      this.tooltipText && (
        <dash-tooltip
          target={this.element}
          text={this.tooltipText}
          placement={this.tooltipPlacement}
          offsetX={['right', 'top'].includes(this.tooltipPlacement) ? 5 : -5}
          placementStrategy='fixed'
        ></dash-tooltip>
      ),
    ];
  }
}
