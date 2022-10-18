import { colors, colorControl, themeControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Color Picker',
  argTypes: {
    theme: themeControl,
    selectedColor: colorControl,
  },
};

const Template = args => `<dash-color-picker style="width: fit-content;" class=${args.theme} selected-color=${args.selectedColor} cols=${args.cols}></dash-color-picker>
  <script>
    var colorsArray = ${JSON.stringify(colors)};
    document.querySelector('dash-color-picker').colors = colorsArray;
  </script> `;

export const DefaultColorPicker = Template.bind({});
DefaultColorPicker.args = {
  theme: 'light-theme',
  selectedColor: 'red',
  cols: 3,
};
