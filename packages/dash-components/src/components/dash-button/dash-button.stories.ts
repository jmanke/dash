import { scaleControl, iconControl, statusControl, themeControl } from '../../../.storybook/common/controls';
import { booleanAttribute, nullableAttribute } from '../../../.storybook/common/utils';

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
  ${nullableAttribute('start-icon', args.startIcon)}
  ${nullableAttribute('status', args.status)}
  ${booleanAttribute('disabled', args.disabled)}
  >${args.content}</dash-button
>`;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  theme: 'light-theme',
  content: 'Sample button',
  scale: 'm',
  startIcon: null,
  status: null,
  disabled: false,
};
