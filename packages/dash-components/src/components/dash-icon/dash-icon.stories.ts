import { iconControl, scaleExtendedControl } from '../../../.storybook/common/controls';
import { nullableAttribute } from '../../../.storybook/common/utils';

export default {
  title: 'Components/Dash Icon',
  argTypes: {
    scale: scaleExtendedControl,
    icon: iconControl,
    iconUrl: { control: { type: 'text' } },
    width: { control: { type: 'number' } },
  },
};

const Template = args => {
  return `<dash-icon
    scale=${args.scale}
    ${nullableAttribute('icon', args.icon)}
    ${nullableAttribute('icon-url', args.iconUrl)}
    style=${args.width && args.width > 0 ? `--dash-icon-size:${Number.parseInt(args.width)}px;` : undefined}
    >${args.content}</dash-icon
  >`;
};

export const DefaultIcon = Template.bind({});
DefaultIcon.args = {
  scale: 'm',
  icon: 'pencil',
  iconUrl: null,
  rounded: false,
  width: null,
};
