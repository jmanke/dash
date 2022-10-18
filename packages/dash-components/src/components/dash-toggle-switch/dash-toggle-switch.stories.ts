import { booleanAttribute } from '../../../.storybook/common/utils';

export default {
  title: 'Components/Dash Toggle Switch',
};

const Template = args => `<dash-toggle-switch ${booleanAttribute('checked', args.checked)}></dash-toggle-switch>`;

export const DefaultToggleSwitch = Template.bind({});
DefaultToggleSwitch.args = {
  checked: false,
};
