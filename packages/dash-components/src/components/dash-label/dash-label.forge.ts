import { html } from 'lit-html';

const template = args =>
  html`<dash-label layout=${args.layout}>
    ${args.label}
    <dash-toggle-switch></dash-toggle-switch>
  </dash-label>`;

export const labelDefinition = {
  name: 'Label',
  controls: {
    layout: {
      options: ['default', 'inline-space-between'],
      type: 'radio',
    },
    label: { type: 'text' },
  },
  template,
  args: {
    layout: 'default',
    label: 'Toggle switch',
  },
};

export default labelDefinition;
