import { Component, Host, h, State, Watch, Prop, Event, EventEmitter } from '@stencil/core';
import { DateTime } from 'luxon';
import { EventCalendar } from '../../../common/event-calendar';
import { CalendarEvent, CalendarEventRaw } from '../../../interfaces/calendar-event';
import { EventLayout } from '../../../interfaces/event-layout';
import { EventButton } from '../event-button/event-button';
import { EventDropdown } from '../event-dropdown/event-dropdown';

export interface RequestEvents {
  date: string;
}

export interface Day {
  date: DateTime;
  eventLayouts?: EventLayout[];
}

const HOUR_CELL_HEIGHT = 40;
const MIN_EVENT_HEIGHT = 10;

@Component({
  tag: 'dash-event-calendar-day',
  styleUrl: 'dash-event-calendar-day.css',
  shadow: true,
})
export class DashEventCalendarDay {
  //#region Own properties
  today: DateTime;
  hours: string[];
  eventCalendar = new EventCalendar(HOUR_CELL_HEIGHT, MIN_EVENT_HEIGHT);
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  day: Day;

  @State()
  _events: CalendarEvent[] = [];

  @State()
  date: DateTime;
  @Watch('date')
  dateChanged() {
    console.log('emit');
    this.eventCalendarRequestEvents.emit({ date: DateTime.now().toISO() });
  }

  @State()
  selectedEvent: {
    element: HTMLElement;
    event: CalendarEvent;
  };
  //#endregion

  //#region @Prop
  @Prop()
  events: CalendarEventRaw[] = [];
  @Watch('events')
  eventsChanged() {
    this.updateEvents();
    this.updateCalendar();
  }
  //#endregion

  //#region @Event
  @Event({ eventName: 'dashEventCalendarRequestEvents' })
  eventCalendarRequestEvents: EventEmitter<RequestEvents>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    // generate hours
    const hours = [];
    for (let i = 1; i < 24; i++) {
      const time = DateTime.fromObject({ hour: i });
      hours.push(time.toFormat('h a'));
    }
    this.hours = hours;
    this.today = DateTime.now().startOf('day');
    this.date = this.today;
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  updateEvents() {
    this._events = this.events?.map(e => ({
      ...e,
      fromTime: DateTime.fromISO(e.fromTime),
      toTime: DateTime.fromISO(e.toTime),
    })) || [];
  }

  async updateCalendar() {
    const date = this.date;
    const day: Day = {
      date,
    };

    const events = this._events;
    day.eventLayouts = this.eventCalendar.processEventLayouts(events);
    this.day = day;
  }

  prevDay() {
    this.date = this.date.minus({ days: 1 });
  }

  nextDay() {
    this.date = this.date.plus({ days: 1 });
  }

  updateSelectedEvent(event: CalendarEvent, { target }) {
    this.selectedEvent = {
      element: target,
      event,
    };
  }

  closeEventPopover() {
    this.selectedEvent = null;
  }
  //#endregion

  render() {
    return (
      <Host>
        <div class='calendar'>
          <div class='header'>
            <h3 class='title'>{this.date.toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}</h3>

            <span>
              <dash-icon-button icon='chevron-left' rounded onClick={this.prevDay.bind(this)}></dash-icon-button>
              <dash-icon-button icon='chevron-right' rounded onClick={this.nextDay.bind(this)}></dash-icon-button>
            </span>
          </div>

          <div class='day'>
            <div class='hours'>
              <div></div>
              {this.hours.map(hour => (
                <div class='hour-cell'>
                  <span class='hour'>{hour}</span>
                </div>
              ))}
            </div>

            <div class='day-cell'>
              {this.day?.eventLayouts &&
                this.day.eventLayouts.map(layout => <EventButton layout={layout} onClick={this.updateSelectedEvent.bind(this, layout.event)}></EventButton>)}
            </div>
          </div>

          <EventDropdown
            target={this.selectedEvent?.element}
            event={this.selectedEvent?.event}
            active={!!this.selectedEvent}
            onClose={this.closeEventPopover.bind(this)}
          ></EventDropdown>
        </div>
      </Host>
    );
  }
}
