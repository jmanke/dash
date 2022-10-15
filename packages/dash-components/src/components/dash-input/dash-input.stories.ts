import { iconControl, scaleControl, themeControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Input',
  argTypes: {
    theme: themeControl,
    icon: iconControl,
    scale: scaleControl,
  },
};

const Template = args => `<dash-input 
  class=${args.theme}
  scale=${args.scale}
  ${args.placeholder ? `placeholder=${args.placeholder}` : undefined}
  ${args.icon ? `icon=${args.icon}` : undefined}
  ${args.clearable ? 'clearable' : undefined}
  debounce=${args.debounce}
  type=${args.type}
  ></dash-input>
  `;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  theme: 'light-theme',
  scale: 'm',
  placeholder: '',
  icon: 'plus',
  debounce: 250,
  clearable: false,
  type: 'text',
};
