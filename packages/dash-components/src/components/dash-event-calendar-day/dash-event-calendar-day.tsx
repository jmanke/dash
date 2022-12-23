import { Component, Host, h, State, Watch } from '@stencil/core';
import { DateTime } from 'luxon';
import { CalendarEvent } from '../../interfaces/calendar-event';
import { Day } from '../../interfaces/day';

const HOUR_CELL_HEIGHT = 40;
const HOUR_PX_RATIO = HOUR_CELL_HEIGHT / 60;

@Component({
  tag: 'dash-event-calendar-day',
  styleUrl: 'dash-event-calendar-day.css',
  shadow: true,
})
export class DashEventCalendarDay {
  //#region Own properties
  today: DateTime;
  hours: string[];
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  day: Day;

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
  processEvents(events: CalendarEvent[]) {
    return events;
  }

  updateCalendar() {
    const date = this.date;
    const day: Day = {
      date,
    };
    this.day = day;

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

  prevDay() {
    this.date = this.date.minus({ days: 1 });
  }

  nextDay() {
    this.date = this.date.plus({ days: 1 });
  }

  eventTopPosition(event: CalendarEvent) {
    const top = event.fromTime.hour * HOUR_CELL_HEIGHT + event.fromTime.minute * HOUR_PX_RATIO;

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
              {this.day.events &&
                this.day.events.map(e => (
                  <dash-button class='event' style={{ top: this.eventTopPosition(e), height: this.eventHeight(e) }}>
                    <div class='event-content'>{e.name}</div>
                  </dash-button>
                ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
