# dash-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                | Default     |
| ------------- | ------------- | ----------- | ------------------- | ----------- |
| `clearable`   | `clearable`   |             | `boolean`           | `undefined` |
| `debounce`    | `debounce`    |             | `number`            | `undefined` |
| `icon`        | `icon`        |             | `string`            | `undefined` |
| `placeholder` | `placeholder` |             | `string`            | `undefined` |
| `scale`       | `scale`       |             | `"l" \| "m" \| "s"` | `'m'`       |
| `type`        | `type`        |             | `string`            | `undefined` |
| `value`       | `value`       |             | `string`            | `undefined` |


## Events

| Event             | Description | Type                |
| ----------------- | ----------- | ------------------- |
| `dashInputChange` |             | `CustomEvent<void>` |
| `dashInputInput`  |             | `CustomEvent<void>` |
| `dashInputSubmit` |             | `CustomEvent<void>` |


## Methods

### `select() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dash-date-picker](../dash-date-picker)
 - [dash-event-calendar-edit-event](../dash-event-calendar/dash-event-calendar-edit-event)
 - [dash-filter](../dash-filter)
 - [dash-inline-edit](../dash-inline-edit)
 - [dash-time-picker](../dash-time-picker)

### Depends on

- [dash-icon](../dash-icon)
- [dash-icon-button](../dash-icon-button)

### Graph
```mermaid
graph TD;
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-date-picker --> dash-input
  dash-event-calendar-edit-event --> dash-input
  dash-filter --> dash-input
  dash-inline-edit --> dash-input
  dash-time-picker --> dash-input
  style dash-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
