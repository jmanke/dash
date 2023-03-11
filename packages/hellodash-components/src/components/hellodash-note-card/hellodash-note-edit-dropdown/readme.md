# hellodash-note-edit-dropdown



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description | Type      | Default     |
| ----------- | --------- | ----------- | --------- | ----------- |
| `allLabels` | --        |             | `Label[]` | `undefined` |
| `note`      | --        |             | `Note`    | `undefined` |


## Events

| Event                                     | Description | Type                   |
| ----------------------------------------- | ----------- | ---------------------- |
| `hellodashNoteEditDeleteNote`             |             | `CustomEvent<Note>`    |
| `hellodashNoteEditDropdownVisibleChanged` |             | `CustomEvent<boolean>` |
| `hellodashNoteEditDuplicateNote`          |             | `CustomEvent<Note>`    |
| `hellodashNoteEditLabelAdded`             |             | `CustomEvent<number>`  |
| `hellodashNoteEditLabelCreated`           |             | `CustomEvent<Label>`   |
| `hellodashNoteEditLabelRemoved`           |             | `CustomEvent<number>`  |
| `hellodashNoteEditLabelUpdated`           |             | `CustomEvent<Label>`   |


## Dependencies

### Depends on

- dash-dropdown
- dash-icon-button
- dash-list
- dash-list-item
- [hellodash-label-select](../../hellodash-label-select)

### Graph
```mermaid
graph TD;
  hellodash-note-edit-dropdown --> dash-dropdown
  hellodash-note-edit-dropdown --> dash-icon-button
  hellodash-note-edit-dropdown --> dash-list
  hellodash-note-edit-dropdown --> dash-list-item
  hellodash-note-edit-dropdown --> hellodash-label-select
  dash-dropdown --> dash-popover
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-list-item --> dash-icon
  dash-list-item --> dash-icon-button
  hellodash-label-select --> dash-list
  hellodash-label-select --> dash-list-item
  hellodash-label-select --> dash-color-swatch
  hellodash-label-select --> dash-button
  hellodash-label-select --> dash-drill-menu
  hellodash-label-select --> dash-filter
  hellodash-label-select --> hellodash-label-color-picker
  dash-color-swatch --> dash-icon-button
  dash-color-swatch --> dash-icon
  dash-button --> dash-icon
  dash-drill-menu --> dash-icon-button
  dash-filter --> dash-input
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  hellodash-label-color-picker --> dash-color-picker
  hellodash-label-color-picker --> dash-button
  dash-color-picker --> dash-color-hue-picker
  dash-color-picker --> dash-button
  dash-color-picker --> dash-input
  dash-color-picker --> dash-color-swatch
  style hellodash-note-edit-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
