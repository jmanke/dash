# hellodash-nav-bar



<!-- Auto Generated Below -->


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `hellodashMenuToggled` |             | `CustomEvent<any>` |


## Methods

### `setFocus() => Promise<void>`

Sets focus on the menu button

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- dash-icon-button

### Graph
```mermaid
graph TD;
  hellodash-nav-bar --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  style hellodash-nav-bar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
