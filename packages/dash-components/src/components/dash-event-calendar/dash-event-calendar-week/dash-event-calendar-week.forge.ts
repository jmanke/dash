import { html } from 'lit-html';
import { DateTime } from 'luxon';

const date = DateTime.now().startOf('week').plus({ days: 1 });
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
  html`<dash-event-calendar-week
    style="width: 95vw; height: 95vh"
    .events=${args.events}
    @dashEventCalendarRequestEvents=${() => {
      updateArg('events', events);
    }}
  ></dash-event-calendar-week>`;

export const eventCalendarWeekDefinition = {
  name: '<dash-event-calendar-week>',
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

export default eventCalendarWeekDefinition;
