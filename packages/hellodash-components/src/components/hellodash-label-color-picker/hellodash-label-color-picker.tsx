import { Component, h, Event, EventEmitter, Listen, Prop } from '@stencil/core';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';

@Component({
  tag: 'hellodash-label-color-picker',
  styleUrl: 'hellodash-label-color-picker.css',
  shadow: true,
})
export class HellodashLabelColorPicker {
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
  color: Color;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'hellodashLabelColorPickerColorChanged',
  })
  labelColorPickerColorChanged: EventEmitter<Color>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  @Listen('dashColorPickerColorChanged')
  onColorPicked(event: CustomEvent<Color>) {
    this.labelColorPickerColorChanged.emit(event.detail);
  }
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  //#endregion
  render() {
    return (
      <dash-color-picker
        colors={['red', 'orange', 'yellow', 'green-apple', 'green-grass', 'baby-blue', 'dark-blue', 'purple', 'pink']}
        cols={3}
        selectedColor={this.color}
      ></dash-color-picker>
    );
  }
}
