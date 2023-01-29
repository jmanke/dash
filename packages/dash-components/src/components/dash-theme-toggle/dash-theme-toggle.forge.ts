import { html } from 'lit-html';

const template = (args, updateArg) => html` <dash-theme-toggle theme=${args.theme} @dashThemeToggleChange=${e => updateArg('theme', e.target.theme)}></dash-theme-toggle>`;

export const toggleSwitchDefinition = {
  name: '<dash-theme-toggle>',
  controls: {
    theme: {
      options: ['light', 'dark'],
      type: 'radio',
    },
  },
  template,
  args: {
    theme: 'light',
  },
};

export default toggleSwitchDefinition;
