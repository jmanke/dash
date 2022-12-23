import { DateTime } from 'luxon';
import { CalendarEvent } from './calendar-event';

export interface Day {
  date: DateTime;
  events?: CalendarEvent[];
}
