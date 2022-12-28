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
  tag: 'dash-event-calendar-week',
  styleUrl: 'dash-event-calendar-week.css',
  shadow: true,
})
export class DashEventCalendarWeek {
  //#region Own properties
  hours: string[];
  eventCalendar = new EventCalendar(HOUR_CELL_HEIGHT, MIN_EVENT_HEIGHT, HOUR_CELL_HEIGHT);
  intervalId: number;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashEventCalendarWeekElement;
  //#endregion

  //#region @State
  @State()
  now: DateTime;

  @State()
  timeBarTop = 0;

  @State()
  weekdays: Day[] = [];

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

    const date = DateTime.fromISO(this.date).startOf('day');
    // want start of the week to be Sunday, luxon has it on Monday
    this._date = date.weekday === 7 ? date : date.startOf('week').minus({ days: 1 });
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
  @Event({ eventName: 'dashEventCalendarPrevWeek' })
  eventCalendarPrevWeek: EventEmitter<string>;

  @Event({ eventName: 'dashEventCalendarNextWeek' })
  eventCalendarNextWeek: EventEmitter<string>;

  @Event({ eventName: 'dashEventCalendarEditEvent' })
  eventCalendarEditEvent: EventEmitter<{ eventId: string }>;

  @Event({ eventName: 'dashEventCalendarDeleteEvent' })
  eventCalendarDeleteEvent: EventEmitter<{ eventId: string }>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    // generate hours
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const time = DateTime.fromObject({ hour: i });
      hours.push(time.toFormat('h a'));
    }
    this.hours = hours;
    this.updateEvents();
    this.dateChanged();
  }

  componentDidLoad() {
    const content = this.element.shadowRoot.querySelector('.weekdays-content');
    content.scrollTo(0, this.timeBarTop - content.clientHeight / 2);
  }

  connectedCallback() {
    this.updateNow();
    this.intervalId = setInterval(() => {
      this.updateNow();
    }, 60 * 1000);
  }

  disconnectedCallback() {
    clearInterval(this.intervalId);
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

    const weekdays = [];
    let date = this._date;
    for (let i = 0; i < 7; i++) {
      const day: Day = {
        date,
      };

      if (i === 1) {
        day.eventLayouts = this.eventCalendar.processEventLayouts(this._events);
      }

      weekdays.push(day);
      date = date.plus({ days: 1 });
    }

    this.weekdays = weekdays;
  }

  prevWeek() {
    this.eventCalendarPrevWeek.emit(this._date.minus({ weeks: 1 }).toISO());
  }

  nextWeek() {
    this.eventCalendarNextWeek.emit(this._date.plus({ weeks: 1, days: 1 }).toISO());
  }

  updateSelectedEvent(event: CalendarEventInternal, { currentTarget }) {
    this.selectedEvent = {
      element: currentTarget,
      event,
    };
  }

  closeEventPopover() {
    this.selectedEvent = null;
  }

  editEvent() {
    this.eventCalendarEditEvent.emit({ eventId: this.selectedEvent.event.id });
    this.closeEventPopover();
  }

  deleteEvent() {
    this.eventCalendarDeleteEvent.emit({ eventId: this.selectedEvent.event.id });
    this.closeEventPopover();
  }

  updateNow() {
    const now = DateTime.now();
    this.now = now;
    this.timeBarTop = (now.hour + 1 + now.minute / 60) * HOUR_CELL_HEIGHT;
  }
  //#endregion

  render() {
    return (
      <Host>
        {this._date && (
          <div class='calendar'>
            <div class='header'>
              <h3 class='title'>{this._date.toLocaleString({ month: 'long', year: 'numeric' })}</h3>

              <span>
                <dash-icon-button icon='chevron-left' rounded onClick={this.prevWeek.bind(this)}></dash-icon-button>
                <dash-icon-button icon='chevron-right' rounded onClick={this.nextWeek.bind(this)}></dash-icon-button>
              </span>
            </div>

            <div class='weekdays-header'>
              <div class='weekdays-start-spacer'></div>
              {this.weekdays.map(day => (
                <div class='weekday-header'>
                  {day.date.toLocaleString({ weekday: 'short' })}
                  <div class={`week-day-cell ${day.date.equals(this.now.startOf('day')) ? 'today' : ''}`}>{day.date.day}</div>
                </div>
              ))}
              <div class='weekdays-end-spacer'></div>
            </div>

            <div class='weekdays-content'>
              <div class='hours'>
                <div></div>
                {this.hours.map(hour => (
                  <div class='hour-cell'>
                    <span class='hour'>{hour}</span>
                  </div>
                ))}
              </div>

              <div class='week'>
                {this.weekdays.map(day => (
                  <div class='day-cell'>
                    {day.date.equals(this.now.startOf('day')) && <TimeBar top={this.timeBarTop}></TimeBar>}
                    {day.eventLayouts &&
                      day.eventLayouts.map(layout => <EventButton layout={layout} scale='s' onClick={this.updateSelectedEvent.bind(this, layout.event)}></EventButton>)}
                  </div>
                ))}
              </div>
            </div>

            <EventDropdown
              target={this.selectedEvent?.element}
              event={this.selectedEvent?.event}
              active={!!this.selectedEvent}
              onClose={this.closeEventPopover.bind(this)}
              onEdit={this.editEvent.bind(this)}
              onDelete={this.deleteEvent.bind(this)}
            ></EventDropdown>
          </div>
        )}
      </Host>
    );
  }
}
