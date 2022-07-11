import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { Color } from '../../../types/types';

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
  @Prop({
    reflect: true,
  })
  colors: Color[] = [];

  @Prop({
    reflect: true,
  })
  cols: number;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashColorPickerColorChanged',
    composed: true,
  })
  dashColorPickerColorChanged: EventEmitter<Color>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  //#endregion

  render() {
    return (
      <div class='color-swatch-container' style={{ 'grid-template-columns': `repeat(${this.cols ?? this.colors.length}, 1fr)` }}>
        {this.colors.map(color => (
          <dash-color-swatch color={color} onClick={() => this.dashColorPickerColorChanged.emit(color)} scale='l'></dash-color-swatch>
        ))}
      </div>
    );
  }
}
