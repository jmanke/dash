import { html } from 'lit-html';

const template = (args, updateArg) => html`<dash-shell style="position: fixed; left: 0; top: 0;">
  <div slot="header" style="padding: 0.5rem;"><dash-icon-button icon="list" scale="l" rounded @click=${() => updateArg('collapsed', !args.collapsed)} /></div>

  <dash-side-bar slot="left-panel" ?collapsed=${args.collapsed} style="background-color: var(--dash-background-3);">
    <dash-sidebar-button icon="journal-text" text="Notes" ?collapsed=${args.collapsed}></dash-sidebar-button>
    <dash-sidebar-button icon="journal-text" text="Notes" ?collapsed=${args.collapsed}></dash-sidebar-button>
    <dash-sidebar-button icon="journal-text" text="Notes" ?collapsed=${args.collapsed}></dash-sidebar-button>
    <dash-sidebar-button icon="journal-text" text="Notes" ?collapsed=${args.collapsed}></dash-sidebar-button>
  </dash-side-bar>

  <div slot="content" style="background-color: var(--dash-background-3); height: calc(100% - 2rem); padding: 1rem;">Main content area</div>
</dash-shell>`;

export const sideBarDefinition = {
  name: '<dash-side-bar>',
  controls: {
    collapsed: { type: 'boolean' },
  },
  template,
  args: {
    collapsed: true,
  },
};

export default sideBarDefinition;
