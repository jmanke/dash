import { html } from 'lit-html';

const DefaultColors = ['#af6566', '#af815a', '#a7954e', '#50a559', '#7379b1', '#906098'];

const template = (args, updateArg) =>
  html`<dash-color-picker
    style="width: fit-content;"
    color=${args.color}
    .defaultColors=${args.defaultColors}
    @dashColorPickerColorChanged=${e => {
      updateArg('color', e.target.color);
    }}
  ></dash-color-picker>`;

export const chipDefinition = {
  name: '<dash-color-picker>',
  controls: {
    color: {
      type: 'text',
    },
    defaultColors: {
      type: 'multi-checkbox',
      options: DefaultColors,
    },
  },
  template,
  args: {
    color: '#FF0000',
    defaultColors: DefaultColors,
  },
};

export default chipDefinition;
