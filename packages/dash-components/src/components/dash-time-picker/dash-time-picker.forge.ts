import { html } from 'lit-html';

const template = () => html`<dash-time-picker time="12:00 AM"></dash-time-picker>`;

export const timePickerDefinition = {
  name: '<dash-time-picker>',
  controls: {},
  template,
  args: {},
};

export default timePickerDefinition;
