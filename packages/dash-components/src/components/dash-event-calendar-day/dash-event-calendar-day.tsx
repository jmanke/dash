import { Component, Host, h, State, Watch } from '@stencil/core';
import { DateTime } from 'luxon';
import { EventCalendar } from '../../common/event-calendar';
import { EventLayout } from '../../interfaces/event-layout';

export interface Day {
  date: DateTime;
  eventLayouts?: EventLayout[];
}

const HOUR_CELL_HEIGHT = 40;

@Component({
  tag: 'dash-event-calendar-day',
  styleUrl: 'dash-event-calendar-day.css',
  shadow: true,
})
export class DashEventCalendarDay {
  //#region Own properties
  today: DateTime;
  hours: string[];
  eventCalendar = new EventCalendar(HOUR_CELL_HEIGHT);
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

  updateCalendar() {
    const date = this.date;
    const day: Day = {
      date,
    };

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
    this.day = day;
  }

  prevDay() {
    this.date = this.date.minus({ days: 1 });
  }

  nextDay() {
    this.date = this.date.plus({ days: 1 });
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
              {this.day.eventLayouts &&
                this.day.eventLayouts.map(layout => (
                  <div class='event-container' style={{ top: layout.top, height: layout.height, left: layout.left, width: layout.width }}>
                    <dash-button class='event'>
                      <div class='event-content'>{layout.event.name}</div>
                    </dash-button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
