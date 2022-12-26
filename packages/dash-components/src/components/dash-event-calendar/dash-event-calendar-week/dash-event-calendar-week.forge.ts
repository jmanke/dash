import { html } from 'lit-html';
import { DateTime } from 'luxon';

const date = DateTime.now();
const template = (args, updateArg) =>
  html`<dash-event-calendar-week
    style="width: 95vw; height: 95vh"
    date=${args.date}
    .events=${args.events}
    @dashEventCalendarPrevWeek=${e => updateArg('date', e.detail)}
    @dashEventCalendarNextWeek=${e => updateArg('date', e.detail)}
    @dashEventCalendarEditEvent=${e => console.log('edit event:', e.detail)}
    @dashEventCalendarDeleteEvent=${e => console.log('delete event:', e.detail)}
  ></dash-event-calendar-week>`;

export const eventCalendarWeekDefinition = {
  name: '<dash-event-calendar-week>',
  controls: {
    date: {
      type: 'text',
    },
    events: {
      type: 'json',
    },
  },
  template,
  args: {
    date: date.toISO(),
    events: [
      {
        id: '0',
        name: 'Walk Hazel',
        fromTime: DateTime.fromISO(date.toISO()).set({ hour: 7, minute: 30 }),
        toTime: DateTime.fromISO(date.toISO()).set({ hour: 11 }),
      },
      {
        id: '1',
        name: 'Brush Hazel',
        fromTime: DateTime.fromISO(date.toISO()).set({ hour: 5, minute: 30 }),
        toTime: DateTime.fromISO(date.toISO()).set({ hour: 8 }),
      },
      {
        id: '2',
        name: 'Pet Hazel',
        fromTime: DateTime.fromISO(date.toISO()).set({ hour: 8, minute: 30 }),
        toTime: DateTime.fromISO(date.toISO()).set({ hour: 9, minute: 30 }),
      },
      {
        id: '3',
        name: 'Pet Hazel more',
        fromTime: DateTime.fromISO(date.toISO()).set({ hour: 11, minute: 0 }),
        toTime: DateTime.fromISO(date.toISO()).set({ hour: 15, minute: 30 }),
      },
      {
        id: '4',
        name: 'Feed Hazel',
        fromTime: DateTime.fromISO(date.toISO()).set({ hour: 8, minute: 15 }),
        toTime: DateTime.fromISO(date.toISO()).set({ hour: 9, minute: 45 }),
      },
    ],
  },
};

export default eventCalendarWeekDefinition;
