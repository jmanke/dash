# dash-carousel



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description                | Type                          | Default     |
| ------------- | --------- | -------------------------- | ----------------------------- | ----------- |
| `currentItem` | --        | The carousel current item. | `HTMLDashCarouselItemElement` | `undefined` |


## Events

| Event                    | Description | Type                |
| ------------------------ | ----------- | ------------------- |
| `dashCarouselItemChange` |             | `CustomEvent<void>` |


## Dependencies

### Depends on

- [dash-icon-button](../dash-icon-button)
- [dash-indicator-button](../dash-indicator-button)

### Graph
```mermaid
graph TD;
  dash-carousel --> dash-icon-button
  dash-carousel --> dash-indicator-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-indicator-button --> dash-button
  dash-button --> dash-icon
  style dash-carousel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
