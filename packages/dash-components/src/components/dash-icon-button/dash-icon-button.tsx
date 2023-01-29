import { Component, Element, h, Method, Prop } from '@stencil/core';
import { Focusable } from '../../interfaces/focusable';
import { ScaleExtended } from '../../types/types';
import { Placement } from '../dash-popover/dash-popover';

@Component({
  tag: 'dash-icon-button',
  styleUrl: 'dash-icon-button.css',
  shadow: true,
})
export class DashIconButton implements Focusable {
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

  /**
   * Icon to display
   * @optional
   */
  @Prop({
    reflect: true,
  })
  icon: string;

  /**
   * Icon to display from URL
   * @optional
   */
  @Prop({
    reflect: true,
  })
  iconUrl: string;

  /**
   * Size of the icon button
   * @default 'm'
   */
  @Prop({
    reflect: true,
  })
  scale: ScaleExtended = 'm';

  /**
   * When true, indicates the button is loading and cannot be interacted with
   * @default false
   */
  @Prop({
    reflect: true,
  })
  loading: boolean;

  /**
   * When true, the icon button cannot be interacted with
   * @default false
   */
  @Prop({
    reflect: true,
  })
  disabled: boolean;

  /**
   * HTML button type https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
   * @optional
   */
  @Prop({
    reflect: true,
  })
  type?: string;

  /**
   * When true, the icon button will be round
   * @default false
   */
  @Prop({
    reflect: true,
  })
  rounded: boolean;

  /**
   * When provided, a tooltip will display when interacted with
   * @optional
   */
  @Prop({
    reflect: true,
  })
  tooltipText?: string;

  /**
   * Indicates where the tooltip should be placed relative to the icon button
   * @optional
   */
  @Prop({
    reflect: true,
  })
  tooltipPlacement?: Placement;
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method

  /**
   * Sets focus on this element
   */
  @Method()
  async setFocus() {
    this.button.focus();
  }

  //#endregion

  //#region Local methods

  /**
   * Reacts to click event from button
   * @param e - click event
   */
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
