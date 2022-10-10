export default {
  title: 'Components/Dash Chip',
  argTypes: {},
};

const Template = args => `<dash-chip 
  heading=${args.heading} 
  ${args.selectable && `selectable=${args.selectable}`}
  ${args.removeable && `removeable=${args.removeable}`}
  dismiss-tooltip-text=${args.dismissTooltipText}
  color=${args.color}
  >${args.content}</dash-icon>`;

export const DefaultChip = Template.bind({});
DefaultChip.args = {
  heading: 'Chip',
  selectable: true,
  dismissTooltipText: 'Dismiss',
  removeable: true,
  color: 'red',
};
