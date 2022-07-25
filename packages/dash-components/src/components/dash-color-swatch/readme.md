# dash-color-swatch



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                        | Default     |
| ---------- | ---------- | ----------- | --------------------------- | ----------- |
| `color`    | `color`    |             | `string`                    | `undefined` |
| `scale`    | `scale`    |             | `"l" \| "m" \| "s" \| "xl"` | `undefined` |
| `selected` | `selected` |             | `boolean`                   | `undefined` |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dash-color-picker](../dash-color-picker)

### Depends on

- [dash-button](../dash-button)
- [dash-icon](../dash-icon)

### Graph
```mermaid
graph TD;
  dash-color-swatch --> dash-button
  dash-color-swatch --> dash-icon
  dash-button --> dash-icon
  dash-color-picker --> dash-color-swatch
  style dash-color-swatch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
