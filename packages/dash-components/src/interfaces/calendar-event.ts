export interface CalendarEventInternal {
  id: string;
  name: string;
  description?: string;
  fromTime: Date;
  toTime: Date;
}

export interface CalendarEvent {
  id: string;
  name: string;
  description?: string;
  fromTime: string;
  toTime: string;
}
