import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { DashInputCustomEvent } from '../../components';
import { addMinutes, amPmFormat, isValid12HourFormat, startOfDay } from '../../utils/date/date-time';

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
  dropdownElement: HTMLDashDropdownElement;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
    mutable: true,
  })
  time: string;
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashTimePickerTimeChange',
  })
  timePickerTimeChange: EventEmitter<void>;
  //#endregion

  //#region Component lifecycle
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  inputChanged(e: DashInputCustomEvent<void>) {
    this.updateTime(e.target.value);
  }

  updateTime(time: string) {
    if (time === this.time) {
      return;
    }

    const isValid = isValid12HourFormat(time);

    if (!isValid) {
      this.inputElement.value = this.time;
      return;
    }

    this.time = time;
    this.timePickerTimeChange.emit();
  }

  selectTime(time: string) {
    this.updateTime(time);
    this.dropdownElement.close();
  }
  //#endregion

  render() {
    return (
      <Host>
        <dash-dropdown ref={e => (this.dropdownElement = e)} autoClose autoFocus={false}>
          <dash-input ref={e => (this.inputElement = e)} slot='dropdown-trigger' value={this.time} onDashInputChange={this.inputChanged.bind(this)}></dash-input>

          <dash-list class='dropdown-content' selectionMode='none'>
            {TIMES.map(time => (
              <dash-list-item onDashListItemSelectedChanged={() => this.selectTime(time)}>{time}</dash-list-item>
            ))}
          </dash-list>
        </dash-dropdown>
      </Host>
    );
  }
}
