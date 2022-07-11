import { Component, Host, h, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
import { Color } from '../../../types/types';
import { isHex } from '../../../utils/is-hex';

@Component({
  tag: 'dash-chip',
  styleUrl: 'dash-chip.css',
  shadow: true,
})
export class DashChip {
  //#region Own properties
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashChipElement;
  //#endregion

  //#region @State
  @State()
  popoverTarget: HTMLElement;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  heading: string;

  @Prop({
    reflect: true,
  })
  selectable: boolean;

  @Prop({
    reflect: true,
  })
  dismissTooltipText?: string;

  @Prop({
    reflect: true,
  })
  removeable: boolean;

  @Prop({
    reflect: true,
  })
  color: Color | string;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashChipRemove',
  })
  dashChipRemove: EventEmitter;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  removeChip(e: MouseEvent) {
    e.stopPropagation();
    this.dashChipRemove.emit();
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
          {this.removeable && (
            <button
              ref={element =>
                setTimeout(() => {
                  this.popoverTarget = element;
                }, 0)
              }
              class='dismiss'
              disabled={!this.selectable}
              tabIndex={this.selectable ? 0 : -1}
              onClick={e => this.removeChip(e)}
            >
              <dash-icon icon='x' width={10}></dash-icon>
            </button>
          )}

          {this.removeable && this.dismissTooltipText && (
            <dash-tooltip target={this.popoverTarget} text={this.dismissTooltipText} placementStrategy='fixed' offsetY={5} scale='s'></dash-tooltip>
          )}
        </div>
      </Host>
    );
  }
}
