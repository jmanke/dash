import { iconControl, scaleExtendedControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Fab',
  argTypes: {
    icon: iconControl,
    scale: scaleExtendedControl,
  },
};

const Template = args => `<dash-fab class=${args.theme} icon=${args.icon} scale=${args.scale}></dash-fab>`;

export const DefaultFab = Template.bind({});
DefaultFab.args = {
  icon: 'plus',
  scale: 'xl',
};
