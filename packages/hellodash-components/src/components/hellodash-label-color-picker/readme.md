# hellodash-label-color-picker



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                                                                                                  | Default     |
| -------- | --------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | ----------- |
| `color`  | `color`   |             | `"baby-blue" \| "dark-blue" \| "green-apple" \| "green-grass" \| "orange" \| "pink" \| "purple" \| "red" \| "yellow"` | `undefined` |


## Events

| Event                                   | Description | Type                                                                                                                               |
| --------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `hellodashLabelColorPickerColorChanged` |             | `CustomEvent<"baby-blue" \| "dark-blue" \| "green-apple" \| "green-grass" \| "orange" \| "pink" \| "purple" \| "red" \| "yellow">` |


## Dependencies

### Used by

 - [hellodash-label-edit](../hellodash-label-edit)
 - [hellodash-label-select](../hellodash-label-select)

### Depends on

- dash-color-picker

### Graph
```mermaid
graph TD;
  hellodash-label-color-picker --> dash-color-picker
  dash-color-picker --> dash-color-hue-picker
  dash-color-picker --> dash-button
  dash-color-picker --> dash-input
  dash-button --> dash-icon
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  hellodash-label-edit --> hellodash-label-color-picker
  hellodash-label-select --> hellodash-label-color-picker
  style hellodash-label-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
