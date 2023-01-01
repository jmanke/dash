import { CalendarEventInternal } from '../interfaces/calendar-event';
import { EventLayout } from '../interfaces/event-layout';
import { addDuration } from '../utils/date-time';

interface EventProccessingData {
  event: CalendarEventInternal;
  column: number;
  right: number;
}

/**
 * Processes events into event layouts - prevents events from overlapping
 * @param events events to process
 * @param cellHeight height of the "hour" cell (ex. 1 hour = 40px high)
 * @param minHeight minimum height of an event layout
 * @param topOffset offset from the top
 * @returns Event layouts to be placed in a 24 hour column
 */
export function processEventLayouts(events: CalendarEventInternal[] = [], cellHeight: number, minHeight: number = 0, topOffset: number = 0): EventLayout[] {
  if (!events || events.length === 0) {
    return null;
  }

  const hourPxRatio = cellHeight / 60;

  const calculateEventHeight = (event: CalendarEventInternal) => {
    const from = event.fromTime.getHours() * 60 + event.fromTime.getMinutes();
    const to = event.toTime.getHours() * 60 + event.toTime.getMinutes();
    const height = (to - from) * hourPxRatio;

    return `${height - 1}px`;
  };

  // startEndTimes stores the start and end times to push/pop events for the layout algorithm
  const startEndTimes: { time: Date; event: CalendarEventInternal; isStart: boolean }[] = [];
  events.forEach(e => {
    startEndTimes.push({ time: e.fromTime, event: e, isStart: true });

    const eventHeight = calculateEventHeight(e);
    // Since the events can have a minimum height, we must account for it in this step.
    // Sets the to-time to the min-event-height (translated into minutes).
    if (Number.parseInt(eventHeight, 10) < minHeight) {
      startEndTimes.push({ time: addDuration(e.fromTime, { minutes: (1 / hourPxRatio) * minHeight }), event: e, isStart: false });
      return;
    }
    startEndTimes.push({ time: e.toTime, event: e, isStart: false });
  });
  startEndTimes.sort((a, b) => b.time.getTime() - a.time.getTime() || Number(b.isStart) - Number(a.isStart));

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
        top: `${v.event.fromTime.getHours() * cellHeight + v.event.fromTime.getMinutes() * hourPxRatio + topOffset}px`,
        height: calculateEventHeight(v.event),
        left: `${(v.column / numColumns) * 100}%`,
        width: `${(((v.right === -1 ? numColumns : v.right) - v.column) / numColumns) * 100}%`,
      };
    });

    eventLayouts = [...eventLayouts, ...layouts];
  }

  return eventLayouts;
}

/**
 * Converts a date into a unique key (unqiue up to a day's date)
 * @param date date object
 * @returns string key
 */
export function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/**
 * Maps events to
 * @param events events to map
 * @returns Map of events separated by day (ex. each day can have an array of events)
 */
export function eventsDateMap(events: CalendarEventInternal[]) {
  const eventMap = events.reduce((map: Map<string, CalendarEventInternal[]>, event: CalendarEventInternal) => {
    const key = dateKey(event.fromTime);
    const events = map.get(key);
    if (!events) {
      map.set(key, [event]);
    } else {
      events.push(event);
    }

    return map;
  }, new Map<string, CalendarEventInternal[]>());

  return eventMap;
}
