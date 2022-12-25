import { DateTime } from 'luxon';

export interface CalendarEvent {
  name: string;
  description?: string;
  fromTime: DateTime;
  toTime: DateTime;
}

export interface CalendarEventRaw {
  name: string;
  description?: string;
  fromTime: string;
  toTime: string;
}
