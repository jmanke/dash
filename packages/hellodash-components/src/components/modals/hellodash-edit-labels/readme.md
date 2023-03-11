# hellodash-edit-labels



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type      | Default     |
| --------------- | ---------------- | ----------- | --------- | ----------- |
| `creatingLabel` | `creating-label` |             | `boolean` | `undefined` |
| `labels`        | --               |             | `Label[]` | `[]`        |


## Events

| Event                                | Description | Type                                            |
| ------------------------------------ | ----------- | ----------------------------------------------- |
| `dashModalBeforeClose`               |             | `CustomEvent<any>`                              |
| `dashModalClosed`                    |             | `CustomEvent<any>`                              |
| `hellodashEditLabelsCreateLabel`     |             | `CustomEvent<{ color: string; text: string; }>` |
| `hellodashEditLabelsDeleteLabel`     |             | `CustomEvent<Label>`                            |
| `hellodashEditLabelsLabelsReordered` |             | `CustomEvent<Label[]>`                          |
| `hellodashEditLabelsUpdateLabel`     |             | `CustomEvent<Label>`                            |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- dash-modal
- dash-input
- dash-icon-button
- dash-tooltip
- dash-list
- dash-list-item
- [hellodash-label-edit](../../hellodash-label-edit)

### Graph
```mermaid
graph TD;
  hellodash-edit-labels --> dash-modal
  hellodash-edit-labels --> dash-input
  hellodash-edit-labels --> dash-icon-button
  hellodash-edit-labels --> dash-tooltip
  hellodash-edit-labels --> dash-list
  hellodash-edit-labels --> dash-list-item
  hellodash-edit-labels --> hellodash-label-edit
  dash-modal --> dash-scrim
  dash-modal --> dash-focus-trap
  dash-modal --> dash-icon-button
  dash-modal --> dash-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-list-item --> dash-icon
  dash-list-item --> dash-icon-button
  hellodash-label-edit --> dash-dropdown
  hellodash-label-edit --> dash-color-swatch
  hellodash-label-edit --> hellodash-label-color-picker
  hellodash-label-edit --> dash-inline-edit
  hellodash-label-edit --> dash-confirm-button
  dash-dropdown --> dash-popover
  dash-color-swatch --> dash-icon-button
  dash-color-swatch --> dash-icon
  hellodash-label-color-picker --> dash-color-picker
  hellodash-label-color-picker --> dash-button
  dash-color-picker --> dash-color-hue-picker
  dash-color-picker --> dash-button
  dash-color-picker --> dash-input
  dash-color-picker --> dash-color-swatch
  dash-inline-edit --> dash-button
  dash-inline-edit --> dash-input
  dash-confirm-button --> dash-icon-button
  style hellodash-edit-labels fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
