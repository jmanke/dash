import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { CalendarEvent, CalendarEventInternal } from '../../../interfaces/calendar-event';
import { setTimeISO8601 } from '../../../utils/date-time';

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

  @State()
  isDirty: boolean;
  //#endregion

  //#region @Prop
  @Prop({
    mutable: true,
  })
  event: CalendarEvent | CalendarEventInternal;
  @Watch('event')
  eventChanged() {
    const event: CalendarEvent | CalendarEventInternal = { ...this.event };

    // ensure event is in CalendarEvent format
    if (event.fromTime instanceof Date) {
      event.fromTime = event.fromTime.toISOString();
    }
    if (event.toTime instanceof Date) {
      event.toTime = event.toTime.toISOString();
    }

    this._event = event as CalendarEvent;
  }
  //#endregion

  //#region @Event
  @Event({ eventName: 'dashEventCalendarEditEventEventUpdate' })
  eventCalendarEditEventEventUpdate: EventEmitter<void>;

  @Event({ eventName: 'dashEventCalendarEditEventEventCancel' })
  eventCalendarEditEventEventCancel: EventEmitter<void>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.eventChanged();
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  updateEvent(property: string, value: string) {
    this.isDirty = true;
    this._event = { ...this._event, [property]: value };
  }

  updateDate(property: string, value: string) {
    const date = setTimeISO8601(value, this._event[property]);
    this.updateEvent(property, date);
  }

  saveEvent() {
    this.isDirty = false;
    const event: any = { ...this._event };

    // ensure event is in correct format
    if (this.event.fromTime instanceof Date) {
      event.fromTime = new Date(event.fromTime);
    }
    if (this.event.toTime instanceof Date) {
      event.toTime = new Date(event.toTime);
    }

    this.event = event;
    this.eventCalendarEditEventEventUpdate.emit();
  }

  //#endregion
  render() {
    return (
      <Host>
        {this._event && (
          <div class='dash-event-calendar-edit-event'>
            <dash-label>
              Event name
              <dash-input value={this._event.name} onDashInputInput={e => this.updateEvent('name', e.target.value)}></dash-input>
            </dash-label>

            <dash-label>
              Description
              <dash-textarea value={this._event.description} resize='none' rows={6} onDashTextareaInput={e => this.updateEvent('description', e.target.value)}></dash-textarea>
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

            <div class='footer'>
              <dash-button onClick={() => this.eventCalendarEditEventEventCancel.emit()}>Cancel</dash-button>
              <dash-button disabled={!this.isDirty} onClick={this.saveEvent.bind(this)}>
                Save
              </dash-button>
            </div>
          </div>
        )}
      </Host>
    );
  }
}
