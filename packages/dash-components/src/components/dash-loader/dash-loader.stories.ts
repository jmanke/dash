import { scaleControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Loader',
  argTypes: {
    scale: scaleControl,
  },
};

const Template = args => `<dash-loader scale=${args.scale}></dash-loader>`;

export const DefaultLoader = Template.bind({});
DefaultLoader.args = {
  scale: 'm',
};
