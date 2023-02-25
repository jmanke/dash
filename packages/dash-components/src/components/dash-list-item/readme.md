# dash-list-item



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                             | Type      | Default     |
| ----------------- | ------------------ | --------------------------------------- | --------- | ----------- |
| `disableDeselect` | `disable-deselect` | Whether the list item can be deselected | `boolean` | `undefined` |
| `disabled`        | `disabled`         | When `true`, interaction is disabled    | `boolean` | `undefined` |
| `selected`        | `selected`         | When `true`, list-item is selected      | `boolean` | `false`     |


## Events

| Event                         | Description                       | Type                |
| ----------------------------- | --------------------------------- | ------------------- |
| `dashListItemSelectedChanged` | Emitted when selected has changed | `CustomEvent<void>` |


## Methods

### `setFocus() => Promise<void>`

Sets focus on this element

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
