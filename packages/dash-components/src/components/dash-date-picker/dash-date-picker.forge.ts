import { html } from 'lit-html';

const template = (args, updateArg) => {
  return html`<dash-date-picker
    date=${args.date}
    .format=${args.format}
    @dashDatePickerDateChange=${e => {
      updateArg('date', e.target.date);
    }}
  ></dash-date-picker>`;
};

export const datePickerDefinition = {
  name: '<dash-date-picker>',
  controls: {
    date: {
      type: 'text',
    },
    format: {
      type: 'json',
      description: 'Refresh iframe after modification',
    },
  },
  template,
  args: {
    date: new Date().toISOString(),
    format: {
      month: 'long',
      weekday: 'long',
      day: 'numeric',
    },
  },
};

export default datePickerDefinition;
