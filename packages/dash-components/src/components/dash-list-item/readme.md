# dash-list-item



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                               | Default     |
| --------------- | ---------------- | ----------- | ---------------------------------- | ----------- |
| `disabled`      | `disabled`       |             | `boolean`                          | `undefined` |
| `scale`         | `scale`          |             | `"l" \| "m" \| "s"`                | `'m'`       |
| `selected`      | `selected`       |             | `boolean`                          | `false`     |
| `selectionMode` | `selection-mode` |             | `"multiple" \| "none" \| "single"` | `'single'`  |


## Events

| Event                              | Description | Type                |
| ---------------------------------- | ----------- | ------------------- |
| `dashInternalListItemMoveNext`     |             | `CustomEvent<void>` |
| `dashInternalListItemMovePrevious` |             | `CustomEvent<void>` |
| `dashListItemSelectedChanged`      |             | `CustomEvent<void>` |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dash-event-calendar-month](../dash-event-calendar/dash-event-calendar-month)
 - [dash-time-picker](../dash-time-picker)

### Depends on

- [dash-icon](../dash-icon)

### Graph
```mermaid
graph TD;
  dash-list-item --> dash-icon
  dash-event-calendar-month --> dash-list-item
  dash-time-picker --> dash-list-item
  style dash-list-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
