import { html } from 'lit-html';

const template = (args, updateArg) =>
  html` <dash-theme-toggle theme=${args.theme} @click=${e => updateArg({ argName: 'theme', value: e.target.theme === 'light' ? 'dark' : 'light' })}></dash-theme-toggle>`;

export const toggleSwitchDefinition = {
  name: 'Theme toggle',
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
