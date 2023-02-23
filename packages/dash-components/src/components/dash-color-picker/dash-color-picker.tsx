import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Color } from '../../types';

@Component({
  tag: 'dash-color-picker',
  styleUrl: 'dash-color-picker.css',
  shadow: true,
})
export class DashColorPicker {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Colors to pick from
   * @required
   */
  @Prop({ reflect: true }) colors: Color[] = [];

  /**
   * Currently selected color
   * @optional
   */
  @Prop({ reflect: true, mutable: true }) color: Color;

  /**
   * Number of columns to display for colors - ex. 3 cols means colors will be split among 3 columns
   * @default colors.length
   */
  @Prop({ reflect: true }) cols: number;

  //#endregion

  //#region @Event

  /**
   * Emitted when color has been selected
   */
  @Event({ eventName: 'dashColorPickerColorChanged' }) dashColorPickerColorChanged: EventEmitter<void>;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Selects a new color
   * @param color Color to set
   */
  setColor(color: Color) {
    this.color = color;
    this.dashColorPickerColorChanged.emit();
  }

  //#endregion

  render() {
    return (
      <div class='color-swatch-container' style={{ 'grid-template-columns': `repeat(${this.cols ?? this.colors.length}, 1fr)` }}>
        {this.colors.map(color => (
          <dash-color-swatch color={color} onClick={this.setColor.bind(this, color)} scale='l' selected={this.color === color}></dash-color-swatch>
        ))}
      </div>
    );
  }
}
