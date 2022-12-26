import { DateTime } from 'luxon';

export interface CalendarEventInternal {
  id: string;
  name: string;
  description?: string;
  fromTime: DateTime;
  toTime: DateTime;
}

export interface CalendarEvent {
  id: string;
  name: string;
  description?: string;
  fromTime: string;
  toTime: string;
}
