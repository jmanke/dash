import { html } from 'lit-html';

const template = args => html`<dash-scrim ?active=${args.active}></dash-scrim>`;

export const scrimDefinition = {
  name: '<dash-scrim>',
  controls: {
    active: { type: 'boolean' },
  },
  template,
  args: {
    active: true,
  },
};

export default scrimDefinition;
