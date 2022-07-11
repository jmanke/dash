import { Component, h, Event, EventEmitter, Listen } from '@stencil/core';
import { Color } from '../../../types/types';

@Component({
  tag: 'dash-label-color-picker',
  styleUrl: 'dash-label-color-picker.css',
  shadow: true,
})
export class DashLabelColorPicker {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashLabelColorPickerColorChanged',
  })
  dashLabelColorPickerColorChanged: EventEmitter<Color>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  @Listen('dashColorPickerColorChanged')
  onColorPicked(event: CustomEvent<Color>) {
    this.dashLabelColorPickerColorChanged.emit(event.detail);
  }
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  //#endregion
  render() {
    return <dash-color-picker colors={['red', 'orange', 'yellow', 'green-apple', 'green-grass', 'baby-blue', 'dark-blue', 'purple', 'pink']} cols={3}></dash-color-picker>;
  }
}
