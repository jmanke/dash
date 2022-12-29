import { deepCopy } from '@didyoumeantoast/dash-utils';
import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { DateTime } from 'luxon';
import { CalendarEvent } from '../../../interfaces/calendar-event';

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

  updateTime(property: string, value: string) {
    const date = DateTime.fromJSDate(new Date(value));
    this.updateEvent(property, date.toISO());
  }

  //#endregion
  render() {
    return (
      <Host>
        <div>
          <dash-label>
            Event name
            <dash-input value={this._event.name} onDashInputInput={({ detail }) => this.updateEvent('name', detail)}></dash-input>
          </dash-label>

          <dash-label>
            Description
            <dash-textarea resize='vertical' value={this._event.description} onDashTextareaInput={({ detail }) => this.updateEvent('description', detail)}></dash-textarea>
          </dash-label>

          <dash-label>
            From
            <dash-input type='datetime-local' onDashInputInput={({ detail }) => this.updateTime('fromTime', detail)}></dash-input>
          </dash-label>

          <dash-label>
            To
            <dash-input type='datetime-local'></dash-input>
          </dash-label>
        </div>
      </Host>
    );
  }
}
