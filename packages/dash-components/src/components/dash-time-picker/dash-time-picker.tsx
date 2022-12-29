import { Component, Host, h, State, Prop, Watch } from '@stencil/core';
import { addMinutes, amPmFormat, isValidAmPmTimeString, startOfDay } from '../../utils/date/date-time';

const START_OF_DAY = startOfDay(new Date());
const TIMES = [...Array(48)].map((_, i) => amPmFormat(addMinutes(START_OF_DAY, i * 30)));

@Component({
  tag: 'dash-time-picker',
  styleUrl: 'dash-time-picker.css',
  shadow: true,
})
export class DashTimePicker {
  //#region Own properties
  inputElement: HTMLDashInputElement;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  _time: string;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
  })
  time: string;
  @Watch('time')
  timeChanged() {
    this._time = isValidAmPmTimeString(this.time) ? this.time : undefined;
  }
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.timeChanged();
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  inputChanged(e: CustomEvent<string>) {
    this.updateTime(e.detail);
  }

  updateTime(time: string) {
    const isValid = isValidAmPmTimeString(time);

    if (!isValid) {
      this.inputElement.value = this.time;
      return;
    }

    this._time = time;
  }
  //#endregion

  render() {
    return (
      <Host>
        <dash-dropdown autoClose autoFocus={false}>
          <dash-input ref={e => (this.inputElement = e)} slot='dropdown-trigger' value={this._time} onDashInputChange={this.inputChanged.bind(this)}></dash-input>

          <dash-list class='dropdown-content' selectionMode='none'>
            {TIMES.map(time => (
              <dash-list-item>{time}</dash-list-item>
            ))}
          </dash-list>
        </dash-dropdown>
      </Host>
    );
  }
}
