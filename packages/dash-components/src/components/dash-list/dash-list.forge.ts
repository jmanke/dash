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

  return html`<dash-list style="width: 10rem;" selection-mode=${args.selectionMode} scale=${args.scale}>
    ${items.map(item => html` <dash-list-item selected=${args.selected.includes(item)} @dashListItemSelectedChanged=${() => itemSelected(item)}>${item}</dash-list-item>`)}
  </dash-list>`;
};

export const listDefinition = {
  name: '<dash-list>',
  controls: {
    selectionMode: {
      type: 'radio',
      options: ['single', 'multiple', 'none'],
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
    selectionMode: 'single',
    selected: ['Item 0'],
    scale: 'm',
  },
};

export default listDefinition;
