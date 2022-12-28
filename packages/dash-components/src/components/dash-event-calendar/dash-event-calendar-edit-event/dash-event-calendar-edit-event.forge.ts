import { html } from 'lit-html';
import { DateTime } from 'luxon';

const eventDate = DateTime.fromISO(DateTime.now().toISO());

const template = args => html`<dash-event-calendar-edit-event .event=${args.event}></dash-event-calendar-edit-event>`;

export const eventCalendarEditEventDefinition = {
  name: '<dash-event-calendar-edit-event>',
  controls: {
    event: {
      type: 'json',
    },
  },
  template,
  args: {
    event: {
      id: '0',
      name: 'Walk Hazel',
      description: 'Hazel needs lots of walks to keep her stubby legs moving.',
      fromTime: eventDate.set({ hour: 7, minute: 30 }),
      toTime: eventDate.set({ hour: 11 }),
    },
  },
};

export default eventCalendarEditEventDefinition;
