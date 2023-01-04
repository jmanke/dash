# dash-event-calendar-edit-event



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type            | Default     |
| -------- | --------- | ----------- | --------------- | ----------- |
| `event`  | --        |             | `CalendarEvent` | `undefined` |


## Events

| Event                                   | Description | Type                         |
| --------------------------------------- | ----------- | ---------------------------- |
| `dashEventCalendarEditEventEventUpdate` |             | `CustomEvent<CalendarEvent>` |


## Dependencies

### Depends on

- [dash-label](../../dash-label)
- [dash-input](../../dash-input)
- [dash-textarea](../../dash-textarea)
- [dash-date-picker](../../dash-date-picker)
- [dash-time-picker](../../dash-time-picker)

### Graph
```mermaid
graph TD;
  dash-event-calendar-edit-event --> dash-label
  dash-event-calendar-edit-event --> dash-input
  dash-event-calendar-edit-event --> dash-textarea
  dash-event-calendar-edit-event --> dash-date-picker
  dash-event-calendar-edit-event --> dash-time-picker
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
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
  style dash-event-calendar-edit-event fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*