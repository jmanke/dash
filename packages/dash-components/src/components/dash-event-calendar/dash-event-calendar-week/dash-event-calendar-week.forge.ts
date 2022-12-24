import { html } from 'lit-html';

const template = () => html`<dash-event-calendar-week style="width: 95vw; height: 95vh"></dash-event-calendar-week>`;

export const eventCalendarWeekDefinition = {
  name: '<dash-event-calendar-week>',
  controls: {},
  template,
  args: {},
};

export default eventCalendarWeekDefinition;
