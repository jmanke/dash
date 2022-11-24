import { html } from 'lit-html';
import { colorControl } from '../../../.forge/common/controls';

const template = args =>
  html`<dash-chip
    heading=${args.heading}
    ?selectable=${args.selectable}
    ?removeable=${args.removeable}
    dismiss-tooltip-text=${args.dismissTooltipText}
    color=${args.color}
  ></dash-chip>`;

export const chipDefinition = {
  name: 'Chip',
  controls: {
    heading: { type: 'text' },
    dismissTooltipText: { type: 'text' },
    color: colorControl,
    selectable: { type: 'boolean' },
    removeable: { type: 'boolean' },
  },
  template,
  args: {
    heading: 'Chip',
    dismissTooltipText: 'Dismiss',
    color: 'red',
    selectable: true,
    removeable: true,
  },
};

export default chipDefinition;
