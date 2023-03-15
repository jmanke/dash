import { html } from 'lit-html';

const template = (args, updateArg) =>
  html`<hellodash-label-edit
    .label=${args.label}
    @hellodashLabelEditLabelUpdated="${e => updateArg('label', e.detail)}"
    @hellodashLabelEditLabelDeleted=${() => console.log('Delete label')}
  ></hellodash-label-edit>`;

export const labelEdit = {
  name: '<hellodash-label-edit>',
  controls: {
    label: { type: 'json' },
  },
  template,
  args: {
    label: {
      id: '1',
      text: 'Label 1',
      color: '#af6566',
    },
  },
};

export default labelEdit;
