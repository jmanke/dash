import { html } from 'lit-html';

const template = () => html`<dash-event-calendar-day style="width: 95vw; height: 95vh"></dash-event-calendar-day>`;

export const eventCalendarDayDefinition = {
  name: '<dash-event-calendar-day>',
  controls: {},
  template,
  args: {},
};

export default eventCalendarDayDefinition;
