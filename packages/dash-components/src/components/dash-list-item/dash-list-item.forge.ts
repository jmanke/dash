import { html } from 'lit-html';

const template = (args, updateArg) =>
  html`<dash-list-item
    selection-mode=${args.selectionMode}
    href=${args.href}
    ?disable-deselect=${args.disableDeselect}
    ?drag-enabled=${args.dragEnabled}
    ?selected=${args.selected}
    ?disabled=${args.disabled}
    @dashListItemSelectedChanged=${() => updateArg('selected', !args.selected)}
    >List item</dash-list-item
  > `;

export const listItemDefinition = {
  name: '<dash-list-item>',
  controls: {
    disabled: { type: 'boolean' },
    selected: { type: 'boolean' },
    dragEnabled: { type: 'boolean' },
    selectionMode: { type: 'select', options: ['single', 'multiple', 'none'] },
    disableDeselect: { type: 'boolean' },
    href: { type: 'text' },
  },
  template,
  args: {
    disabled: false,
    selected: false,
    disableDeselect: false,
    dragEnabled: false,
    selectionMode: 'single',
    href: null,
  },
};

export default listItemDefinition;
