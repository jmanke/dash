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

### Graph
```mermaid
graph TD;
  dash-event-calendar-month --> dash-icon-button
  dash-event-calendar-month --> dash-button
  dash-event-calendar-month --> dash-list
  dash-event-calendar-month --> dash-list-item
  dash-event-calendar-month --> dash-popover
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  dash-list-item --> dash-icon
  style dash-event-calendar-month fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
