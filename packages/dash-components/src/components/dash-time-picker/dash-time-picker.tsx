import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { DashInputCustomEvent } from '../../components';
import { addDuration, amPmFormat, timeParts, startOfDay } from '../../utils/date/date-time';

const START_OF_DAY = startOfDay(new Date());
const TIMES = [...Array(48)].map((_, i) => amPmFormat(addDuration(START_OF_DAY, { minutes: i * 30 })));

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
  @State()
  _time: Date;
  //#endregion

  //#region @Prop
  @Prop({
    reflect: true,
    mutable: true,
  })
  time: string = startOfDay(new Date()).toISOString();
  @Watch('time')
  timeChanged(time: string) {
    this._time = new Date(time);
  }
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashTimePickerTimeChange',
  })
  timePickerTimeChange: EventEmitter<void>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.timeChanged(this.time);
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  inputChanged(e: DashInputCustomEvent<void>) {
    this.selectTime(e.target.value, false);
  }

  updateTime(time: Date) {
    this.time = time.toISOString();
    this.timePickerTimeChange.emit();
  }

  selectTime(time: string, closeDropdown = true) {
    const partsInfo = timeParts(time);
    if (!partsInfo.valid) {
      this.inputElement.value = amPmFormat(this._time);
      return;
    }

    const day = startOfDay(this._time);
    const minutes = partsInfo.parts.hour * 60 + partsInfo.parts.minute;
    this.updateTime(addDuration(day, { minutes }));
    if (closeDropdown) {
      this.dropdownElement.close();
    }
  }
  //#endregion

  render() {
    return (
      <Host>
        <dash-dropdown ref={e => (this.dropdownElement = e)} autoClose autoFocus={false}>
          <dash-input ref={e => (this.inputElement = e)} slot='dropdown-trigger' value={amPmFormat(this._time)} onDashInputChange={this.inputChanged.bind(this)}></dash-input>

          <dash-list selectionMode='none'>
            {TIMES.map(time => (
              <dash-list-item onDashListItemSelectedChanged={() => this.selectTime(time)}>{time}</dash-list-item>
            ))}
          </dash-list>
        </dash-dropdown>
      </Host>
    );
  }
}
