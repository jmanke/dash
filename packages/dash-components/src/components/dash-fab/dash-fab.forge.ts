import { html } from 'lit-html';
import { iconControl, scaleExtendedControl } from '../../../.forge/common/controls';

const template = (args) => html`<dash-fab icon=${args.icon} scale=${args.scale}></dash-fab>`;

export const fabDefinition = {
  name: 'Fab',
  controls: {
    scale: scaleExtendedControl,
    icon: iconControl,
  },
  template,
  args: {
    icon: 'plus',
    scale: 'l',
  },
};

export default fabDefinition;
