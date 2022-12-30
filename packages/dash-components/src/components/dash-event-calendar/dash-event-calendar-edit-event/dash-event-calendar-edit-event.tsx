import { deepCopy } from '@didyoumeantoast/dash-utils';
import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { CalendarEvent } from '../../../interfaces/calendar-event';
import { setTimeISO8601 } from '../../../utils/date/date-time';

@Component({
  tag: 'dash-event-calendar-edit-event',
  styleUrl: 'dash-event-calendar-edit-event.css',
  shadow: true,
})
export class DashEventCalendarEditEvent {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  _event: CalendarEvent;
  //#endregion

  //#region @Prop
  @Prop()
  event: CalendarEvent;
  @Watch('event')
  eventChanged() {
    this._event = deepCopy(this.event);
  }
  //#endregion

  //#region @Event
  @Event({ eventName: 'dashEventCalendarEditEventEventUpdate' })
  eventCalendarEditEventEventUpdate: EventEmitter<CalendarEvent>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this._event = this.event;
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  updateEvent(property: string, value: string) {
    this._event = { ...this._event, [property]: value };
    this.eventCalendarEditEventEventUpdate.emit(this._event);
  }

  updateDate(property: string, value: string) {
    const date = setTimeISO8601(value, this._event[property]);
    this.updateEvent(property, date);
  }

  //#endregion
  render() {
    return (
      <Host>
        {this._event && (
          <div>
            <dash-label>
              Event name
              <dash-input value={this._event.name} onDashInputInput={e => this.updateEvent('name', e.target.value)}></dash-input>
            </dash-label>

            <dash-label>
              Description
              <dash-textarea resize='vertical' value={this._event.description} onDashTextareaInput={e => this.updateEvent('description', e.target.value)}></dash-textarea>
            </dash-label>

            <dash-label>
              From
              <div class='date-picker-container'>
                <dash-date-picker date={this._event.fromTime} onDashDatePickerDateChange={e => this.updateDate('fromTime', e.target.date)}></dash-date-picker>
                <dash-time-picker time={this._event.fromTime} onDashTimePickerTimeChange={e => this.updateEvent('fromTime', e.target.time)}></dash-time-picker>
              </div>
            </dash-label>

            <dash-label>
              To
              <div class='date-picker-container'>
                <dash-date-picker date={this._event.toTime} onDashDatePickerDateChange={e => this.updateDate('toTime', e.target.date)}></dash-date-picker>
                <dash-time-picker time={this._event.toTime} onDashTimePickerTimeChange={e => this.updateEvent('toTime', e.target.time)}></dash-time-picker>
              </div>
            </dash-label>
          </div>
        )}
      </Host>
    );
  }
}
