# dash-inline-edit



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                | Default     |
| ---------- | ---------- | ----------- | ------------------- | ----------- |
| `disabled` | `disabled` |             | `boolean`           | `undefined` |
| `scale`    | `scale`    |             | `"l" \| "m" \| "s"` | `undefined` |
| `value`    | `value`    |             | `string`            | `undefined` |


## Events

| Event                        | Description | Type                |
| ---------------------------- | ----------- | ------------------- |
| `dashInlineEditValueChanged` |             | `CustomEvent<void>` |


## Dependencies

### Depends on

- [dash-button](../dash-button)
- [dash-input](../dash-input)

### Graph
```mermaid
graph TD;
  dash-inline-edit --> dash-button
  dash-inline-edit --> dash-input
  dash-button --> dash-icon
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  style dash-inline-edit fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
