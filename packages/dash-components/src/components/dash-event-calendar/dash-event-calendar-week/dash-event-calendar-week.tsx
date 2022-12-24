import { Component, Host, h, State, Watch } from '@stencil/core';
import { DateTime } from 'luxon';
import { EventCalendar } from '../../../common/event-calendar';
import { EventLayout } from '../../../interfaces/event-layout';
import { EventButton } from '../event-button/event-button';

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
  today: DateTime;
  hours: string[];
  eventCalendar = new EventCalendar(HOUR_CELL_HEIGHT, MIN_EVENT_HEIGHT, HOUR_CELL_HEIGHT);
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
  updateCalendar() {
    this.weekdays = [];
    let date = this.date;
    for (let i = 0; i < 7; i++) {
      const day: Day = {
        date,
      };

      if (i === 1) {
        const events = [
          {
            name: 'Walk Hazel',
            fromTime: DateTime.fromISO(date.toISO()).set({ hour: 7, minute: 30 }),
            toTime: DateTime.fromISO(date.toISO()).set({ hour: 11 }),
          },
          {
            name: 'Brush Hazel',
            fromTime: DateTime.fromISO(date.toISO()).set({ hour: 5, minute: 30 }),
            toTime: DateTime.fromISO(date.toISO()).set({ hour: 8 }),
          },
          {
            name: 'Pet Hazel',
            fromTime: DateTime.fromISO(date.toISO()).set({ hour: 8, minute: 30 }),
            toTime: DateTime.fromISO(date.toISO()).set({ hour: 9, minute: 30 }),
          },
          {
            name: 'Pet Hazel more',
            fromTime: DateTime.fromISO(date.toISO()).set({ hour: 11, minute: 0 }),
            toTime: DateTime.fromISO(date.toISO()).set({ hour: 15, minute: 30 }),
          },
          {
            name: 'Feed Hazel',
            fromTime: DateTime.fromISO(date.toISO()).set({ hour: 8, minute: 15 }),
            toTime: DateTime.fromISO(date.toISO()).set({ hour: 9, minute: 45 }),
          },
        ];

        day.eventLayouts = this.eventCalendar.processEventLayouts(events);
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
  //#endregion

  render() {
    return (
      <Host>
        <div class='calendar'>
          <div class='header'>
            <h3 class='title'>{this.date.toLocaleString({ month: 'long', year: 'numeric' })}</h3>

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
                <div class={`week-day-cell ${day.date.equals(this.today) ? 'today' : ''}`}>{day.date.day}</div>
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
                <div class='day-cell'>{day.eventLayouts && day.eventLayouts.map(layout => <EventButton layout={layout} scale='s'></EventButton>)}</div>
              ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
