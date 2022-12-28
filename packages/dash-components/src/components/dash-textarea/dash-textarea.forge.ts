import { html } from 'lit-html';

const template = args =>
  html`<dash-textarea
    resize=${args.resize}
    cols=${args.cols}
    rows=${args.rows}
    maxLength=${args.maxLength}
    placeholder=${args.placeholder}
    ?autofocus=${args.autofocus}
    ?readonly=${args.readonly}
    ?required=${args.required}
  ></dash-textarea>`;

export const textareaDefinition = {
  name: '<dash-textarea>',
  controls: {
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
