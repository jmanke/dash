import { html } from 'lit-html';

const template = (args, updateArg) =>
  html`<dash-textarea
    value=${args.value}
    resize=${args.resize}
    cols=${args.cols}
    rows=${args.rows}
    maxLength=${args.maxLength}
    placeholder=${args.placeholder}
    ?autofocus=${args.autofocus}
    ?readonly=${args.readonly}
    ?required=${args.required}
    @dashTextareaInput=${e => updateArg('value', e.detail)}
  ></dash-textarea>`;

export const textareaDefinition = {
  name: '<dash-textarea>',
  controls: {
    value: {
      type: 'text',
    },
    resize: {
      options: ['both', 'vertical', 'horizontal'],
      type: 'radio',
    },
    cols: {
      type: 'number',
    },
    rows: {
      type: 'number',
    },
    maxLength: {
      type: 'number',
    },
    placeholder: {
      type: 'text',
    },
    readonly: {
      type: 'boolean',
    },
    required: {
      type: 'boolean',
    },
  },
  template,
  args: {
    value: 'Example text',
    resize: 'both',
    cols: undefined,
    rows: undefined,
    maxLength: undefined,
    placeholder: 'Placeholder...',
    readonly: false,
    required: false,
  },
};

export default textareaDefinition;
