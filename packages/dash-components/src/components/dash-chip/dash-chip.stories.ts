import { themeControl } from '../../../.storybook/common/controls';
import { booleanAttribute, formatAttribute } from '../../../.storybook/common/utils';

export default {
  title: 'Components/Dash Chip',
  argTypes: {
    theme: themeControl,
  },
};

const Template = args => `<dash-chip
  class=${args.theme}
  heading=${args.heading}
  ${booleanAttribute('selectable', args.selectable)}
  ${booleanAttribute('removeable', args.removeable)}
  ${formatAttribute('dismiss-tooltip-text', args.dismissTooltipText)}
  color=${args.color}
  >${args.content}</dash-icon>`;

export const DefaultChip = Template.bind({});
DefaultChip.args = {
  theme: 'light-theme',
  heading: 'Chip',
  selectable: true,
  dismissTooltipText: 'Dismiss',
  removeable: true,
  color: 'red',
};
