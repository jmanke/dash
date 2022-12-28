import { html } from 'lit-html';
import { DateTime } from 'luxon';

const day = DateTime.now();

const template = (args, updateArg) =>
  html`<dash-event-calendar-day
    style="width: 95vw; height: 95vh"
    date=${args.date}
    .events=${args.dailyEvents}
    @dashEventCalendarPrevDay=${e => updateArg('date', e.detail)}
    @dashEventCalendarNextDay=${e => updateArg('date', e.detail)}
    @dashEventCalendarEditEvent=${e => console.log('edit event:', e.detail)}
    @dashEventCalendarDeleteEvent=${e => console.log('delete event:', e.detail)}
  ></dash-event-calendar-day>`;

export const eventCalendarDayDefinition = {
  name: '<dash-event-calendar-day>',
  controls: {
    date: {
      type: 'text',
    },
    dailyEvents: {
      type: 'json',
    },
  },
  template,
  args: {
    date: day.toISO(),
    what: 'what',
    dailyEvents: [
      {
        id: '0',
        name: 'Walk Hazel',
        description: 'Hazel  a walk all the time because she is greedy and too cute to say no to.',
        fromTime: DateTime.fromISO(day.toISO()).set({ hour: 7, minute: 30 }),
        toTime: DateTime.fromISO(day.toISO()).set({ hour: 11 }),
      },
      {
        id: '1',
        name: 'Brush Hazel',
        fromTime: DateTime.fromISO(day.toISO()).set({ hour: 5, minute: 30 }),
        toTime: DateTime.fromISO(day.toISO()).set({ hour: 8 }),
      },
      {
        id: '2',
        name: 'Pet Hazel',
        fromTime: DateTime.fromISO(day.toISO()).set({ hour: 8, minute: 30 }),
        toTime: DateTime.fromISO(day.toISO()).set({ hour: 8, minute: 35 }),
      },
      {
        id: '3',
        name: 'Greenie for Hazel',
        fromTime: DateTime.fromISO(day.toISO()).set({ hour: 8, minute: 40 }),
        toTime: DateTime.fromISO(day.toISO()).set({ hour: 9, minute: 0 }),
      },
      {
        id: '4',
        name: 'Pet Hazel more',
        fromTime: DateTime.fromISO(day.toISO()).set({ hour: 11, minute: 0 }),
        toTime: DateTime.fromISO(day.toISO()).set({ hour: 15, minute: 0 }),
      },
      {
        id: '5',
        name: 'Feed Hazel',
        fromTime: DateTime.fromISO(day.toISO()).set({ hour: 8, minute: 15 }),
        toTime: DateTime.fromISO(day.toISO()).set({ hour: 9, minute: 45 }),
      },
    ],
  },
};

export default eventCalendarDayDefinition;
