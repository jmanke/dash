import { booleanAttribute } from '../../../.storybook/common/utils';

export default {
  title: 'Components/Dash Scrim',
};

const Template = args => `<dash-scrim ${booleanAttribute('active', args.active)}></dash-scrim>`;

export const DefaultScrim = Template.bind({});
DefaultScrim.args = {
  active: true,
};
