import { placementControl, placementStrategyControl, scaleControl, themeControl } from '../../../.storybook/common/controls';

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
  target="dash-tooltip-test",
  text=${args.text}
  placement-strategy=${args.placementStrategy}
  offset-x=${args.offsetX}
  offset-y=${args.offsetY}
  placement=${args.placement}
  scale=${args.scale}
  ${args.arrow ? 'arrow' : undefined}
  enabled=${args.enabled}
  </dash-tooltip>
</div>`;

export const DefaultChip = Template.bind({});
DefaultChip.args = {
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
