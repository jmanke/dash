import { Component, Host, h, State, Watch, Prop, Event, EventEmitter } from '@stencil/core';
import { CalendarEventInternal, CalendarEvent } from '../../../interfaces/calendar-event';
import { addDuration, isSameDay, minusDuration, startOfDay, startOfMonth, toLocaleString, weekdays, weeksInMonth } from '../../../utils/date-time';
import { EventDropdown } from '../event-dropdown/event-dropdown';

export interface Day {
  date: Date;
  events?: CalendarEventInternal[];
}

@Component({
  tag: 'dash-event-calendar-month',
  styleUrl: 'dash-event-calendar-month.css',
  shadow: true,
})
export class DashEventCalendarMonth {
  //#region Own properties
  today: Date;
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  weeks: Day[][] = [];

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
    this._date = startOfMonth(new Date(this.date));
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
  eventCalendarPrevMonth: EventEmitter<void>;

  @Event({ eventName: 'dashEventCalendarNextMonth' })
  eventCalendarNextMonth: EventEmitter<void>;

  @Event({ eventName: 'dashEventCalendarEditEvent' })
  eventCalendarEditEvent: EventEmitter<{ eventId: string }>;

  @Event({ eventName: 'dashEventCalendarDeleteEvent' })
  eventCalendarDeleteEvent: EventEmitter<{ eventId: string }>;
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.today = startOfDay(new Date());
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
        fromTime: new Date(e.fromTime),
        toTime: new Date(e.toTime),
      })) || [];
  }

  async updateCalendar() {
    const date = this._date;
    this.weeks = weeksInMonth(date).map((week, i) =>
      week.map((d, j) => {
        return {
          date: d,
          events: i === 2 && j === 3 ? this._events : undefined,
        };
      }),
    );
  }

  prevMonth() {
    this.date = minusDuration(this._date, { months: 1 }).toISOString();
    this.eventCalendarPrevMonth.emit();
  }

  nextMonth() {
    this.date = addDuration(this._date, { months: 1 }).toISOString();
    this.eventCalendarPrevMonth.emit();
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
  //#endregion

  render() {
    return (
      <Host>
        {this._date && (
          <div class='calendar'>
            <div class='header'>
              <h3 class='title'>{toLocaleString(this._date, { month: 'long', year: 'numeric' })}</h3>

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
                  <div class={`day-cell ${this._date.getMonth() === weekday.date.getMonth() ? undefined : 'faded'}`}>
                    <dash-button class='day-number' scale='s' appearance={isSameDay(this.today, weekday.date) ? 'outline' : 'clear'}>
                      {weekday.date.getDate()}
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
              onEdit={this.editEvent.bind(this)}
              onDelete={this.deleteEvent.bind(this)}
            ></EventDropdown>
          </div>
        )}
      </Host>
    );
  }
}
