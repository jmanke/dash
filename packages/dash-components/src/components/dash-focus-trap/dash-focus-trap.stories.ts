export default {
  title: 'Components/Dash Focus Trap',
};

const Template = () => `
  <dash-focus-trap style="border: 1px solid #000; display: flex; flex-direction: column; padding: 1rem;">
    <dash-button>Button 1</dash-button>
    <dash-button>Button 2</dash-button>
    <dash-button>Button 3</dash-button>
  </dash-focus-trap>
`;

export const DefaultFocusTrap = Template.bind({});
