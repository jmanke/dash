import { Component, h, Event, EventEmitter, Prop } from '@stencil/core';
import { Color } from '@didyoumeantoast/dash-components/dist/types/types/types';
import { DashColorPickerCustomEvent } from '@didyoumeantoast/dash-components/dist/types/components';

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
  @Prop({
    reflect: true,
  })
  color: Color;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashLabelColorPickerColorChanged',
  })
  dashLabelColorPickerColorChanged: EventEmitter<Color>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  colorPicked(event: DashColorPickerCustomEvent<void>) {
    this.dashLabelColorPickerColorChanged.emit(event.target.color);
  }
  //#endregion
  render() {
    return (
      <dash-color-picker
        colors={['red', 'orange', 'yellow', 'green-apple', 'green-grass', 'baby-blue', 'dark-blue', 'purple', 'pink']}
        cols={3}
        color={this.color}
        onDashColorPickerColorChanged={this.colorPicked.bind(this)}
      ></dash-color-picker>
    );
  }
}
