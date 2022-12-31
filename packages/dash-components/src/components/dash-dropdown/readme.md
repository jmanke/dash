# dash-dropdown



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                         | Type                                                                                                                                                                                                         | Default      |
| ------------------- | -------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `autoClose`         | `auto-close`         |                                     | `boolean`                                                                                                                                                                                                    | `undefined`  |
| `autoFocus`         | `auto-focus`         | Auto focus dropdown content on open | `boolean`                                                                                                                                                                                                    | `true`       |
| `open`              | `open`               |                                     | `boolean`                                                                                                                                                                                                    | `false`      |
| `placement`         | `placement`          |                                     | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'`   |
| `placementStrategy` | `placement-strategy` |                                     | `"absolute" \| "fixed"`                                                                                                                                                                                      | `'absolute'` |


## Events

| Event                    | Description | Type                |
| ------------------------ | ----------- | ------------------- |
| `dashDropdownOpenChange` |             | `CustomEvent<void>` |


## Methods

### `close(focusTarget?: boolean) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dash-date-picker](../dash-date-picker)
 - [dash-time-picker](../dash-time-picker)

### Depends on

- [dash-popover](../dash-popover)

### Graph
```mermaid
graph TD;
  dash-dropdown --> dash-popover
  dash-date-picker --> dash-dropdown
  dash-time-picker --> dash-dropdown
  style dash-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
