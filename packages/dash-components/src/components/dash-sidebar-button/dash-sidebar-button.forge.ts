import { html } from 'lit-html';
import { iconControl } from '../../../.forge/common/controls';

const template = (args, updateArg) =>
  html`<dash-sidebar-button
    icon=${args.icon}
    text=${args.text}
    icon-color=${args.iconColor}
    ?collapsed=${args.collapsed}
    ?active=${args.active}
    @click=${() => updateArg('active', !args.active)}
  ></dash-sidebar-button>`;

export const sideBarButtonDefinition = {
  name: '<dash-side-bar-button>',
  controls: {
    icon: iconControl,
    text: { type: 'text' },
    iconColor: { type: 'color' },
    active: { type: 'boolean' },
    collapsed: { type: 'boolean' },
  },
  template,
  args: {
    icon: 'journal-text',
    text: 'Sidebar button',
    iconColor: '#000000',
    active: false,
    collapsed: false,
  },
};

export default sideBarButtonDefinition;
