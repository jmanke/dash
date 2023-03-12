import { html } from 'lit-html';
import { iconControl, scaleExtendedControl } from '../../../../../.forge/common/controls';

const template = args => html`<dash-icon scale=${args.scale} icon=${args.icon} icon-url=${args.iconUrl}></dash-icon>`;

export const iconDefinition = {
  name: '<dash-icon>',
  controls: {
    scale: scaleExtendedControl,
    icon: iconControl,
    iconUrl: { type: 'text' },
  },
  template,
  args: {
    scale: 'm',
    icon: 'pencil',
    iconUrl: null,
  },
};

export default iconDefinition;
