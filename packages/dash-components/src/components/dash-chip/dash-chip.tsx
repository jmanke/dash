import { Component, Host, h, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
import { Color } from '../../types/types';
import { isHex } from '@didyoumeantoast/dash-utils';

@Component({
  tag: 'dash-chip',
  styleUrl: 'dash-chip.css',
  shadow: true,
})
export class DashChip {
  //#region Own properties
  //#endregion

  //#region @Element

  @Element() element: HTMLDashChipElement;

  //#endregion

  //#region @State

  /**
   * Reference target of the popover
   */
  @State() popoverTarget: HTMLElement;

  //#endregion

  //#region @Prop

  /**
   * Displayed heading on the chip
   * @required
   */
  @Prop({ reflect: true }) heading: string;

  /**
   * When `true`, the chip can be interacted with
   * @default false
   */
  @Prop({ reflect: true }) selectable: boolean;

  /**
   * Text to display when user focuses or hovers over dismiss button
   * @optional
   */
  @Prop({ reflect: true }) dismissTooltipText?: string;

  /**
   * When `true`, chip can be removed
   * @default false
   */
  @Prop({ reflect: true }) dismissible: boolean = false;

  /**
   * Background color of the chip
   * @required
   */
  @Prop({ reflect: true }) color: Color | string;

  //#endregion

  //#region @Event

  /**
   * Emitted when the chip is removed
   */
  @Event({ eventName: 'dashChipDismiss' }) dashChipDismiss: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Emits event to dismiss chip
   * @param e - Mouse event from dismiss button
   */
  dismissChip(e: MouseEvent) {
    e.stopPropagation();
    this.dashChipDismiss.emit();
  }

  //#endregion

  render() {
    const style = this.color ? { '--dash-chip-background-color': `${isHex(this.color) ? this.color : `var(--dash-color-${this.color})`}` } : null;

    return (
      <Host style={style}>
        <div class='chip'>
          <div class='heading' title={this.heading}>
            {this.heading}
          </div>
          {this.dismissible && (
            <button
              ref={element =>
                setTimeout(() => {
                  this.popoverTarget = element;
                }, 0)
              }
              class='dismiss'
              disabled={!this.selectable}
              tabIndex={this.selectable ? 0 : -1}
              onClick={e => this.dismissChip(e)}
            >
              <dash-icon class='close-chip' icon='x'></dash-icon>
            </button>
          )}

          {this.dismissible && this.dismissTooltipText && this.popoverTarget && (
            <dash-tooltip target={this.popoverTarget} text={this.dismissTooltipText} placementStrategy='fixed' offsetX={5} placement='right' scale='s'></dash-tooltip>
          )}
        </div>
      </Host>
    );
  }
}
