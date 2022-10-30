export default {
  title: 'Components/Dash Label',
  argTypes: {
    layout: {
      options: ['default', 'inline-space-between'],
      control: { type: 'select' },
    },
  },
};

const Template = args => `
<dash-label
  layout=${args.layout}
>
  ${args.label}
  <dash-toggle-switch></dash-toggle-switch>
</dash-label> `;

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
  layout: 'default',
  label: 'Example label',
};
