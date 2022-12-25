import { Component, Host, h, State, Watch, Prop, Event, EventEmitter } from '@stencil/core';
import { DateTime } from 'luxon';
import { CalendarEventInternal, CalendarEvent } from '../../../interfaces/calendar-event';
import { weekdays } from '../../../utils/date/week';
import { EventDropdown } from '../event-dropdown/event-dropdown';

export interface Day {
  date: DateTime;
  events?: CalendarEventInternal[];
}

@Component({
  tag: 'dash-event-calendar-month',
  styleUrl: 'dash-event-calendar-month.css',
  shadow: true,
})
export class DashEventCalendarMonth {
  //#region Own properties
  today: DateTime;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  weeks: Day[][] = [];

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
    this._date = DateTime.fromISO(this.date).startOf('month');
  }

  @Prop()
  events: CalendarEvent[] = [];
  @Watch('events')
  eventsChanged() {
    this.updateEvents();
  }
  //#endregion

  //#region @Event
  @Event({ eventName: 'dashEventCalendarPrevMonth' })
  eventCalendarPrevMonth: EventEmitter<string>;

  @Event({ eventName: 'dashEventCalendarNextMonth' })
  eventCalendarNextMonth: EventEmitter<string>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.today = DateTime.now().startOf('day');
    this.dateChanged();
    this.eventsChanged();
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
    const date = this._date;
    const daysInMonth = date.daysInMonth;

    // map startDay from Mon - Sun to Sun - Sat
    let startDay = date.startOf('month').weekday + 1;
    if (startDay === 8) {
      startDay = 1;
    }

    // calculate number of weeks
    const numWeeks = Math.ceil((daysInMonth + (startDay - 1)) / 7);
    // pre-populate array of weeks with null values
    const weeks = Array.from(Array(numWeeks), () => new Array(7).fill(null));
    // starting day always 1
    let currDate = date.minus({ days: startDay - 1 });

    // generate 2d array of days
    for (let i = 0; i < numWeeks * 7; i++) {
      const weekNum = Math.floor(i / 7);

      const day: Day = {
        date: currDate,
      };
      if (i === 15 && this.today.month === currDate.month) {
        day.events = this._events;
      }

      weeks[weekNum][i % 7] = day;
      currDate = currDate.plus({ days: 1 });
    }

    this.weeks = weeks;
  }

  prevMonth() {
    this.eventCalendarPrevMonth.emit(this._date.minus({ months: 1 }).toISO());
  }

  nextMonth() {
    this.eventCalendarPrevMonth.emit(this._date.plus({ months: 1 }).toISO());
  }

  createEventPopover() {
    return <dash-popover>Hello there</dash-popover>;
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
  //#endregion

  render() {
    return (
      <Host>
        {this._date && (
          <div class='calendar'>
            <div class='header'>
              <h3 class='title'>{this._date.toLocaleString({ month: 'long', year: 'numeric' })}</h3>

              <span>
                <dash-icon-button icon='chevron-left' rounded onClick={this.prevMonth.bind(this)}></dash-icon-button>
                <dash-icon-button icon='chevron-right' rounded onClick={this.nextMonth.bind(this)}></dash-icon-button>
              </span>
            </div>
            <div class='month' style={{ 'grid-template-rows': `0fr repeat(${this.weeks.length}, 1fr)` }}>
              {weekdays('short').map(d => (
                <span class='week-day-cell'>{d}</span>
              ))}
              {this.weeks.map(week =>
                week.map(weekday => (
                  <div class={`day-cell ${this._date.month === weekday.date.month ? undefined : 'faded'}`}>
                    <dash-button class='day-number' scale='s' appearance={this.today.equals(weekday.date) ? 'outline' : 'clear'}>
                      {weekday.date.day}
                    </dash-button>
                    {weekday.events && (
                      <dash-list selectionMode='none' scale='s'>
                        {weekday.events.map(event => (
                          <dash-list-item onDashListItemSelectedChanged={this.updateSelectedEvent.bind(this, event)}>
                            <div class='item-wrapper'>
                              <span class='event-dot'></span>
                              <span class='event-name'>{event.name}</span>
                            </div>
                          </dash-list-item>
                        ))}
                      </dash-list>
                    )}
                  </div>
                )),
              )}
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
