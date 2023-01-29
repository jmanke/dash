# dash-color-swatch



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                    | Type                | Default     |
| ---------- | ---------- | -------------------------------------------------------------- | ------------------- | ----------- |
| `color`    | `color`    | Color of the swatch                                            | `string`            | `undefined` |
| `scale`    | `scale`    | Size of swatch                                                 | `"l" \| "m" \| "s"` | `'m'`       |
| `selected` | `selected` | When true, the swatch is selected and provides visual feedback | `boolean`           | `false`     |


## Methods

### `setFocus() => Promise<void>`

Sets focus on this element

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dash-color-picker](../dash-color-picker)

### Depends on

- [dash-icon-button](../dash-icon-button)
- [dash-icon](../dash-icon)

### Graph
```mermaid
graph TD;
  dash-color-swatch --> dash-icon-button
  dash-color-swatch --> dash-icon
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-color-picker --> dash-color-swatch
  style dash-color-swatch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
