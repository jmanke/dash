import { html } from 'lit-html';
import { colorControl } from '../../../.forge/common/controls';

const template = args =>
  html`<dash-chip
    heading=${args.heading}
    ?selectable=${args.selectable}
    ?dismissible=${args.dismissible}
    dismiss-tooltip-text=${args.dismissTooltipText}
    color=${args.color}
  ></dash-chip>`;

export const chipDefinition = {
  name: '<dash-chip>',
  controls: {
    heading: { type: 'text' },
    dismissTooltipText: { type: 'text' },
    color: colorControl,
    selectable: { type: 'boolean' },
    dismissible: { type: 'boolean' },
  },
  template,
  args: {
    heading: 'Chip',
    dismissTooltipText: 'Dismiss',
    color: 'red',
    selectable: true,
    dismissible: true,
  },
};

export default chipDefinition;
