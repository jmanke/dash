import { scaleControl, themeControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Color Swatch',
  argTypes: {
    scale: scaleControl,
    theme: themeControl,
  },
};

const Template = args => `<dash-color-swatch class=${args.theme} scale=${args.scale} color=${args.color} selected=${args.selected}>${args.content}</dash-color-swatch>`;

export const DefaultColorSwatch = Template.bind({});
DefaultColorSwatch.args = {
  theme: 'light-theme',
  scale: 'm',
  color: 'red',
  selected: false,
};
