# dash-event-calendar-month



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type              | Default     |
| -------- | --------- | ----------- | ----------------- | ----------- |
| `date`   | `date`    |             | `string`          | `undefined` |
| `events` | --        |             | `CalendarEvent[]` | `[]`        |


## Events

| Event                          | Description | Type                                |
| ------------------------------ | ----------- | ----------------------------------- |
| `dashEventCalendarDeleteEvent` |             | `CustomEvent<{ eventId: string; }>` |
| `dashEventCalendarEditEvent`   |             | `CustomEvent<{ eventId: string; }>` |
| `dashEventCalendarNextMonth`   |             | `CustomEvent<void>`                 |
| `dashEventCalendarPrevMonth`   |             | `CustomEvent<void>`                 |


## Dependencies

### Depends on

- [dash-icon-button](../../dash-icon-button)
- [dash-button](../../dash-button)
- [dash-list](../../dash-list)
- [dash-list-item](../../dash-list-item)
- [dash-popover](../../dash-popover)
- [dash-event-calendar-edit-event](../dash-event-calendar-edit-event)

### Graph
```mermaid
graph TD;
  dash-event-calendar-month --> dash-icon-button
  dash-event-calendar-month --> dash-button
  dash-event-calendar-month --> dash-list
  dash-event-calendar-month --> dash-list-item
  dash-event-calendar-month --> dash-popover
  dash-event-calendar-month --> dash-event-calendar-edit-event
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  dash-list-item --> dash-icon
  dash-list-item --> dash-icon-button
  dash-event-calendar-edit-event --> dash-label
  dash-event-calendar-edit-event --> dash-input
  dash-event-calendar-edit-event --> dash-textarea
  dash-event-calendar-edit-event --> dash-date-picker
  dash-event-calendar-edit-event --> dash-time-picker
  dash-event-calendar-edit-event --> dash-button
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-date-picker --> dash-dropdown
  dash-date-picker --> dash-input
  dash-date-picker --> dash-icon-button
  dash-date-picker --> dash-button
  dash-dropdown --> dash-popover
  dash-time-picker --> dash-dropdown
  dash-time-picker --> dash-input
  dash-time-picker --> dash-list
  dash-time-picker --> dash-list-item
  style dash-event-calendar-month fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
