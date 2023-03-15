import { html } from 'lit-html';

const template = args =>
  html`<hellodash-label-select
    .labels=${args.labels}
    .allLabels=${args.allLabels}
    can-create-label=${args.canCreateLabel}
    auto-focus=${args.autoFocus}
    @hellodashLabelSelectLabelAdded="${e => console.log('Add label', e.detail)}"
    @hellodashLabelSelectLabelRemoved=${e => console.log('Remove label', e.detail)}
    @hellodashLabelSelectLabelCreated=${e => console.log('Create label', e.detail)}
    @hellodashLabelSelectLabelUpdated=${e => console.log('Update label', e.detail)}
  ></hellodash-label-select>`;

export const labelSelect = {
  name: '<hellodash-label-select>',
  controls: {
    labels: { type: 'json' },
    allLabels: { type: 'json' },
    canCreateLabel: { type: 'boolean' },
    autoFocus: { type: 'boolean' },
  },
  template,
  args: {
    labels: [
      {
        id: '1',
        text: 'Label 1',
        color: '#af6566',
      },
    ],
    allLabels: [
      {
        id: '1',
        text: 'Label 1',
        color: '#af6566',
      },
      {
        id: '2',
        text: 'Label 2',
        color: '#af6566',
      },
      {
        id: '3',
        text: 'Label 3',
        color: '#af6566',
      },
    ],
    canCreateLabel: false,
    autoFocus: false,
  },
};

export default labelSelect;
