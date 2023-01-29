# dash-fab



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description     | Type                        | Default     |
| -------- | --------- | --------------- | --------------------------- | ----------- |
| `icon`   | `icon`    | Icon to display | `string`                    | `undefined` |
| `scale`  | `scale`   | Size of the fab | `"l" \| "m" \| "s" \| "xl"` | `'m'`       |


## Dependencies

### Depends on

- [dash-icon-button](../dash-icon-button)

### Graph
```mermaid
graph TD;
  dash-fab --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  style dash-fab fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
