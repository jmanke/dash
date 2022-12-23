import { Component, Host, h, State, Watch } from '@stencil/core';
import { DateTime } from 'luxon';
import { CalendarEvent } from '../../interfaces/calendar-event';
import { Day } from '../../interfaces/day';

interface CalendarEventGroupRenderer {
  event: CalendarEvent;
  track: number;
}

const HOUR_CELL_HEIGHT = 40;
const HOUR_PX_RATIO = HOUR_CELL_HEIGHT / 60;

@Component({
  tag: 'dash-event-calendar-week',
  styleUrl: 'dash-event-calendar-week.css',
  shadow: true,
})
export class DashEventCalendarWeek {
  //#region Own properties
  today: DateTime;
  hours: string[];
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  date: DateTime;
  @Watch('date')
  dateChanged() {
    this.updateCalendar();
  }

  @State()
  weekdays: Day[];
  //#endregion

  //#region @Prop
  //#endregion

  //#region @Event
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

    this.today = DateTime.now().startOf('day');
    this.date = DateTime.now().startOf('week').minus({ days: 1 });
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods
  processEvents(events: CalendarEvent[]) {
    const startEndTimes: { time: DateTime; isStart: boolean; event: CalendarEvent }[] = [];
    events.forEach(e => {
      startEndTimes.push({ time: e.fromTime, isStart: true, event: e });
      startEndTimes.push({ time: e.toTime, isStart: false, event: e });
    });
    startEndTimes.sort((a, b) => a.time.toMillis() - b.time.toMillis());  

    const calendarEventGroups: CalendarEventGroupRenderer[] = [];
    // need to find the "groups" which have overlapping times

    const currEvents = [];

    return calendarEventGroups;
  }

  updateCalendar() {
    this.weekdays = [];
    let date = this.date;
    for (let i = 0; i < 7; i++) {
      const day: Day = {
        date,
      };

      if (i === 1) {
        day.events = [
          {
            name: 'Walk Hazel',
            fromTime: DateTime.fromISO(date.toISO()).set({ hour: 7, minute: 30 }),
            toTime: DateTime.fromISO(date.toISO()).set({ hour: 10 }),
          },
          {
            name: 'Brush Hazel',
            fromTime: DateTime.fromISO(date.toISO()).set({ hour: 5, minute: 30 }),
            toTime: DateTime.fromISO(date.toISO()).set({ hour: 8 }),
          },
        ];
        this.processEvents(day.events);
      }

      this.weekdays.push(day);
      date = date.plus({ days: 1 });
    }
  }

  prevWeek() {
    this.date = this.date.minus({ weeks: 1 });
  }

  nextWeek() {
    this.date = this.date.plus({ weeks: 1 });
  }

  eventTopPosition(event: CalendarEvent) {
    const top = (event.fromTime.hour + 1) * HOUR_CELL_HEIGHT + event.fromTime.minute * HOUR_PX_RATIO;

    return `${top}px`;
  }

  eventHeight(event: CalendarEvent) {
    const from = event.fromTime.hour * 60 + event.fromTime.minute;
    const to = event.toTime.hour * 60 + event.toTime.minute;
    const height = (to - from) * HOUR_PX_RATIO;

    return `${height - 1}px`;
  }

  //#endregion

  render() {
    return (
      <Host>
        <div class='calendar'>
          <div class='header'>
            <h3 class='title'>
              {this.date.toLocaleString({ month: 'long' })} {this.date.year}
            </h3>

            <span>
              <dash-icon-button icon='chevron-left' rounded onClick={this.prevWeek.bind(this)}></dash-icon-button>
              <dash-icon-button icon='chevron-right' rounded onClick={this.nextWeek.bind(this)}></dash-icon-button>
            </span>
          </div>

          <div class='weekdays'>
            <div class='weekdays-start-spacer'></div>
            {this.weekdays.map(day => (
              <div class='weekday-header'>
                {day.date.toLocaleString({ weekday: 'short' })}
                <div class={`week-day-cell ${day.date.equals(this.today) ? 'today' : ''}`}>{day.date.day}</div>
              </div>
            ))}
            <div class='weekdays-end-spacer'></div>
          </div>

          <div class='container'>
            <div class='hours-container'>
              <div class='hour'></div>
              {this.hours.map(hour => (
                <div class='hour-cell'>
                  <span class='hour'>{hour}</span>
                </div>
              ))}
            </div>

            <div class='week-container'>
              {this.weekdays.map(day => (
                <div class='day-cell'>
                  {day.events &&
                    day.events.map(e => (
                      <dash-button class='event' style={{ top: this.eventTopPosition(e), height: this.eventHeight(e) }}>
                        <div class='event-content'>{e.name}</div>
                      </dash-button>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
