import { Component, Host, h, State, Watch, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { DateTime } from 'luxon';
import { EventCalendar } from '../../../common/event-calendar';
import { CalendarEventInternal, CalendarEvent } from '../../../interfaces/calendar-event';
import { EventLayout } from '../../../interfaces/event-layout';
import { EventButton } from '../event-button/event-button';
import { EventDropdown } from '../event-dropdown/event-dropdown';
import { TimeBar } from '../time-bar/time-bar';

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
  @Element()
  element: HTMLDashEventCalendarDayElement;
  //#endregion

  //#region @State
  @State()
  day: Day;

  @State()
  _date: DateTime;
  @Watch('_date')
  _dateChanged() {
    this.updateCalendar();
  }

  @State()
  _events: CalendarEventInternal[] = [];
  @Watch('_events')
  _eventsChanged() {
    this.updateCalendar();
  }

  @State()
  selectedEvent: {
    element: HTMLElement;
    event: CalendarEventInternal;
  };
  //#endregion

  //#region @Prop
  @Prop()
  date: string;
  @Watch('date')
  dateChanged() {
    if (!this.date) {
      this._date = null;
    }

    this._date = DateTime.fromISO(this.date).startOf('day');
  }

  @Prop()
  events: CalendarEvent[] = [];
  @Watch('events')
  eventsChanged() {
    this.updateEvents();
    this.updateCalendar();
  }
  //#endregion

  //#region @Event
  @Event({ eventName: 'dashEventCalendarPrevDay' })
  eventCalendarPrevDay: EventEmitter<string>;

  @Event({ eventName: 'dashEventCalendarNextDay' })
  eventCalendarNextDay: EventEmitter<string>;
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
    this.dateChanged();
    this.updateEvents();
  }

  componentDidLoad() {
    const content = this.element.shadowRoot.querySelector('.day');
    content.scrollTo(0, this.timeBarTop());
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  updateEvents() {
    this._events =
      this.events?.map(e => ({
        ...e,
        fromTime: DateTime.fromISO(e.fromTime),
        toTime: DateTime.fromISO(e.toTime),
      })) || [];
  }

  async updateCalendar() {
    if (!this._date) {
      return;
    }

    const date = this._date;
    const day: Day = {
      date,
    };

    const events = this._events;
    day.eventLayouts = this.eventCalendar.processEventLayouts(events);
    this.day = day;
  }

  prevDay() {
    this.eventCalendarPrevDay.emit(this._date.minus({ days: 1 }).toISO());
  }

  nextDay() {
    this.eventCalendarNextDay.emit(this._date.plus({ days: 1 }).toISO());
  }

  updateSelectedEvent(event: CalendarEventInternal, { target }) {
    this.selectedEvent = {
      element: target,
      event,
    };
  }

  closeEventPopover() {
    this.selectedEvent = null;
  }

  timeBarTop() {
    const now = DateTime.now();
    return (now.hour + now.minute / 60) * HOUR_CELL_HEIGHT;
  }

  //#endregion

  render() {
    return (
      <Host>
        {this._date && (
          <div class='calendar'>
            <div class='header'>
              <h3 class='title'>{this._date.toLocaleString({ month: 'long', weekday: 'long', day: 'numeric', year: 'numeric' })}</h3>

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
                {this.day?.date.equals(this.today) && <TimeBar top={this.timeBarTop()}></TimeBar>}
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
        )}
      </Host>
    );
  }
}
