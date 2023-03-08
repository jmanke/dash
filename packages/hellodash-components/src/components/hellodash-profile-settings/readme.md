# hellodash-profile-settings



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type   | Default     |
| -------- | --------- | ----------- | ------ | ----------- |
| `user`   | --        |             | `User` | `undefined` |


## Events

| Event                            | Description | Type                |
| -------------------------------- | ----------- | ------------------- |
| `hellodashProfileSettingsLogout` |             | `CustomEvent<void>` |


## Dependencies

### Depends on

- dash-dropdown
- dash-icon-button
- dash-list
- dash-list-item

### Graph
```mermaid
graph TD;
  hellodash-profile-settings --> dash-dropdown
  hellodash-profile-settings --> dash-icon-button
  hellodash-profile-settings --> dash-list
  hellodash-profile-settings --> dash-list-item
  dash-dropdown --> dash-popover
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-list-item --> dash-icon
  dash-list-item --> dash-icon-button
  style hellodash-profile-settings fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
