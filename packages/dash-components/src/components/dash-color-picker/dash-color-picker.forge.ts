import { html } from 'lit-html';
import { colorControl, colors } from '../../../.forge/common/controls';

const template = (args, updateArg) =>
  html`<dash-color-picker
    style="width: fit-content;"
    .colors=${colors}
    selected-color=${args.selectedColor}
    cols=${args.cols}
    @dashColorPickerColorChanged=${e => {
      updateArg('selectedColor', e.detail);
    }}
  ></dash-color-picker>`;

export const chipDefinition = {
  name: 'Color picker',
  controls: {
    selectedColor: colorControl,
    cols: {
      type: 'number',
      step: 1,
    },
  },
  template,
  args: {
    selectedColor: 'red',
    cols: 3,
  },
};

export default chipDefinition;
