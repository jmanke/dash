import { html } from 'lit-html';

const template = (args, updateArg) =>
  html`<hellodash-label-color-picker color=${args.color} @hellodashLabelColorPickerColorChanged=${e => updateArg('color', e.detail)}></hellodash-label-color-picker>`;

export const labelColorPicker = {
  name: '<hellodash-label-color-picker>',
  controls: {
    color: { type: 'text' },
  },
  template,
  args: {
    color: '#af6566',
  },
};

export default labelColorPicker;
