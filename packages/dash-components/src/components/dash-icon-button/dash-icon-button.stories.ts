import { iconControl, scaleExtendedControl, themeControl } from '../../../.storybook/common/controls';
import { booleanAttribute, nullableAttribute } from '../../../.storybook/common/utils';

export default {
  title: 'Components/Dash Icon Button',
  argTypes: {
    scale: scaleExtendedControl,
    theme: themeControl,
    icon: iconControl,
    iconUrl: { control: { type: 'text' } },
    tooltipText: { control: { type: 'text' } },
  },
};

const Template = args => `<dash-icon-button
  class=${args.theme}
  scale=${args.scale}
  ${nullableAttribute('icon', args.icon)}
  ${nullableAttribute('icon-url', args.iconUrl)}
  ${booleanAttribute('loading', args.loading)}
  ${booleanAttribute('disabled', args.disabled)}
  ${booleanAttribute('rounded', args.rounded)}
  ${nullableAttribute('tooltip-text', args.tooltipText)}
  type=${args.type}
  tooltip-placement=${args.tooltipPlacement}
></dash-icon-button>`;

export const DefaultIconButton = Template.bind({});
DefaultIconButton.args = {
  theme: 'light-theme',
  scale: 'm',
  icon: 'plus',
  iconUrl: null,
  loading: false,
  disabled: false,
  type: 'button',
  rounded: false,
  tooltipText: null,
  tooltipPlacement: 'right',
};
