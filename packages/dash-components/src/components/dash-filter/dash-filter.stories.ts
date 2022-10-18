import { scaleControl, themeControl } from '../../../.storybook/common/controls';
import { nullableAttribute } from '../../../.storybook/common/utils';

export default {
  title: 'Components/Dash Filter',
  argTypes: {
    theme: themeControl,
    scale: scaleControl,
  },
};

const objKey = 'id';

const Template = args => `<dash-filter
  class=${args.theme}
  scale=${args.scale}
  ${nullableAttribute('placeholder', args.placeholder)}
  obj-key=${objKey}
  debounce=${args.debounce}
></dash-filter>`;

export const DefaultFilter = Template.bind({});
DefaultFilter.args = {
  theme: 'light-theme',
  scale: 'm',
  placeholder: '',
  debounce: 250,
};
