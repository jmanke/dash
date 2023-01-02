import { Component, Host, h, State, Watch, Prop, Event, EventEmitter } from '@stencil/core';
import { dateKey, eventsDateMap } from '../../../common/event-calendar';
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
  dayCellResizeObserver: ResizeObserver;
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

  @State()
  selectedEventGroup: {
    element: HTMLElement;
    events: CalendarEventInternal[];
  };

  @State()
  maxEventsPerCell: number;
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
    const events = eventsDateMap(this._events);
    const sortEvents = (events: CalendarEventInternal[]) => {
      if (events?.length) {
        events.sort((a, b) => a.fromTime.getTime() - b.fromTime.getTime());
      }
      return events;
    };

    this.weeks = weeksInMonth(date).map(week =>
      week.map(d => {
        return {
          date: d,
          events: sortEvents(events.get(dateKey(d))),
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

  updateSelectedEventGroup(events: CalendarEventInternal[], { currentTarget }) {
    this.selectedEventGroup = {
      element: currentTarget,
      events,
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

  DAY_CELL_OFFSET_HEIGHT = 29;
  EVENT_HEIGHT = 20;
  setDayCell(e: HTMLElement) {
    this.dayCellResizeObserver?.disconnect();
    const observer = new ResizeObserver(() => {
      let maxEventsPerCell = Math.floor((e.clientHeight - this.DAY_CELL_OFFSET_HEIGHT) / this.EVENT_HEIGHT);
      this.maxEventsPerCell = maxEventsPerCell === 0 ? 1 : maxEventsPerCell;
    });
    observer.observe(e);
    this.dayCellResizeObserver = observer;
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
              {this.weeks.map((week, i) =>
                week.map((weekday, j) => (
                  <div ref={e => i === 0 && j === 0 && this.setDayCell(e)} class={`day-cell ${this._date.getMonth() === weekday.date.getMonth() ? '' : 'faded'}`}>
                    <dash-button class='day-number' scale='s' appearance={isSameDay(this.today, weekday.date) ? 'outline' : 'clear'}>
                      {weekday.date.getDate()}
                    </dash-button>
                    {weekday.events && (
                      <dash-list selectionMode='none' scale='s'>
                        {weekday.events.map((event, i) => {
                          if (i < this.maxEventsPerCell - 1 || weekday.events.length === this.maxEventsPerCell) {
                            return (
                              <dash-list-item onDashListItemSelectedChanged={this.updateSelectedEvent.bind(this, event)}>
                                <div class='item-wrapper'>
                                  <span class='event-dot'></span>
                                  <span class='event-name'>{event.name}</span>
                                </div>
                              </dash-list-item>
                            );
                          } else if (i === this.maxEventsPerCell - 1) {
                            return (
                              <dash-list-item onDashListItemSelectedChanged={this.updateSelectedEventGroup.bind(this, weekday.events.slice(i))}>
                                <div class='item-wrapper'>
                                  <span class='event-name'>{`${weekday.events.length - this.maxEventsPerCell + 1} ${i > 1 ? 'more' : ''} events`}</span>
                                </div>
                              </dash-list-item>
                            );
                          }
                        })}
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

            <dash-popover
              target={this.selectedEventGroup?.element}
              active={!!this.selectedEventGroup}
              placement='right-start'
              stayInView
              autoClose
              onDashPopoverClose={() => (this.selectedEventGroup = null)}
            >
              <dash-list class='events-dropdown' selectionMode='none' scale='s'>
                {this.selectedEventGroup?.events.map(e => (
                  <dash-list-item
                    onDashListItemSelectedChanged={() => {
                      this.updateSelectedEvent(e, { currentTarget: this.selectedEventGroup.element });
                      this.selectedEventGroup = null;
                    }}
                  >
                    <div class='item-wrapper'>
                      <span class='event-dot'></span>
                      <span class='event-name'>{e.name}</span>
                    </div>
                  </dash-list-item>
                ))}
              </dash-list>
            </dash-popover>
          </div>
        )}
      </Host>
    );
  }
}
