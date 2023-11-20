import { html } from 'lit-html';

const template = args => html`<dash-indicator-button active=${args.active}></dash-indicator-button>`;

export const indicatorDefinition = {
  name: '<dash-indicator-button>',
  controls: {
    active: {
      type: 'boolean',
    },
  },
  template,
  args: {
    active: false,
  },
};

export default indicatorDefinition;
