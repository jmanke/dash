# dash-color-picker



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                                                                                                  | Default     |
| -------- | --------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | ----------- |
| `color`  | `color`   |             | `"baby-blue" \| "dark-blue" \| "green-apple" \| "green-grass" \| "orange" \| "pink" \| "purple" \| "red" \| "yellow"` | `undefined` |
| `colors` | --        |             | `Color[]`                                                                                                             | `[]`        |
| `cols`   | `cols`    |             | `number`                                                                                                              | `undefined` |


## Events

| Event                         | Description | Type                |
| ----------------------------- | ----------- | ------------------- |
| `dashColorPickerColorChanged` |             | `CustomEvent<void>` |


## Dependencies

### Depends on

- [dash-color-swatch](../dash-color-swatch)

### Graph
```mermaid
graph TD;
  dash-color-picker --> dash-color-swatch
  dash-color-swatch --> dash-icon-button
  dash-color-swatch --> dash-icon
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  style dash-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
