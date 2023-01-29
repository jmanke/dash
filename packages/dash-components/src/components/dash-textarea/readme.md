# dash-textarea



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                            | Type                                   | Default     |
| ------------- | ------------- | ------------------------------------------------------ | -------------------------------------- | ----------- |
| `cols`        | `cols`        | text-area cols                                         | `number`                               | `undefined` |
| `placeholder` | `placeholder` | Placeholder text when there is no current value        | `string`                               | `undefined` |
| `readonly`    | `readonly`    | When true, disables updating the text-area value       | `boolean`                              | `undefined` |
| `required`    | `required`    | When true, a value is required for forms               | `boolean`                              | `undefined` |
| `resize`      | `resize`      | Determines how the text area can be resized, if at all | `"both" \| "horizontal" \| "vertical"` | `'both'`    |
| `rows`        | `rows`        | text-area rows                                         | `number`                               | `undefined` |
| `value`       | `value`       | Text of the text-area                                  | `string`                               | `undefined` |


## Events

| Event               | Description                          | Type               |
| ------------------- | ------------------------------------ | ------------------ |
| `dashTextareaInput` | Emitted when text area value changes | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dash-event-calendar-edit-event](../dash-event-calendar/dash-event-calendar-edit-event)

### Graph
```mermaid
graph TD;
  dash-event-calendar-edit-event --> dash-textarea
  style dash-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
