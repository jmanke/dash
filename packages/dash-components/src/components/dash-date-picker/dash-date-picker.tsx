import { spaceConcat } from '@didyoumeantoast/dash-utils';
import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { DashInputCustomEvent } from '../../components';
import { toLocaleString, isSameDay, prevMonth as _prevMonth, nextMonth as _nextMonth, dateIsValid, startOfMinute, weekdays, weeksInMonth } from '../../utils/date-time';

@Component({
  tag: 'dash-date-picker',
  styleUrl: 'dash-date-picker.css',
  shadow: true,
})
export class DashDatePicker {
  //#region Own properties
  today: Date;
  dropdownElement: HTMLDashDropdownElement;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  weeks: Date[][];

  @State()
  calendarDate: Date;
  @Watch('calendarDate')
  calendarDateChanged(curr: number, prev: number) {
    if (curr === prev) {
      return;
    }

    this.weeks = weeksInMonth(this.calendarDate);
  }
  //#endregion

  //#region @Prop
  @Prop({
    mutable: true,
  })
  date: string = new Date().toISOString();
  @Watch('date')
  dateChanged(date: string) {
    if (!date) {
      return;
    }

    this.calendarDate = new Date(date);
    this.today = new Date();
  }

  /**
   * Close the date picker dropdown when a date is selected
   */
  @Prop({
    reflect: true,
  })
  closeOnSelect: boolean = true;

  /**
   * format of date picker label
   */
  @Prop({
    reflect: true,
  })
  format: Intl.DateTimeFormatOptions = { month: 'long', weekday: 'long', day: 'numeric' };
  //#endregion

  //#region @Event
  @Event({
    eventName: 'dashDatePickerDateChange',
  })
  datePickerDateChange: EventEmitter<void>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.dateChanged(this.date);
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  prevMonth() {
    this.calendarDate = _prevMonth(this.calendarDate);
  }

  nextMonth() {
    this.calendarDate = _nextMonth(this.calendarDate);
  }

  daySelected(date: Date) {
    this.date = date.toISOString();
    this.datePickerDateChange.emit();

    if (this.closeOnSelect) {
      this.dropdownElement.close();
    }
  }

  inputChange(e: DashInputCustomEvent<void>) {
    const newDate = new Date(e.target.value);
    if (dateIsValid(newDate)) {
      this.date = startOfMinute(newDate).toISOString();
    }

    e.target.value = toLocaleString(this.calendarDate, this.format);
  }
  //#endregion
  render() {
    const dateObj = new Date(this.date);

    return (
      <Host>
        <dash-dropdown ref={e => (this.dropdownElement = e)} autoClose autoFocus={false}>
          <dash-input slot='dropdown-trigger' value={toLocaleString(this.calendarDate, this.format)} onDashInputChange={this.inputChange.bind(this)}></dash-input>

          <div class='calendar' style={{ 'grid-template-rows': `0fr repeat(${this.weeks.length}, 1fr)` }}>
            <div class='header'>
              <h3 class='title'>{toLocaleString(this.calendarDate, { month: 'long', year: 'numeric' })}</h3>

              <span>
                <dash-icon-button icon='chevron-left' rounded onClick={this.prevMonth.bind(this)}></dash-icon-button>
                <dash-icon-button icon='chevron-right' rounded onClick={this.nextMonth.bind(this)}></dash-icon-button>
              </span>
            </div>

            <div class='month'>
              {weekdays('narrow').map(d => (
                <span class='week-day-cell'>{d}</span>
              ))}
              {this.weeks.map(week =>
                week.map(day => (
                  <div class='day-cell'>
                    <dash-button
                      class={spaceConcat('day-number', isSameDay(dateObj, day) ? 'selected' : null)}
                      scale='s'
                      appearance={isSameDay(this.today, day) ? 'outline' : 'clear'}
                      onClick={() => this.daySelected(day)}
                    >
                      <div class={`day-number ${this.calendarDate.getMonth() === day.getMonth() ? '' : 'faded'}`}>{day.toLocaleString('en-us', { day: 'numeric' })}</div>
                    </dash-button>
                  </div>
                )),
              )}
            </div>
          </div>
        </dash-dropdown>
      </Host>
    );
  }
}
