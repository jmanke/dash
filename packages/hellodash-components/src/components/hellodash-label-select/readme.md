# hellodash-label-select



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type      | Default     |
| ---------------- | ------------------ | ----------- | --------- | ----------- |
| `allLabels`      | --                 |             | `Label[]` | `[]`        |
| `autoFocus`      | `auto-focus`       |             | `boolean` | `undefined` |
| `canCreateLabel` | `can-create-label` |             | `boolean` | `undefined` |
| `labels`         | --                 |             | `Label[]` | `[]`        |


## Events

| Event                              | Description | Type                 |
| ---------------------------------- | ----------- | -------------------- |
| `hellodashLabelSelectLabelAdded`   |             | `CustomEvent<Label>` |
| `hellodashLabelSelectLabelCreated` |             | `CustomEvent<Label>` |
| `hellodashLabelSelectLabelRemoved` |             | `CustomEvent<Label>` |
| `hellodashLabelSelectLabelUpdated` |             | `CustomEvent<Label>` |


## Dependencies

### Used by

 - [hellodash-modal-note](../modals/hellodash-modal-note)
 - [hellodash-note-edit-dropdown](../hellodash-note-card/hellodash-note-edit-dropdown)

### Depends on

- dash-list
- dash-list-item
- dash-color-swatch
- dash-button
- dash-drill-menu
- dash-filter
- [hellodash-label-color-picker](../hellodash-label-color-picker)

### Graph
```mermaid
graph TD;
  hellodash-label-select --> dash-list
  hellodash-label-select --> dash-list-item
  hellodash-label-select --> dash-color-swatch
  hellodash-label-select --> dash-button
  hellodash-label-select --> dash-drill-menu
  hellodash-label-select --> dash-filter
  hellodash-label-select --> hellodash-label-color-picker
  dash-list-item --> dash-icon
  dash-color-swatch --> dash-icon-button
  dash-color-swatch --> dash-icon
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  dash-drill-menu --> dash-icon-button
  dash-filter --> dash-input
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  hellodash-label-color-picker --> dash-color-picker
  dash-color-picker --> dash-color-swatch
  hellodash-modal-note --> hellodash-label-select
  hellodash-note-edit-dropdown --> hellodash-label-select
  style hellodash-label-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
