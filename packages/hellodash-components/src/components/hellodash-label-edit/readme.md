# hellodash-label-edit



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type    | Default     |
| -------- | --------- | ----------- | ------- | ----------- |
| `label`  | --        |             | `Label` | `undefined` |


## Events

| Event                            | Description | Type                 |
| -------------------------------- | ----------- | -------------------- |
| `hellodashLabelEditLabelDeleted` |             | `CustomEvent<Label>` |
| `hellodashLabelEditLabelUpdated` |             | `CustomEvent<Label>` |


## Dependencies

### Used by

 - [hellodash-edit-labels](../modals/hellodash-edit-labels)

### Depends on

- dash-dropdown
- dash-color-swatch
- [hellodash-label-color-picker](../hellodash-label-color-picker)
- dash-inline-edit
- dash-confirm-button

### Graph
```mermaid
graph TD;
  hellodash-label-edit --> dash-dropdown
  hellodash-label-edit --> dash-color-swatch
  hellodash-label-edit --> hellodash-label-color-picker
  hellodash-label-edit --> dash-inline-edit
  hellodash-label-edit --> dash-confirm-button
  dash-dropdown --> dash-popover
  dash-color-swatch --> dash-icon-button
  dash-color-swatch --> dash-icon
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  hellodash-label-color-picker --> dash-color-picker
  dash-color-picker --> dash-color-hue-picker
  dash-color-picker --> dash-button
  dash-color-picker --> dash-input
  dash-button --> dash-icon
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-inline-edit --> dash-button
  dash-inline-edit --> dash-input
  dash-confirm-button --> dash-icon-button
  hellodash-edit-labels --> hellodash-label-edit
  style hellodash-label-edit fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
