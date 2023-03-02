import { DashColorPickerCustomEvent } from '@didyoumeantoast/dash-components';
import { State, Watch } from '@didyoumeantoast/dash-components/dist/types/stencil-public-runtime';
import { Label } from '@didyoumeantoast/hellodash-models';
import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

const DefaultColors = ['#af6566', '#af815a', '#a7954e', '#50a559', '#7379b1', '#906098'];

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

  @State() defaultColors: Set<string> = new Set(DefaultColors);

  //#endregion

  //#region @Prop

  /**
   * Color as hex value
   */
  @Prop({ reflect: true }) color: string;

  @Prop() allLabels: Label[] = [];
  @Watch('allLabels')
  allLabelsChanged(allLabels: Label[] = []) {
    this.defaultColors = new Set([...DefaultColors, ...allLabels.map(l => l.color)]);
  }

  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashLabelColorPickerColorChanged' }) colorChanged: EventEmitter<string>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.allLabelsChanged(this.allLabels);
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
    this.currentColor = event.target.hex;
  }

  confirmColor() {
    this.colorChanged.emit(this.currentColor);
  }

  cancel() {
    this.colorChanged.emit(this.color);
  }

  //#endregion

  render() {
    return (
      <Host>
        <dash-color-picker defaultColors={Array.from(this.defaultColors)} color={this.currentColor} onDashColorPickerColorChanged={this.colorPicked.bind(this)}></dash-color-picker>

        <div class='footer'>
          <dash-button onClick={this.confirmColor.bind(this)}>Confirm</dash-button>
          <dash-button onClick={this.cancel.bind(this)}>Cancel</dash-button>
        </div>
      </Host>
    );
  }
}
