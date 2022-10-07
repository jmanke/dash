# dash-drill-menu



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `active`       | `active`        |             | `boolean` | `undefined` |
| `drillHeading` | `drill-heading` |             | `string`  | `undefined` |


## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `dashDrillMenuClosed` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [dash-icon-button](../dash-icon-button)

### Graph
```mermaid
graph TD;
  dash-drill-menu --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  style dash-drill-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
