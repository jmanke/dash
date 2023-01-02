import { html } from 'lit-html';
import { DateTime } from 'luxon';

const eventDate = DateTime.fromISO(DateTime.now().toISO());

const template = (args, updateArg) =>
  html`<dash-event-calendar-edit-event
    header=${args.header}
    .event=${args.event}
    @dashEventCalendarEditEventEventUpdate=${e => updateArg('event', e.target.event)}
  ></dash-event-calendar-edit-event>`;

export const eventCalendarEditEventDefinition = {
  name: '<dash-event-calendar-edit-event>',
  controls: {
    event: {
      type: 'json',
    },
    header: {
      type: 'text',
    },
  },
  template,
  args: {
    header: 'Edit event',
    event: {
      id: '0',
      name: 'Walk Hazel',
      description: 'Hazel needs lots of walks to keep her stubby legs moving.',
      fromTime: eventDate.set({ hour: 7, minute: 30 }).toISO(),
      toTime: eventDate.set({ hour: 11 }).toISO(),
    },
  },
};

export default eventCalendarEditEventDefinition;
