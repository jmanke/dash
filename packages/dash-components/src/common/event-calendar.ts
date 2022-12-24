import { DateTime } from 'luxon';
import { CalendarEvent } from '../interfaces/calendar-event';
import { EventLayout } from '../interfaces/event-layout';

interface EventProccessingData {
  event: CalendarEvent;
  column: number;
  right: number;
}

export class EventCalendar {
  private readonly CELL_HEIGHT: number;
  private readonly HOUR_PX_RATIO: number;

  constructor(cellHeight: number) {
    this.CELL_HEIGHT = cellHeight;
    this.HOUR_PX_RATIO = this.CELL_HEIGHT / 60;
  }

  processEventLayouts(events: CalendarEvent[] = []): EventLayout[] {
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
      const columns: EventProccessingData[] = [];
      const group: EventProccessingData[] = [];

      while (columns.length === 0 || (columns.some(column => !!column) && startEndTimes.length)) {
        const curr = startEndTimes.pop();

        if (curr.isStart) {
          // find available column
          let index = columns.findIndex(column => column === null);
          const eventProcessingData: EventProccessingData = { event: curr.event, column: index, right: -1 };
          if (index === -1) {
            index = columns.length;
            eventProcessingData.column = index;
            columns.push(eventProcessingData);
          } else {
            columns[index] = eventProcessingData;
          }

          // update any value to the left of this value
          for (let i = index - 1; i >= 0; i--) {
            if (columns[i]) {
              columns[i].right = index;
              break;
            }
          }

          // update right to the next non-empty column
          for (let i = index + 1; i < columns.length; i++) {
            if (columns[i]) {
              columns[index].right = i;
              break;
            }
          }
        } else {
          // remove from column
          const index = columns.findIndex(column => column?.event === curr.event);
          const value = columns[index];
          group.push(value);
          columns[index] = null;
        }
      }

      // compute layout for each event
      const numColumns = columns.length;
      const layouts: EventLayout[] = group.map(v => {
        return {
          event: v.event,
          top: this.eventTopPosition(v.event),
          height: this.eventHeight(v.event),
          left: this.eventLeft(v.column, numColumns),
          width: this.eventWidth(v.column, v.right, numColumns),
        };
      });

      eventLayouts = [...eventLayouts, ...layouts];
    }

    return eventLayouts;
  }

  private eventTopPosition(event: CalendarEvent) {
    const top = event.fromTime.hour * this.CELL_HEIGHT + event.fromTime.minute * this.HOUR_PX_RATIO;

    return `${top}px`;
  }

  private eventHeight(event: CalendarEvent) {
    const from = event.fromTime.hour * 60 + event.fromTime.minute;
    const to = event.toTime.hour * 60 + event.toTime.minute;
    const height = (to - from) * this.HOUR_PX_RATIO;

    return `${height - 1}px`;
  }

  private eventLeft(column: number, numnumColumns: number) {
    return `${(column / numnumColumns) * 100}%`;
  }

  private eventWidth(column: number, right: number, numColumns: number) {
    if (right === -1) {
      right = numColumns;
    }
    return `${((right - column) / numColumns) * 100}%`;
  }
}
