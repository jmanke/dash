import { placementControl, placementStrategyControl, scaleControl, themeControl } from '../../../.storybook/common/controls';
import { booleanAttribute, formatAttribute } from '../../../.storybook/common/utils';

export default {
  title: 'Components/Dash Tooltip',
  argTypes: {
    theme: themeControl,
    placementStrategy: placementStrategyControl,
    placement: placementControl,
    scale: scaleControl,
  },
};

const Template = args => `
<div style="margin: 5rem;">
  <dash-icon-button id="dash-tooltip-test" icon="plus"></dash-icon-button>

<dash-tooltip
  class=${args.theme}
  target="dash-tooltip-test"
  ${formatAttribute('text', args.text)}
  placement-strategy=${args.placementStrategy}
  offset-x=${args.offsetX}
  offset-y=${args.offsetY}
  placement=${args.placement}
  scale=${args.scale}
  ${booleanAttribute('arrow', args.arrow)}
  enabled=${args.enabled}
  </dash-tooltip>
</div>`;

export const DefaultTooltip = Template.bind({});
DefaultTooltip.args = {
  theme: 'light-theme',
  text: 'Tooltip text',
  placementStrategy: 'fixed',
  placement: 'right',
  offsetX: 0,
  offsetY: 0,
  scale: 'm',
  arrow: true,
  enabled: true,
};
