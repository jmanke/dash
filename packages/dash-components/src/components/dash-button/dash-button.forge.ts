import { html } from 'lit-html';
import { scaleControl, iconControl, statusControl } from '../../../.forge/common/controls';

const template = args =>
  html`
    <dash-button scale=${args.scale} start-icon=${args.startIcon} status=${args.status} appearance=${args.appearance} ?disabled=${args.disabled}>${args.content}</dash-button>
  `;

export const buttonDefinition = {
  name: 'Button',
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
      options: ['clear', 'outline'],
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
