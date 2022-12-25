import { CalendarEventInternal } from './calendar-event';

export interface EventLayout {
  event: CalendarEventInternal;
  top: string;
  height: string;
  left: string;
  width: string;
}
