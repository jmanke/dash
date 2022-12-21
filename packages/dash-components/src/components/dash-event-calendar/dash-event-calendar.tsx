import { Component, Host, h, State } from '@stencil/core';
import { DateTime } from 'luxon';

const WEEKDAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const MONTH = 'December';
const YEAR = '2022';

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
  weeks: number[][] = [];
  //#endregion

  //#region @Prop
  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle
  componentWillLoad() {
    this.updateMonth(12, 2022);
  }
  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  updateMonth(month: number, year: number) {
    const monthDt = DateTime.fromObject({ year, month });
    const daysInMonth = monthDt.daysInMonth;

    // map startDay from Mon - Sun to Sun - Sat
    let startDay = monthDt.startOf('month').weekday + 1;
    if (startDay === 8) {
      startDay = 1;
    }

    // calculate number of weeks
    const numWeeks = Math.ceil((daysInMonth + (startDay - 1)) / 7);
    // pre-populate array of weeks with null values
    const weeks = Array.from(Array(numWeeks), () => new Array(7).fill(null));
    // starting day always 1
    let day = 1;

    for (let i = startDay - 1; day <= daysInMonth; i++) {
      const weekNum = Math.floor(i / 7);
      weeks[weekNum][i % 7] = day++;
    }

    this.weeks = weeks;
  }

  //#endregion

  render() {
    return (
      <Host>
        <div class='calendar'>
          <div class='header'>
            <h3 class='title'>
              {MONTH} {YEAR}
            </h3>

            
          </div>
          <table class='container'>
            <tr>
              {WEEKDAYS.map(d => (
                <th>{d}</th>
              ))}
            </tr>
            {this.weeks.map(week => (
              <tr>
                {week.map(day => (
                  <td>{day}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </Host>
    );
  }
}
