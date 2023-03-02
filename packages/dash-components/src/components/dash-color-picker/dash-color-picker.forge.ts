import { html } from 'lit-html';

const DefaultColors = ['#af6566', '#af815a', '#a7954e', '#50a559', '#7379b1', '#906098'];

const template = (args, updateArg) =>
  html`<dash-color-picker
    style="width: fit-content;"
    hex=${args.hex}
    .defaultColors=${DefaultColors}
    @dashColorPickerColorChanged=${e => {
      updateArg('hex', e.target.hex);
    }}
  ></dash-color-picker>`;

export const chipDefinition = {
  name: '<dash-color-picker>',
  controls: {
    hex: {
      type: 'text',
    },
  },
  template,
  args: {
    hex: '#FF0000',
  },
};

export default chipDefinition;
