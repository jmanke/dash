import { html } from 'lit-html';

const template = (args, updateArg) => html`<dash-time-picker time=${args.time} @dashTimePickerTimeChange=${e => updateArg('time', e.target.time)}></dash-time-picker>`;

export const timePickerDefinition = {
  name: '<dash-time-picker>',
  controls: {
    time: {
      type: 'text',
    },
  },
  template,
  args: {
    time: new Date().toISOString(),
  },
};

export default timePickerDefinition;
