# dash-button



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                        | Type                   | Default     |
| ------------ | ------------ | ------------------------------------------------------------------ | ---------------------- | ----------- |
| `appearance` | `appearance` | Visible appearance of the button                                   | `"clear" \| "outline"` | `'clear'`   |
| `disabled`   | `disabled`   | When `true`, disables interaction                                  | `boolean`              | `false`     |
| `endIcon`    | `end-icon`   | Icon displayed at the end of the button                            | `string`               | `undefined` |
| `href`       | `href`       | When provided, button will behave as a link                        | `string`               | `undefined` |
| `scale`      | `scale`      | Size of button                                                     | `"l" \| "m" \| "s"`    | `'m'`       |
| `startIcon`  | `start-icon` | Icon displayed at the start of the button                          | `string`               | `undefined` |
| `status`     | `status`     | Status of the button shown with various styles                     | `"error" \| "success"` | `undefined` |
| `target`     | `target`     | Target location of the link. Only functional if `href` is provided | `string`               | `undefined` |


## Methods

### `setFocus() => Promise<void>`

Sets focus on this element

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dash-carousel](../dash-carousel)
 - [dash-color-picker](../dash-color-picker)
 - [dash-inline-edit](../dash-inline-edit)
 - [dash-modal](../dash-modal)

### Depends on

- [dash-icon](../dash-icon)

### Graph
```mermaid
graph TD;
  dash-button --> dash-icon
  dash-carousel --> dash-button
  dash-color-picker --> dash-button
  dash-inline-edit --> dash-button
  dash-modal --> dash-button
  style dash-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
