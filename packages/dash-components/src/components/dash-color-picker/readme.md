# dash-color-picker



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute | Description        | Type       | Default     |
| --------------- | --------- | ------------------ | ---------- | ----------- |
| `color`         | `color`   | Color as hex value | `string`   | `undefined` |
| `defaultColors` | --        | Default colors     | `string[]` | `[]`        |


## Events

| Event                         | Description                          | Type                |
| ----------------------------- | ------------------------------------ | ------------------- |
| `dashColorPickerColorChanged` | Emitted when color has been selected | `CustomEvent<void>` |


## Dependencies

### Depends on

- [dash-color-hue-picker](../dash-color-hue-picker)
- [dash-button](../dash-button)
- [dash-input](../dash-input)
- [dash-color-swatch](../dash-color-swatch)

### Graph
```mermaid
graph TD;
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
  style dash-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
