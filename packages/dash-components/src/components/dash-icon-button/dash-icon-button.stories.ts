import { iconControl, scaleExtendedControl, themeControl } from '../../../.storybook/common/controls';

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
  ${args.icon ? `icon=${args.icon}` : undefined}
  ${args.iconUrl ? `icon-url=${args.iconUrl}` : undefined}
  ${args.loading ? 'loading' : undefined}
  ${args.disabled ? 'disabled' : undefined}
  type=${args.type}
  ${args.rounded ? 'rounded' : undefined}
  ${args.tooltipText ? `tooltip-text=${args.tooltipText}` : undefined}
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
