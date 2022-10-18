import { themeControl } from '../../../.storybook/common/controls';

export default {
  title: 'Components/Dash Theme Toggle',
  argTypes: { theme: themeControl },
};

const Template = args => `
<dash-theme-toggle class="${args.theme}" theme="light" onclick="toggleTheme()"></dash-theme-toggle>

<script>
  function toggleTheme() {
    const toggle = document.querySelector('dash-theme-toggle');
    toggle.theme = toggle.theme === 'light' ? 'dark' : 'light';
  }
</script>
`;

export const DefaultThemeToggle = Template.bind({});
DefaultThemeToggle.args = {
  theme: 'light-theme',
};
