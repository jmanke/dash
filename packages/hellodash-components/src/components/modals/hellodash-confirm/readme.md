# hellodash-confirm



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description | Type                   | Default     |
| --------------------- | ----------------------- | ----------- | ---------------------- | ----------- |
| `cancelText`          | `cancel-text`           |             | `string`               | `undefined` |
| `confirmButtonStatus` | `confirm-button-status` |             | `"error" \| "success"` | `'error'`   |
| `confirmText`         | `confirm-text`          |             | `string`               | `undefined` |
| `heading`             | `heading`               |             | `string`               | `undefined` |


## Events

| Event                       | Description | Type               |
| --------------------------- | ----------- | ------------------ |
| `dashModalBeforeClose`      |             | `CustomEvent<any>` |
| `dashModalClosed`           |             | `CustomEvent<any>` |
| `hellodashConfirmConfirmed` |             | `CustomEvent<any>` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- dash-modal
- dash-button

### Graph
```mermaid
graph TD;
  hellodash-confirm --> dash-modal
  hellodash-confirm --> dash-button
  dash-modal --> dash-scrim
  dash-modal --> dash-focus-trap
  dash-modal --> dash-icon-button
  dash-modal --> dash-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  style hellodash-confirm fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
