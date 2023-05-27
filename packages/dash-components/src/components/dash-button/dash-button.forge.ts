import { html } from 'lit-html';
import { iconControl, scaleControl, statusControl } from '../../../../../.forge/common/controls';

const template = args =>
  html`
    <dash-button scale=${args.scale} start-icon=${args.startIcon} status=${args.status} appearance=${args.appearance} ?disabled=${args.disabled}>${args.content}</dash-button>
  `;

export const buttonDefinition = {
  name: '<dash-button>',
  controls: {
    content: {
      type: 'text',
    },
    scale: scaleControl,
    startIcon: iconControl,
    status: statusControl,
    disabled: {
      type: 'boolean',
    },
    appearance: {
      options: ['clear', 'outline', 'solid'],
      type: 'radio',
    },
  },
  template,
  args: {
    content: 'Sample button',
    scale: 'm',
    startIcon: null,
    status: null,
    disabled: false,
    appearance: 'clear',
  },
};

export default buttonDefinition;
