# dash-icon-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                        | Default     |
| ---------- | ---------- | ----------- | --------------------------- | ----------- |
| `disabled` | `disabled` |             | `boolean`                   | `undefined` |
| `icon`     | `icon`     |             | `string`                    | `undefined` |
| `iconUrl`  | `icon-url` |             | `string`                    | `undefined` |
| `loading`  | `loading`  |             | `boolean`                   | `undefined` |
| `scale`    | `scale`    |             | `"l" \| "m" \| "s" \| "xl"` | `undefined` |
| `type`     | `type`     |             | `string`                    | `undefined` |
| `width`    | `width`    |             | `number`                    | `undefined` |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dash-drill-menu](../dash-drill-menu)
 - [dash-fab](../dash-fab)
 - [dash-input](../dash-input)

### Depends on

- [dash-icon](../dash-icon)
- [dash-loader](../dash-loader)

### Graph
```mermaid
graph TD;
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-drill-menu --> dash-icon-button
  dash-fab --> dash-icon-button
  dash-input --> dash-icon-button
  style dash-icon-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
