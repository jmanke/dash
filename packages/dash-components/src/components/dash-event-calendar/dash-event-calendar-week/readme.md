# dash-event-calendar-week



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
| `dashEventCalendarNextWeek`    |             | `CustomEvent<void>`                 |
| `dashEventCalendarPrevWeek`    |             | `CustomEvent<void>`                 |


## Dependencies

### Depends on

- [dash-icon-button](../../dash-icon-button)
- [dash-popover](../../dash-popover)
- [dash-event-calendar-edit-event](../dash-event-calendar-edit-event)

### Graph
```mermaid
graph TD;
  dash-event-calendar-week --> dash-icon-button
  dash-event-calendar-week --> dash-popover
  dash-event-calendar-week --> dash-event-calendar-edit-event
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
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
  dash-button --> dash-icon
  dash-time-picker --> dash-dropdown
  dash-time-picker --> dash-input
  dash-time-picker --> dash-list
  dash-time-picker --> dash-list-item
  dash-list-item --> dash-icon
  style dash-event-calendar-week fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*