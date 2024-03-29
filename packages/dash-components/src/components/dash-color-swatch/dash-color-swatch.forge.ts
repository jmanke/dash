import { html } from 'lit-html';
import { colorControl, scaleControl } from '../../../../../.forge/common/controls';

const template = (args, updateArg) =>
  html`<dash-color-swatch scale=${args.scale} color=${args.color} selected=${args.selected} @click=${() => updateArg('selected', !args.selected)}></dash-color-swatch>`;

export const colorSwatchDefinition = {
  name: '<dash-color-swatch>',
  controls: {
    scale: scaleControl,
    color: colorControl,
    selected: { type: 'boolean' },
  },
  template,
  args: {
    scale: 'm',
    color: '#af6566',
    selected: false,
  },
};

export default colorSwatchDefinition;
