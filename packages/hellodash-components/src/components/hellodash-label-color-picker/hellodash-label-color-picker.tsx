import { Color, DashColorPickerCustomEvent } from '@didyoumeantoast/dash-components';
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

const Colors: Color[] = ['red', 'orange', 'yellow', 'green-apple', 'green-grass', 'baby-blue', 'dark-blue', 'purple', 'pink'];

@Component({
  tag: 'hellodash-label-color-picker',
  styleUrl: 'hellodash-label-color-picker.css',
  shadow: true,
})
export class HelloDashLabelColorPicker {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop

  /**
   * Color
   */
  @Prop({ reflect: true }) color: Color;

  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashLabelColorPickerColorChanged' }) colorChanged: EventEmitter<Color>;

  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Handles color picker color changed event
   * @param event
   */
  colorPicked(event: DashColorPickerCustomEvent<void>) {
    this.colorChanged.emit(event.target.color);
  }

  //#endregion

  render() {
    return <dash-color-picker colors={Colors} cols={3} color={this.color} onDashColorPickerColorChanged={this.colorPicked.bind(this)}></dash-color-picker>;
  }
}
