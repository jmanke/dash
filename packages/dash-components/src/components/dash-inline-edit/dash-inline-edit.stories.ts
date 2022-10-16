import { scaleControl } from '../../../.storybook/common/controls';
import { booleanAttribute } from '../../../.storybook/common/utils';

export default {
  title: 'Components/Dash Inline Edit',
  argTypes: {
    scale: scaleControl,
  },
};

const Template = args => `
  <dash-inline-edit value="Test value" scale=${args.scale} ${booleanAttribute('disabled', args.disabled)}></dash-inline-edit>`;

export const DefaultInlineEdit = Template.bind({});
DefaultInlineEdit.args = {
  scale: 'm',
  disabled: false,
};
