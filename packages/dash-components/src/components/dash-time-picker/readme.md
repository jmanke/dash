# dash-time-picker



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default                                |
| -------- | --------- | ----------- | -------- | -------------------------------------- |
| `time`   | `time`    |             | `string` | `startOfDay(new Date()).toISOString()` |


## Events

| Event                      | Description | Type                |
| -------------------------- | ----------- | ------------------- |
| `dashTimePickerTimeChange` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [dash-event-calendar-edit-event](../dash-event-calendar/dash-event-calendar-edit-event)

### Depends on

- [dash-dropdown](../dash-dropdown)
- [dash-input](../dash-input)
- [dash-list](../dash-list)
- [dash-list-item](../dash-list-item)

### Graph
```mermaid
graph TD;
  dash-time-picker --> dash-dropdown
  dash-time-picker --> dash-input
  dash-time-picker --> dash-list
  dash-time-picker --> dash-list-item
  dash-dropdown --> dash-popover
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-list-item --> dash-icon
  dash-event-calendar-edit-event --> dash-time-picker
  style dash-time-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
