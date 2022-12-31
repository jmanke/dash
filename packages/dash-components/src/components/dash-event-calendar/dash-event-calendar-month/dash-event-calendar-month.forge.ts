import { html } from 'lit-html';
import { DateTime } from 'luxon';

const eventDate = DateTime.fromISO(DateTime.now().toISO());

const template = (args, updateArg) =>
  html`<dash-event-calendar-month
    style="width: 95vw; height: 95vh"
    date=${args.date}
    .events=${args.events}
    @dashEventCalendarPrevMonth=${e => updateArg('date', e.target.date)}
    @dashEventCalendarNextMonth=${e => updateArg('date', e.target.date)}
    @dashEventCalendarEditEvent=${e => console.log('edit event:', e.detail)}
    @dashEventCalendarDeleteEvent=${e => console.log('delete event:', e.detail)}
  ></dash-event-calendar-month>`;

export const eventCalendarMonthDefinition = {
  name: '<dash-event-calendar-month>',
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
    date: DateTime.now().startOf('month').toISO(),
    events: [
      {
        id: '0',
        name: 'Walk Hazel',
        fromTime: eventDate.set({ hour: 7, minute: 30 }),
        toTime: eventDate.set({ hour: 11 }),
      },
      {
        id: '1',
        name: 'Brush Hazel',
        fromTime: eventDate.set({ hour: 5, minute: 30 }),
        toTime: eventDate.set({ hour: 8 }),
      },
      {
        id: '2',
        name: 'Pet Hazel',
        fromTime: eventDate.set({ hour: 8, minute: 30 }),
        toTime: eventDate.set({ hour: 9, minute: 30 }),
      },
      {
        id: '3',
        name: 'Pet Hazel more',
        fromTime: eventDate.set({ hour: 11, minute: 0 }),
        toTime: eventDate.set({ hour: 15, minute: 30 }),
      },
      {
        id: '4',
        name: 'Feed Hazel',
        fromTime: eventDate.set({ hour: 8, minute: 15 }),
        toTime: eventDate.set({ hour: 9, minute: 45 }),
      },
    ],
  },
};

export default eventCalendarMonthDefinition;
