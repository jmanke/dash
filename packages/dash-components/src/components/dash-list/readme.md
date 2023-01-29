# dash-list



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                            | Type                               | Default     |
| --------------- | ---------------- | ---------------------------------------------------------------------- | ---------------------------------- | ----------- |
| `maxItems`      | `max-items`      | Number of items to show in the list - a scrollbar appears for overflow | `number`                           | `undefined` |
| `scale`         | `scale`          | Size of the list and its items                                         | `"l" \| "m" \| "s"`                | `'m'`       |
| `selectionMode` | `selection-mode` | Selection mode of the list and its items                               | `"multiple" \| "none" \| "single"` | `'single'`  |


## Dependencies

### Used by

 - [dash-event-calendar-month](../dash-event-calendar/dash-event-calendar-month)
 - [dash-time-picker](../dash-time-picker)

### Graph
```mermaid
graph TD;
  dash-event-calendar-month --> dash-list
  dash-time-picker --> dash-list
  style dash-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
