# dash-modal



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                        | Description | Type                | Default     |
| ----------------------------- | -------------------------------- | ----------- | ------------------- | ----------- |
| `autoFocus`                   | `auto-focus`                     |             | `boolean`           | `undefined` |
| `disableFullscreenMobileView` | `disable-fullscreen-mobile-view` |             | `boolean`           | `undefined` |
| `fullscreen`                  | `fullscreen`                     |             | `boolean`           | `undefined` |
| `heading`                     | `heading`                        |             | `string`            | `undefined` |
| `hideCloseButton`             | `hide-close-button`              |             | `boolean`           | `undefined` |
| `open`                        | `open`                           |             | `boolean`           | `undefined` |
| `scale`                       | `scale`                          |             | `"l" \| "m" \| "s"` | `'m'`       |


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `dashModalBeforeClose` |             | `CustomEvent<any>` |
| `dashModalClosed`      |             | `CustomEvent<any>` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [dash-scrim](../dash-scrim)
- [dash-focus-trap](../dash-focus-trap)
- [dash-icon-button](../dash-icon-button)
- [dash-button](../dash-button)

### Graph
```mermaid
graph TD;
  dash-modal --> dash-scrim
  dash-modal --> dash-focus-trap
  dash-modal --> dash-icon-button
  dash-modal --> dash-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  style dash-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
