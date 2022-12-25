import { DateTime } from 'luxon';

export interface CalendarEventInternal {
  name: string;
  description?: string;
  fromTime: DateTime;
  toTime: DateTime;
}

export interface CalendarEvent {
  name: string;
  description?: string;
  fromTime: string;
  toTime: string;
}
