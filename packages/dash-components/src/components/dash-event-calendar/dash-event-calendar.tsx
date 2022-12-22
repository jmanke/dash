import { Component, Host, h, State, Watch } from '@stencil/core';
import { DateTime, Info } from 'luxon';

interface Event {
  name: string;
  fromTime: string;
  toTime: string;
}

interface Day {
  day: number;
  month: number;
  events?: Event[];
}

@Component({
  tag: 'dash-event-calendar',
  styleUrl: 'dash-event-calendar.css',
  shadow: true,
})
export class DashEventCalendar {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State
  @State()
  weeks: Day[][] = [];

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
        day: currDate.day,
        month: currDate.month,
      };
      if (i === 15) {
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
              <dash-icon-button icon='chevron-left' rounded onClick={this.prevMonth.bind(this)}></dash-icon-button>
              <dash-icon-button icon='chevron-right' rounded onClick={this.nextMonth.bind(this)}></dash-icon-button>
            </span>
          </div>
          <div class='container' style={{ 'grid-template-rows': `0fr repeat(${this.weeks.length}, 1fr)` }}>
            {Info.weekdays('short').map(d => (
              <span class='week-day-cell'>{d}</span>
            ))}
            {this.weeks.map(week =>
              week.map(day => (
                <div class={`day-cell ${this.date.month === day.month ? undefined : 'faded'}`}>
                  {day.day}
                  {day.events && (
                    <dash-list selectionMode='none' scale='s'>
                      {day.events.map(event => (
                        <dash-list-item>
                          <span class='event-name'>{event.name}</span>
                        </dash-list-item>
                      ))}
                    </dash-list>
                  )}
                </div>
              )),
            )}
          </div>
        </div>
      </Host>
    );
  }
}
