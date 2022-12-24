import { Component, Host, h, State, Watch } from '@stencil/core';
import { DateTime } from 'luxon';
import { EventCalendar } from '../../../common/event-calendar';
import { CalendarEvent } from '../../../interfaces/calendar-event';
import { EventLayout } from '../../../interfaces/event-layout';
import { EventButton } from '../event-button/event-button';
import { EventDropdown } from '../event-dropdown/event-dropdown';

export interface Day {
  date: DateTime;
  eventLayouts?: EventLayout[];
}

const HOUR_CELL_HEIGHT = 40;
const MIN_EVENT_HEIGHT = 10;

@Component({
  tag: 'dash-event-calendar-day',
  styleUrl: 'dash-event-calendar-day.css',
  shadow: true,
})
export class DashEventCalendarDay {
  //#region Own properties
  today: DateTime;
  hours: string[];
  eventCalendar = new EventCalendar(HOUR_CELL_HEIGHT, MIN_EVENT_HEIGHT);
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

  @State()
  selectedEvent: {
    element: HTMLElement;
    event: CalendarEvent;
  };
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

    const events: CalendarEvent[] = [
      {
        name: 'Walk Hazel',
        description: 'Hazel needs a walk all the time because she is greedy and too cute to say no to.',
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
        toTime: DateTime.fromISO(date.toISO()).set({ hour: 8, minute: 35 }),
      },
      {
        name: 'Greenie for Hazel jk ;lj l; ;',
        fromTime: DateTime.fromISO(date.toISO()).set({ hour: 8, minute: 40 }),
        toTime: DateTime.fromISO(date.toISO()).set({ hour: 9, minute: 0 }),
      },
      {
        name: 'Pet Hazel more',
        fromTime: DateTime.fromISO(date.toISO()).set({ hour: 11, minute: 0 }),
        toTime: DateTime.fromISO(date.toISO()).set({ hour: 15, minute: 0 }),
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
                this.day.eventLayouts.map(layout => <EventButton layout={layout} onClick={this.updateSelectedEvent.bind(this, layout.event)}></EventButton>)}
            </div>
          </div>

          <EventDropdown
            target={this.selectedEvent?.element}
            event={this.selectedEvent?.event}
            active={!!this.selectedEvent}
            onClose={this.closeEventPopover.bind(this)}
          ></EventDropdown>
        </div>
      </Host>
    );
  }
}