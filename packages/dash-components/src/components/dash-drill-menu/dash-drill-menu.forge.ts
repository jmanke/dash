import { html } from 'lit-html';

const template = (args, updateArg) => html` <dash-drill-menu
  style="border: 1px solid var(--dash-border-1); width: 16rem; height: 16rem; padding: var(--dash-spacing-2);"
  drill-heading=${args.drillHeading}
  ?active=${args.active}
  @dashDrillMenuClosed=${() => updateArg('active', false)}
>
  Main content

  <dash-button @click=${() => updateArg('active', true)}>Drill into</dash-button>

  <div slot="drill-content">Drill content</div>
</dash-drill-menu>`;

export const drillMenuDefinition = {
  name: '<dash-drill-menu>',
  controls: {
    drillHeading: { type: 'text' },
    active: { type: 'boolean' },
  },
  template,
  args: {
    drillHeading: 'Heading',
    active: false,
  },
};

export default drillMenuDefinition;
