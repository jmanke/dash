# hellodash-label-color-picker



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description        | Type      | Default     |
| ----------- | --------- | ------------------ | --------- | ----------- |
| `allLabels` | --        |                    | `Label[]` | `[]`        |
| `color`     | `color`   | Color as hex value | `string`  | `undefined` |


## Events

| Event                                   | Description | Type                  |
| --------------------------------------- | ----------- | --------------------- |
| `hellodashLabelColorPickerColorChanged` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [hellodash-label-edit](../hellodash-label-edit)
 - [hellodash-label-select](../hellodash-label-select)

### Depends on

- dash-color-picker
- dash-button

### Graph
```mermaid
graph TD;
  hellodash-label-color-picker --> dash-color-picker
  hellodash-label-color-picker --> dash-button
  dash-color-picker --> dash-color-hue-picker
  dash-color-picker --> dash-button
  dash-color-picker --> dash-input
  dash-color-picker --> dash-color-swatch
  dash-button --> dash-icon
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-color-swatch --> dash-icon-button
  dash-color-swatch --> dash-icon
  hellodash-label-edit --> hellodash-label-color-picker
  hellodash-label-select --> hellodash-label-color-picker
  style hellodash-label-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
