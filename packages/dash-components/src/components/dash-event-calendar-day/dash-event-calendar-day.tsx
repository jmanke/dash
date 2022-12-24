import { Component, Host, h, State, Watch } from '@stencil/core';
import { DateTime } from 'luxon';
import { CalendarEvent } from '../../interfaces/calendar-event';
import { Day, EventLayout } from '../../interfaces/day';

interface EventProccessingData {
  event: CalendarEvent;
  track: number;
  right: number;
}

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

  eventLeft(track: number, numTracks: number) {
    return `${(track / numTracks) * 100}%`;
  }

  eventWidth(track: number, right: number, numTracks: number) {
    if (right === -1) {
      right = numTracks;
    }
    return `${((right - track) / numTracks) * 100}%`;
  }

  processEvents(events: CalendarEvent[] = []) {
    if (!events || events.length === 0) {
      return null;
    }

    // startEndTimes stores the start and end times to push/pop events for the layout algorithm
    const startEndTimes: { time: DateTime; event: CalendarEvent; isStart: boolean }[] = [];
    events.forEach(e => {
      startEndTimes.push({ time: e.fromTime, event: e, isStart: true });
      startEndTimes.push({ time: e.toTime, event: e, isStart: false });
    });
    startEndTimes.sort((a, b) => b.time.toMillis() - a.time.toMillis() || Number(b.isStart) - Number(a.isStart));

    let eventLayouts: EventLayout[] = [];
    while (startEndTimes.length) {
      const tracks: EventProccessingData[] = [];
      const group: EventProccessingData[] = [];

      while (tracks.length === 0 || (tracks.some(track => !!track) && startEndTimes.length)) {
        const curr = startEndTimes.pop();

        if (curr.isStart) {
          // find available track
          let index = tracks.findIndex(track => track === null);
          const eventProcessingData: EventProccessingData = { event: curr.event, track: index, right: -1 };
          if (index === -1) {
            index = tracks.length;
            eventProcessingData.track = index;
            tracks.push(eventProcessingData);
          } else {
            tracks[index] = eventProcessingData;
          }

          // update any value to the left of this value
          for (let i = index - 1; i >= 0; i--) {
            if (tracks[i]) {
              tracks[i].right = index;
              break;
            }
          }

          // update right to the next non-empty track
          for (let i = index + 1; i < tracks.length; i++) {
            if (tracks[i]) {
              tracks[index].right = i;
              break;
            }
          }
        } else {
          // remove from track
          const index = tracks.findIndex(track => track?.event === curr.event);
          const value = tracks[index];
          group.push(value);
          tracks[index] = null;
        }
      }

      console.log(group);
      // compute layout for each event
      const numTracks = tracks.length;
      const layouts: EventLayout[] = group.map(v => {
        return {
          event: v.event,
          top: this.eventTopPosition(v.event),
          height: this.eventHeight(v.event),
          left: this.eventLeft(v.track, numTracks),
          width: this.eventWidth(v.track, v.right, numTracks),
        };
      });

      eventLayouts = [...eventLayouts, ...layouts];
    }

    console.log(eventLayouts);
    return eventLayouts;
  }

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
    day.eventLayouts = this.processEvents(events);
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
