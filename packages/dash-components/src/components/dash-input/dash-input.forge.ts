import { html } from 'lit-html';
import { iconControl, scaleControl } from '../../../../../.forge/common/controls';

const template = (args, updateArg) =>
  html`<dash-input
    style="width: 12rem;"
    scale=${args.scale}
    value=${args.value}
    placeholder=${args.placeholder}
    icon=${args.icon}
    debounce=${args.debounce}
    type=${args.type}
    ?clearable=${args.clearable}
    @dashInputInput=${e => {
      updateArg('value', e.target.value);
    }}
  ></dash-input> `;

export const inputDefinition = {
  name: '<dash-input>',
  controls: {
    scale: scaleControl,
    value: { type: 'text' },
    placeholder: { type: 'text' },
    type: { type: 'text' },
    icon: iconControl,
    debounce: { type: 'number' },
    clearable: { type: 'boolean' },
  },
  template,
  args: {
    scale: 'm',
    placeholder: 'Test placeholder...',
    icon: 'plus',
    debounce: 250,
    clearable: false,
    type: 'text',
    value: 'Test value',
  },
};

export default inputDefinition;
