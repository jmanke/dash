import { DateTime } from 'luxon';

export interface CalendarEvent {
  name: string;
  fromTime: DateTime;
  toTime: DateTime;
}
