import { html } from 'lit-html';
import { iconControl, scaleControl } from '../../../.forge/common/controls';

const template = args => html`<dash-confirm-button scale=${args.scale} icon=${args.icon}></dash-confirm-button>`;

export const confirmButtonDefinition = {
  name: '<dash-confirm-button>',
  controls: {
    scale: scaleControl,
    icon: iconControl,
  },
  template,
  args: {
    scale: 'm',
    icon: 'trash3',
  },
};

export default confirmButtonDefinition;
