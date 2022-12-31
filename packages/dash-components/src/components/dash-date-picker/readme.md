# dash-date-picker



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                            | Type                    | Default                                              |
| --------------- | ----------------- | ------------------------------------------------------ | ----------------------- | ---------------------------------------------------- |
| `closeOnSelect` | `close-on-select` | Close the date picker dropdown when a date is selected | `boolean`               | `true`                                               |
| `date`          | `date`            |                                                        | `string`                | `new Date().toISOString()`                           |
| `format`        | --                | format of date picker label                            | `DateTimeFormatOptions` | `{ month: 'long', weekday: 'long', day: 'numeric' }` |


## Events

| Event                      | Description | Type                |
| -------------------------- | ----------- | ------------------- |
| `dashDatePickerDateChange` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [dash-event-calendar-edit-event](../dash-event-calendar/dash-event-calendar-edit-event)

### Depends on

- [dash-dropdown](../dash-dropdown)
- [dash-input](../dash-input)
- [dash-icon-button](../dash-icon-button)
- [dash-button](../dash-button)

### Graph
```mermaid
graph TD;
  dash-date-picker --> dash-dropdown
  dash-date-picker --> dash-input
  dash-date-picker --> dash-icon-button
  dash-date-picker --> dash-button
  dash-dropdown --> dash-popover
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  dash-event-calendar-edit-event --> dash-date-picker
  style dash-date-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
