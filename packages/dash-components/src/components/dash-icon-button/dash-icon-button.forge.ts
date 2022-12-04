import { html } from 'lit-html';
import { scaleExtendedControl, iconControl, placementControl } from '../../../.forge/common/controls';

const template = args =>
  html`<dash-icon-button
    scale=${args.scale}
    icon=${args.icon}
    icon-url=${args.iconUrl}
    tooltip-text=${args.tooltipText}
    type="button"
    tooltip-placement=${args.tooltipPlacement}
    ?loading=${args.loading}
    ?disabled=${args.disabled}
    ?rounded=${args.rounded}
  ></dash-icon-button>`;

export const iconButtonDefinition = {
  name: '<dash-icon-button>',
  controls: {
    scale: scaleExtendedControl,
    icon: iconControl,
    iconUrl: { type: 'text' },
    tooltipText: { type: 'text' },
    tooltipPlacement: placementControl,
    loading: { type: 'boolean' },
    disabled: { type: 'boolean' },
    rounded: { type: 'boolean' },
  },
  template,
  args: {
    scale: 'm',
    icon: 'pencil',
    iconUrl: null,
    tooltipText: '',
    tooltipPlacement: 'right',
    loading: false,
    disabled: false,
    rounded: false,
  },
};

export default iconButtonDefinition;
