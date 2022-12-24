import { DateTime } from 'luxon';

export interface CalendarEvent {
  name: string;
  description?: string;
  fromTime: DateTime;
  toTime: DateTime;
}
