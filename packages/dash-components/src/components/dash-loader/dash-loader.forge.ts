import { html } from 'lit-html';
import { scaleControl } from '../../../.forge/common/controls';

const template = args => html`<dash-loader scale=${args.scale}></dash-loader>`;

export const loaderDefinition = {
  name: '<dash-loader>',
  controls: {
    scale: scaleControl,
  },
  template,
  args: {
    scale: 'm',
  },
};

export default loaderDefinition;
