# dash-event-calendar-day



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
| `dashEventCalendarNextDay`     |             | `CustomEvent<void>`                 |
| `dashEventCalendarPrevDay`     |             | `CustomEvent<void>`                 |


## Dependencies

### Depends on

- [dash-icon-button](../../dash-icon-button)
- [dash-popover](../../dash-popover)

### Graph
```mermaid
graph TD;
  dash-event-calendar-day --> dash-icon-button
  dash-event-calendar-day --> dash-popover
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  style dash-event-calendar-day fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
