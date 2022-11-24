import { html } from 'lit-html';
import { scaleControl } from '../../../.forge/common/controls';

const template = args => html`<dash-filter style="width: 20rem;" scale=${args.scale} placeholder=${args.placeholder} obj-key="id" debounce=${args.debounce}></dash-filter>`;

export const filterDefinition = {
  name: 'Filter',
  controls: {
    scale: scaleControl,
    placeholder: { type: 'text' },
    debounce: { type: 'number' },
  },
  template,
  args: {
    scale: 'm',
    placeholder: '',
    debounce: 250,
  },
};

export default filterDefinition;
