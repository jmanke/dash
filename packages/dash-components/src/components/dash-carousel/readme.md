# dash-carousel



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                    | Type     | Default |
| -------- | --------- | ------------------------------ | -------- | ------- |
| `index`  | `index`   | The index of the current item. | `number` | `0`     |


## Dependencies

### Depends on

- [dash-icon-button](../dash-icon-button)
- [dash-button](../dash-button)

### Graph
```mermaid
graph TD;
  dash-carousel --> dash-icon-button
  dash-carousel --> dash-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  style dash-carousel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
