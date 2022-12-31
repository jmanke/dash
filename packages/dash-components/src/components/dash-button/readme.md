# dash-button



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type                   | Default     |
| ------------ | ------------ | ----------- | ---------------------- | ----------- |
| `appearance` | `appearance` |             | `"clear" \| "outline"` | `'clear'`   |
| `disabled`   | `disabled`   |             | `boolean`              | `undefined` |
| `scale`      | `scale`      |             | `"l" \| "m" \| "s"`    | `undefined` |
| `startIcon`  | `start-icon` |             | `string`               | `undefined` |
| `status`     | `status`     |             | `"error" \| "success"` | `undefined` |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dash-date-picker](../dash-date-picker)
 - [dash-event-calendar-month](../dash-event-calendar/dash-event-calendar-month)
 - [dash-inline-edit](../dash-inline-edit)
 - [dash-modal](../dash-modal)

### Depends on

- [dash-icon](../dash-icon)

### Graph
```mermaid
graph TD;
  dash-button --> dash-icon
  dash-date-picker --> dash-button
  dash-event-calendar-month --> dash-button
  dash-inline-edit --> dash-button
  dash-modal --> dash-button
  style dash-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
