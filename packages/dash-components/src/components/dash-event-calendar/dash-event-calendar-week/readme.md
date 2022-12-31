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

### Graph
```mermaid
graph TD;
  dash-event-calendar-week --> dash-icon-button
  dash-event-calendar-week --> dash-popover
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  style dash-event-calendar-week fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
