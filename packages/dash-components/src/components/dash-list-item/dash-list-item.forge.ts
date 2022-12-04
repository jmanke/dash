import { html } from 'lit-html';

const template = (args, updateArg) =>
  html`<dash-list-item
    selection-mode=${args.selectionMode}
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
    selectionMode: { type: 'select', options: ['single', 'multiple', 'none'] },
  },
  template,
  args: {
    disabled: false,
    selected: false,
    selectionMode: 'single',
  },
};

export default listItemDefinition;
