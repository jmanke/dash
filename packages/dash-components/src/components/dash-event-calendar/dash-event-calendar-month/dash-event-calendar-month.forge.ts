import { html } from 'lit-html';
import { DateTime } from 'luxon';

const date = DateTime.fromObject({ year: 2022, month: 12, day: 22 });
const events = [
  {
    name: 'Walk Hazel',
    fromTime: DateTime.fromISO(date.toISO()).set({ hour: 7, minute: 30 }),
    toTime: DateTime.fromISO(date.toISO()).set({ hour: 11 }),
  },
  {
    name: 'Brush Hazel',
    fromTime: DateTime.fromISO(date.toISO()).set({ hour: 5, minute: 30 }),
    toTime: DateTime.fromISO(date.toISO()).set({ hour: 8 }),
  },
  {
    name: 'Pet Hazel',
    fromTime: DateTime.fromISO(date.toISO()).set({ hour: 8, minute: 30 }),
    toTime: DateTime.fromISO(date.toISO()).set({ hour: 9, minute: 30 }),
  },
  {
    name: 'Pet Hazel more',
    fromTime: DateTime.fromISO(date.toISO()).set({ hour: 11, minute: 0 }),
    toTime: DateTime.fromISO(date.toISO()).set({ hour: 15, minute: 30 }),
  },
  {
    name: 'Feed Hazel',
    fromTime: DateTime.fromISO(date.toISO()).set({ hour: 8, minute: 15 }),
    toTime: DateTime.fromISO(date.toISO()).set({ hour: 9, minute: 45 }),
  },
];

const template = (args, updateArg) =>
  html`<dash-event-calendar-month
    style="width: 95vw; height: 95vh"
    .events=${args.events}
    @dashEventCalendarRequestEvents=${() => {
      updateArg('events', events);
    }}
  ></dash-event-calendar-month>`;

export const eventCalendarMonthDefinition = {
  name: '<dash-event-calendar-month>',
  controls: {
    events: {
      type: 'json',
    },
  },
  template,
  args: {
    events: [],
  },
};

export default eventCalendarMonthDefinition;
