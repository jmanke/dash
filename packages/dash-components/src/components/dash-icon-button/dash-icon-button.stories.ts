import { iconControl, scaleControl, themeControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Icon Button',
  argTypes: {
    scale: scaleControl,
    iconScale: scaleControl,
    theme: themeControl,
    icon: iconControl,
    iconUrl: { control: { type: 'text' } },
    width: { control: { type: 'number' } },
    tooltipText: { control: { type: 'text' } }
  },
};

const Template = args => `<dash-icon-button 
  class=${args.theme}
  scale=${args.scale}
  ${args.icon ? `icon=${args.icon}` : undefined}
  ${args.iconUrl ? `icon-url=${args.iconUrl}` : undefined}
  icon-scale=${args.iconScale}
  ${args.width ? `width=${args.width}` : undefined}
  ${args.loading ? `loading=${args.loading}` : undefined}
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
  iconScale: 'm',
  width: null,
  loading: false,
  disabled: false,
  type: 'button',
  rounded: false,
  tooltipText: null,
  tooltipPlacement: 'right',
};
