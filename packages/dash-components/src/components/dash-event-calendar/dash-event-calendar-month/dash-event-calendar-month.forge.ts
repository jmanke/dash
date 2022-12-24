import { html } from 'lit-html';

const template = () => html`<dash-event-calendar-month style="width: 95vw; height: 95vh"></dash-event-calendar-month>`;

export const eventCalendarMonthDefinition = {
  name: '<dash-event-calendar-month>',
  controls: {},
  template,
  args: {},
};

export default eventCalendarMonthDefinition;
