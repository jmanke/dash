# dash-popover



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type                                                                                                                                                                                                         | Default      |
| ------------------- | -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `active`            | `active`             |             | `boolean`                                                                                                                                                                                                    | `undefined`  |
| `autoClose`         | `auto-close`         |             | `boolean`                                                                                                                                                                                                    | `undefined`  |
| `offsetX`           | `offset-x`           |             | `number`                                                                                                                                                                                                     | `undefined`  |
| `offsetY`           | `offset-y`           |             | `number`                                                                                                                                                                                                     | `undefined`  |
| `placement`         | `placement`          |             | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'`   |
| `placementStrategy` | `placement-strategy` |             | `"absolute" \| "fixed"`                                                                                                                                                                                      | `'absolute'` |
| `target`            | `target`             |             | `HTMLElement \| string`                                                                                                                                                                                      | `undefined`  |


## Events

| Event              | Description | Type                             |
| ------------------ | ----------- | -------------------------------- |
| `dashPopoverClose` |             | `CustomEvent<PopoverCloseEvent>` |
| `dashPopoverOpen`  |             | `CustomEvent<any>`               |


## Dependencies

### Used by

 - [dash-dropdown](../dash-dropdown)
 - [dash-tooltip](../dash-tooltip)

### Graph
```mermaid
graph TD;
  dash-dropdown --> dash-popover
  dash-tooltip --> dash-popover
  style dash-popover fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
