# dash-list-item



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                               | Default     |
| --------------- | ---------------- | ----------- | ---------------------------------- | ----------- |
| `disabled`      | `disabled`       |             | `boolean`                          | `undefined` |
| `selected`      | `selected`       |             | `boolean`                          | `false`     |
| `selectionMode` | `selection-mode` |             | `"multiple" \| "none" \| "single"` | `'single'`  |


## Events

| Event                         | Description | Type                                   |
| ----------------------------- | ----------- | -------------------------------------- |
| `dashListItemMoveNext`        |             | `CustomEvent<HTMLDashListItemElement>` |
| `dashListItemMovePrevious`    |             | `CustomEvent<HTMLDashListItemElement>` |
| `dashListItemSelectedChanged` |             | `CustomEvent<boolean>`                 |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [dash-icon](../dash-icon)

### Graph
```mermaid
graph TD;
  dash-list-item --> dash-icon
  style dash-list-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
