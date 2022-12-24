import { DateTime } from 'luxon';
import { CalendarEvent } from './calendar-event';

export interface EventLayout {
  event: CalendarEvent;
  top: string;
  height: string;
  left: string;
  width: string;
}

export interface Day {
  date: DateTime;
  events?: CalendarEvent[];
  eventLayouts?: EventLayout[];
}
