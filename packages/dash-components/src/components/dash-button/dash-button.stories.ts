import { scaleControl, iconControl, statusControl, themeControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Button',
  argTypes: {
    scale: scaleControl,
    startIcon: iconControl,
    status: statusControl,
    theme: themeControl,
  },
};

const Template = args => `<dash-button 
  class=${args.theme}
  scale=${args.scale} 
  ${args.startIcon && `start-icon=${args.startIcon}`}
  status=${args.status} ${args.disabled ? 'disabled' : undefined}
  >${args.content}</dash-button>`;

export const Example = Template.bind({});
Example.args = {
  theme: 'light-theme',
  content: 'Sample button',
  scale: 'l',
  startIcon: 'plus',
  status: null,
  disabled: false,
};
