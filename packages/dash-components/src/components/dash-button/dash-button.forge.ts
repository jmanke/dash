import { html } from 'lit-html';
import { iconControl, scaleControl, statusControl } from '../../../../../.forge/common/controls';

const template = args =>
  html`
    <dash-button
      scale=${args.scale}
      start-icon=${args.startIcon}
      end-icon=${args.endIcon}
      status=${args.status}
      appearance=${args.appearance}
      href=${args.href}
      ?disabled=${args.disabled}
      >${args.content}</dash-button
    >
  `;

export const buttonDefinition = {
  name: '<dash-button>',
  controls: {
    content: {
      type: 'text',
    },
    scale: scaleControl,
    startIcon: iconControl,
    endIcon: iconControl,
    status: statusControl,
    disabled: {
      type: 'boolean',
    },
    appearance: {
      options: ['clear', 'outline', 'solid'],
      type: 'radio',
    },
    href: {
      type: 'text',
    },
  },
  template,
  args: {
    content: 'Sample button',
    scale: 'm',
    startIcon: null,
    endIcon: null,
    status: null,
    disabled: false,
    appearance: 'clear',
    href: null,
  },
};

export default buttonDefinition;
