import { html } from 'lit-html';

const template = (args, updateArg) =>
  html`<dash-list-item
    selection-mode=${args.selectionMode}
    disable-deselect=${args.disableDeselect}
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
    disableDeselect: { type: 'boolean' },
  },
  template,
  args: {
    disabled: false,
    selected: false,
    disableDeselect: false,
    selectionMode: 'single',
  },
};

export default listItemDefinition;
