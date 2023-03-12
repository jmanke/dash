import { html } from 'lit-html';
import { placementControl, placementStrategyControl, scaleControl } from '../../../../../.forge/common/controls';

const template = args => html`<div style="margin: 5rem;">
  <dash-icon-button id="dash-tooltip-test" icon="plus"></dash-icon-button>

  <dash-tooltip
    target="dash-tooltip-test"
    text=${args.text}
    placement-strategy=${args.placementStrategy}
    offset-x=${args.offsetX}
    offset-y=${args.offsetY}
    placement=${args.placement}
    scale=${args.scale}
    ?arrow=${args.arrow}
    ?enabled=${args.enabled}
  >
  </dash-tooltip>
</div>`;

export const tooltipDefinition = {
  name: '<dash-tooltip>',
  controls: {
    text: { type: 'text' },
    placementStrategy: placementStrategyControl,
    placement: placementControl,
    offsetX: { type: 'number' },
    offsetY: { type: 'number' },
    scale: scaleControl,
    arrow: { type: 'boolean' },
    enabled: { type: 'boolean' },
  },
  template,
  args: {
    text: 'Tooltip text',
    placementStrategy: 'fixed',
    placement: 'right',
    offsetX: 0,
    offsetY: 0,
    scale: 'm',
    arrow: true,
    enabled: true,
  },
};

export default tooltipDefinition;
