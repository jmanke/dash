import { Component, Host, h, State, Watch, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { dateKey, eventsDateMap, processEventLayouts } from '../../../common/event-calendar';
import { CalendarEventInternal, CalendarEvent } from '../../../interfaces/calendar-event';
import { EventLayout } from '../../../interfaces/event-layout';
import { addDuration, formatDate, isSameDay, minusDuration, startOfDay, startOfWeek, toLocaleString } from '../../../utils/date-time';
import { EventButton } from '../event-button/event-button';
import { EventDropdown } from '../event-dropdown/event-dropdown';
import { TimeBar } from '../time-bar/time-bar';

export interface Day {
  date: Date;
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
  intervalId: number;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashEventCalendarWeekElement;
  //#endregion

  //#region @State
  @State()
  now: Date;

  @State()
  timeBarTop = 0;

  @State()
  weekdays: Day[] = [];

  @State()
  _date: Date;
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

    this._date = startOfWeek(new Date(this.date));
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
  eventCalendarPrevWeek: EventEmitter<void>;

  @Event({ eventName: 'dashEventCalendarNextWeek' })
  eventCalendarNextWeek: EventEmitter<void>;

  @Event({ eventName: 'dashEventCalendarEditEvent' })
  eventCalendarEditEvent: EventEmitter<{ eventId: string }>;

  @Event({ eventName: 'dashEventCalendarDeleteEvent' })
  eventCalendarDeleteEvent: EventEmitter<{ eventId: string }>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    // generate hours
    const hours = [];
    const dayStart = startOfDay(new Date());
    for (let i = 1; i < 24; i++) {
      const time = addDuration(dayStart, { minutes: i * 60 });
      hours.push(formatDate(time, 'h a'));
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
        fromTime: new Date(e.fromTime),
        toTime: new Date(e.toTime),
      })) || [];
  }

  async updateCalendar() {
    if (!this._date) {
      return;
    }

    const weekdays = [];
    let date = this._date;
    const events = eventsDateMap(this._events);

    for (let i = 0; i < 7; i++) {
      const day: Day = {
        date,
      };

      const dailyEvents = events.get(dateKey(date));
      if (dailyEvents?.length) {
        day.eventLayouts = processEventLayouts(dailyEvents, HOUR_CELL_HEIGHT, MIN_EVENT_HEIGHT, HOUR_CELL_HEIGHT);
      }

      weekdays.push(day);
      date = addDuration(date, { days: 1 });
    }

    this.weekdays = weekdays;
  }

  prevWeek() {
    this.date = minusDuration(this._date, { weeks: 1 }).toISOString();
    this.eventCalendarPrevWeek.emit();
  }

  nextWeek() {
    this.date = addDuration(this._date, { weeks: 1 }).toISOString();
    this.eventCalendarPrevWeek.emit();
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
    const now = new Date();
    this.now = now;
    this.timeBarTop = (now.getHours() + 1 + now.getMinutes() / 60) * HOUR_CELL_HEIGHT;
  }
  //#endregion

  render() {
    return (
      <Host>
        {this._date && (
          <div class='calendar'>
            <div class='header'>
              <h3 class='title'>{toLocaleString(this._date, { month: 'long', year: 'numeric' })}</h3>

              <span>
                <dash-icon-button icon='chevron-left' rounded onClick={this.prevWeek.bind(this)}></dash-icon-button>
                <dash-icon-button icon='chevron-right' rounded onClick={this.nextWeek.bind(this)}></dash-icon-button>
              </span>
            </div>

            <div class='weekdays-header'>
              <div class='weekdays-start-spacer'></div>
              {this.weekdays.map(day => (
                <div class='weekday-header'>
                  {toLocaleString(day.date, { weekday: 'short' })}
                  <div class={`week-day-cell ${isSameDay(day.date, this.now) ? 'today' : ''}`}>{day.date.getDate()}</div>
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
                    {day.eventLayouts &&
                      day.eventLayouts.map(layout => <EventButton layout={layout} scale='s' onClick={this.updateSelectedEvent.bind(this, layout.event)}></EventButton>)}
                    {isSameDay(day.date, this.now) && <TimeBar top={this.timeBarTop}></TimeBar>}
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
