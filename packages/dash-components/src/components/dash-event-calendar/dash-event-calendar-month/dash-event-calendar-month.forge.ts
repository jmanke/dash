import { html } from 'lit-html';
import { DateTime } from 'luxon';

const eventDate = DateTime.fromISO(DateTime.now().toISO());

const template = (args, updateArg) =>
  html`<dash-event-calendar-month
    style="width: 95vw; height: 95vh"
    date=${args.date}
    .events=${args.events}
    @dashEventCalendarPrevMonth=${e => updateArg('date', e.detail)}
    @dashEventCalendarNextMonth=${e => updateArg('date', e.detail)}
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
        name: 'Walk Hazel',
        fromTime: eventDate.set({ hour: 7, minute: 30 }),
        toTime: eventDate.set({ hour: 11 }),
      },
      {
        name: 'Brush Hazel',
        fromTime: eventDate.set({ hour: 5, minute: 30 }),
        toTime: eventDate.set({ hour: 8 }),
      },
      {
        name: 'Pet Hazel',
        fromTime: eventDate.set({ hour: 8, minute: 30 }),
        toTime: eventDate.set({ hour: 9, minute: 30 }),
      },
      {
        name: 'Pet Hazel more',
        fromTime: eventDate.set({ hour: 11, minute: 0 }),
        toTime: eventDate.set({ hour: 15, minute: 30 }),
      },
      {
        name: 'Feed Hazel',
        fromTime: eventDate.set({ hour: 8, minute: 15 }),
        toTime: eventDate.set({ hour: 9, minute: 45 }),
      },
    ],
  },
};

export default eventCalendarMonthDefinition;
