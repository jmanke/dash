import { html } from 'lit-html';
import { scaleControl } from '../../../.forge/common/controls';

const template = (args, updateArg) =>
  html`<dash-inline-edit
    style="width: 12rem;"
    value=${args.value}
    scale=${args.scale}
    ?disabled=${args.disabled}
    @dashInlineEditValueChanged=${e => updateArg('value', e.detail)}
  ></dash-inline-edit>`;

export const inlineEditDefinition = {
  name: '<dash-inline-edit>',
  controls: {
    scale: scaleControl,
    disabled: { type: 'boolean' },
    value: { type: 'text' },
  },
  template,
  args: {
    scale: 'm',
    disabled: false,
    value: 'Test value',
  },
};

export default inlineEditDefinition;
