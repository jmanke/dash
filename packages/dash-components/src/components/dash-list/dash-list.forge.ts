import { html } from 'lit-html';
import { scaleControl } from '../../../.forge/common/controls';

const items = ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

const template = (args, updateArg) => {
  const itemSelected = (item: string) => {
    if (args.selectionMode === 'none') {
      return;
    }

    if (args.selectionMode === 'single') {
      updateArg('selected', [item]);
      return;
    }

    if (!args.selected.includes(item)) {
      updateArg('selected', [...args.selected, item]);
    } else {
      updateArg(
        'selected',
        args.selected.filter(i => i !== item),
      );
    }
  };

  return html`<dash-list
    style="width: 10rem;"
    max-items=${args.maxItems}
    selection-mode=${args.selectionMode}
    disable-deselect=${args.disableDeselect}
    scale=${args.scale}
    drag-enabled=${args.dragEnabled}
  >
    ${items.map(
      item =>
        html` <dash-list-item selected=${args.selected.includes(item)} @dashListItemSelectedChanged=${() => itemSelected(item)}>
          ${item} <dash-icon-button slot="actions-end" icon="pencil" scale="s"></dash-icon-button
        ></dash-list-item>`,
    )}
  </dash-list>`;
};

export const listDefinition = {
  name: '<dash-list>',
  controls: {
    selectionMode: {
      type: 'radio',
      options: ['single', 'multiple', 'none', 'no-selection'],
    },
    disableDeselect: {
      type: 'boolean',
    },
    dragEnabled: {
      type: 'boolean',
    },
    maxItems: {
      type: 'number',
    },
    scale: scaleControl,
  },
  argChanged: ({ arg, value, args, updateArg }) => {
    if (arg === 'selectionMode' && value === 'single' && args.selected.length > 1) {
      updateArg('selected', [args.selected[0]]);
    }
  },
  template,
  args: {
    maxItems: null,
    selectionMode: 'single',
    disableDeselect: false,
    dragEnabled: false,
    selected: ['Item 0'],
    scale: 'm',
  },
};

export default listDefinition;
