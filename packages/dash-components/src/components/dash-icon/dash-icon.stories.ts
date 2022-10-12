import { iconControl, scaleExtendedControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Icon',
  argTypes: {
    scale: scaleExtendedControl,
    icon: iconControl,
    iconUrl: { control: { type: 'text' } },
    width: { control: { type: 'number' } },
  },
};

const Template = args => `<dash-icon 
  scale=${args.scale} 
  ${args.icon ? `icon=${args.icon}` : undefined}
  ${args.iconUrl ? `icon-url=${args.iconUrl}` : undefined}
  style=${args.width ? `--dash-icon-size:${Number.parseInt(args.width)}px;` : undefined}
  >${args.content}</dash-icon>`;

export const DefaultIcon = Template.bind({});
DefaultIcon.args = {
  scale: 'm',
  icon: 'pencil',
  iconUrl: null,
  rounded: false,
  width: null,
};
