import { Component, Host, h, State, Watch } from '@stencil/core';
import { DateTime } from 'luxon';
import { CalendarEvent } from '../../../interfaces/calendar-event';
import { weekdays } from '../../../utils/date/week';

export interface Day {
  date: DateTime;
  events?: CalendarEvent[];
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
  selectedEvent: {
    element: HTMLElement;
    event: CalendarEvent;
  };

  @State()
  date: DateTime;
  @Watch('date')
  dateChanged() {
    this.updateCalendar();
  }
  //#endregion

  //#region @Prop
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.today = DateTime.now().startOf('day');
    this.date = DateTime.fromObject({ year: 2022, month: 12 });
    this.updateCalendar();
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  updateCalendar() {
    const date = this.date;
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
        day.events = [
          { name: 'Build calendar', fromTime: null, toTime: null },
          { name: 'Test', fromTime: null, toTime: null },
          { name: 'Hello there', fromTime: null, toTime: null },
          { name: 'Why', fromTime: null, toTime: null },
        ];
      }

      weeks[weekNum][i % 7] = day;
      currDate = currDate.plus({ days: 1 });
    }

    this.weeks = weeks;
  }

  prevMonth() {
    this.date = this.date.minus({ months: 1 });
  }

  nextMonth() {
    this.date = this.date.plus({ months: 1 });
  }

  createEventPopover() {
    return <dash-popover>Hello there</dash-popover>;
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
            <h3 class='title'>{this.date.toLocaleString({ month: 'long', year: 'numeric' })}</h3>

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
                <div class={`day-cell ${this.date.month === weekday.date.month ? undefined : 'faded'}`}>
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

          <dash-popover target={this.selectedEvent?.element} active={!!this.selectedEvent} autoClose={true} onDashPopoverClose={this.closeEventPopover.bind(this)}>
            <div class='event-popover'>
              <div class='event-popover-header'>
                {this.selectedEvent?.event.name} <dash-icon-button icon='x' onClick={this.closeEventPopover.bind(this)}></dash-icon-button>
              </div>
            </div>
          </dash-popover>
        </div>
      </Host>
    );
  }
}
