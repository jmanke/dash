# dash-color-picker



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default     |
| -------- | --------- | ----------- | --------- | ----------- |
| `colors` | --        |             | `Color[]` | `[]`        |
| `cols`   | `cols`    |             | `number`  | `undefined` |


## Events

| Event                         | Description | Type                                                                                                                               |
| ----------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `dashColorPickerColorChanged` |             | `CustomEvent<"baby-blue" \| "dark-blue" \| "green-apple" \| "green-grass" \| "orange" \| "pink" \| "purple" \| "red" \| "yellow">` |


## Dependencies

### Depends on

- [dash-color-swatch](../dash-color-swatch)

### Graph
```mermaid
graph TD;
  dash-color-picker --> dash-color-swatch
  dash-color-swatch --> dash-button
  dash-color-swatch --> dash-icon
  dash-button --> dash-icon
  style dash-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
