import { iconControl, scaleControl, themeControl } from '../../../.storybook/common/controls';
import { booleanAttribute, nullableAttribute } from '../../../.storybook/common/utils';

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
  ${nullableAttribute('placeholder', args.placeholder)}
  ${nullableAttribute('icon', args.icon)}
  ${booleanAttribute('clearable', args.clearable)}
  debounce=${args.debounce}
  type=${args.type}
></dash-input> `;

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
