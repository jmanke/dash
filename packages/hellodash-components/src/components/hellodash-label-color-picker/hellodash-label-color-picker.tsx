import { DashColorPickerCustomEvent } from '@didyoumeantoast/dash-components';
import { State } from '@didyoumeantoast/dash-components/dist/types/stencil-public-runtime';
import { Component, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core';

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

  @State() currentColor: string;

  //#endregion

  //#region @Prop

  /**
   * Color as hex value
   */
  @Prop({ reflect: true }) color: string;
  @Watch('color')
  colorChanged(color: string) {
    this.currentColor = color;
  }

  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashLabelColorPickerColorChanged' }) pickerColorChanged: EventEmitter<string>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.currentColor = this.color;
  }

  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  /**
   * Handles color picker color changed event
   * @param event
   */
  colorPicked(event: DashColorPickerCustomEvent<void>) {
    this.currentColor = event.target.color;
  }

  confirmColor() {
    this.pickerColorChanged.emit(this.currentColor);
  }

  cancel() {
    this.pickerColorChanged.emit(this.color);
  }

  //#endregion

  render() {
    return (
      <Host>
        <dash-color-picker color={this.currentColor} onDashColorPickerColorChanged={this.colorPicked.bind(this)}></dash-color-picker>

        <div class='footer'>
          <dash-button appearance='outline' onClick={this.confirmColor.bind(this)}>
            <div>Done</div>
          </dash-button>
        </div>
      </Host>
    );
  }
}
