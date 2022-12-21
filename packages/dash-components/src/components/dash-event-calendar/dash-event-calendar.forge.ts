import { html } from 'lit-html';

const template = () => html`<dash-event-calendar style="width: 95vw; height: 95vh"></dash-event-calendar>`;

export const eventCalendarDefinition = {
  name: '<dash-event-calendar>',
  controls: {},
  template,
  args: {},
};

export default eventCalendarDefinition;
