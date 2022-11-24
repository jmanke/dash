import { html } from 'lit-html';
const template = (args, updateArg) =>
  html`
    <dash-toggle-switch
      ?checked=${args.checked}
      @dashToggleSwitchCheckChanged=${(e: CustomEvent<boolean>) => updateArg({ argName: 'checked', value: e.detail })}
    ></dash-toggle-switch>
  `;

export const toggleSwitchDefinition = {
  name: 'Toggle switch',
  controls: {
    checked: {
      type: 'boolean',
    },
  },
  template,
  args: {
    checked: false,
  },
};

export default toggleSwitchDefinition;
