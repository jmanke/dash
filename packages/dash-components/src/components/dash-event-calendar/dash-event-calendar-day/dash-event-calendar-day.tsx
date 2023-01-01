import { Component, Host, h, State, Watch, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { EventCalendar } from '../../../common/event-calendar';
import { CalendarEventInternal, CalendarEvent } from '../../../interfaces/calendar-event';
import { EventLayout } from '../../../interfaces/event-layout';
import { addDuration, formatDate, isSameDay, minusDuration, startOfDay, toLocaleString } from '../../../utils/date-time';
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
  tag: 'dash-event-calendar-day',
  styleUrl: 'dash-event-calendar-day.css',
  shadow: true,
})
export class DashEventCalendarDay {
  //#region Own properties
  hours: string[];
  eventCalendar = new EventCalendar(HOUR_CELL_HEIGHT, MIN_EVENT_HEIGHT);
  intervalId: number;
  //#endregion

  //#region @Element
  @Element()
  element: HTMLDashEventCalendarDayElement;
  //#endregion

  //#region @State
  @State()
  now: Date;

  @State()
  timeBarTop = 0;

  @State()
  day: Day;

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

    this._date = startOfDay(new Date(this.date));
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
  eventCalendarPrevDay: EventEmitter<void>;

  @Event({ eventName: 'dashEventCalendarNextDay' })
  eventCalendarNextDay: EventEmitter<void>;

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
    this.dateChanged();
    this.updateEvents();
  }

  componentDidLoad() {
    const content = this.element.shadowRoot.querySelector('.day');
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

    const date = this._date;
    const day: Day = {
      date,
    };

    const events = isSameDay(this._date, this.now) ? this._events : undefined;
    day.eventLayouts = this.eventCalendar.processEventLayouts(events);
    this.day = day;
  }

  prevDay() {
    this.date = minusDuration(this._date, { days: 1 }).toISOString();
    this.eventCalendarPrevDay.emit();
  }

  nextDay() {
    this.date = addDuration(this._date, { days: 1 }).toISOString();
    this.eventCalendarPrevDay.emit();
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
    this.timeBarTop = (now.getHours() + now.getMinutes() / 60) * HOUR_CELL_HEIGHT;
  }

  //#endregion

  render() {
    return (
      <Host>
        {this._date && (
          <div class='calendar'>
            <div class='header'>
              <h3 class='title'>{toLocaleString(this._date, { month: 'long', weekday: 'long', day: 'numeric', year: 'numeric' })}</h3>

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
                {isSameDay(this.day.date, this.now) && <TimeBar top={this.timeBarTop}></TimeBar>}
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
