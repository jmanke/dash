import { html } from 'lit-html';
import { DateTime } from 'luxon';

const day = DateTime.now();
const events = [
  {
    name: 'Walk Hazel',
    description: 'Hazel needs a walk all the time because she is greedy and too cute to say no to.',
    fromTime: DateTime.fromISO(day.toISO()).set({ hour: 7, minute: 30 }),
    toTime: DateTime.fromISO(day.toISO()).set({ hour: 11 }),
  },
  {
    name: 'Brush Hazel',
    fromTime: DateTime.fromISO(day.toISO()).set({ hour: 5, minute: 30 }),
    toTime: DateTime.fromISO(day.toISO()).set({ hour: 8 }),
  },
  {
    name: 'Pet Hazel',
    fromTime: DateTime.fromISO(day.toISO()).set({ hour: 8, minute: 30 }),
    toTime: DateTime.fromISO(day.toISO()).set({ hour: 8, minute: 35 }),
  },
  {
    name: 'Greenie for Hazel',
    fromTime: DateTime.fromISO(day.toISO()).set({ hour: 8, minute: 40 }),
    toTime: DateTime.fromISO(day.toISO()).set({ hour: 9, minute: 0 }),
  },
  {
    name: 'Pet Hazel more',
    fromTime: DateTime.fromISO(day.toISO()).set({ hour: 11, minute: 0 }),
    toTime: DateTime.fromISO(day.toISO()).set({ hour: 15, minute: 0 }),
  },
  {
    name: 'Feed Hazel',
    fromTime: DateTime.fromISO(day.toISO()).set({ hour: 8, minute: 15 }),
    toTime: DateTime.fromISO(day.toISO()).set({ hour: 9, minute: 45 }),
  },
];

const template = (args, updateArg) =>
  html`<dash-event-calendar-day
    style="width: 95vw; height: 95vh"
    .events=${args.events}
    @dashEventCalendarRequestEvents=${() => {
      updateArg('events', events);
    }}
  ></dash-event-calendar-day>`;

export const eventCalendarDayDefinition = {
  name: '<dash-event-calendar-day>',
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

export default eventCalendarDayDefinition;
