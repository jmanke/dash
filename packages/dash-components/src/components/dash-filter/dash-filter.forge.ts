import { html } from 'lit-html';
import { scaleControl } from '../../../.forge/common/controls';

const template = args => html`<dash-filter
  style="width: 20rem;"
  scale=${args.scale}
  placeholder=${args.placeholder}
  obj-key="name"
  .items=${args.items}
  debounce=${args.debounce}
  @dashFilterValueChanged="${e => console.log('filterValueChanged', e.target.filterValue)}"
  @dashFilterSubmit="${e => console.log('filterSubmit', e.target.filterValue)}"
  @dashFilterFilteredItems="${e => console.log('filterItemsChanged', e.detail)}"
></dash-filter>`;

export const filterDefinition = {
  name: '<dash-filter>',
  controls: {
    scale: scaleControl,
    placeholder: { type: 'text' },
    debounce: { type: 'number' },
    items: {
      type: 'json',
    },
  },
  template,
  args: {
    scale: 'm',
    placeholder: '',
    debounce: 250,
    items: [
      {
        name: 'Item 1',
      },
      {
        name: 'Item 2',
      },
      {
        name: 'Thing 1',
      },
      {
        name: 'Hey',
      },
    ],
  },
};

export default filterDefinition;
