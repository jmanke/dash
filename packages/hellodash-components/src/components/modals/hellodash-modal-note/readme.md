# hellodash-modal-note



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                    | Type                | Default     |
| --------------------- | ----------------------- | ------------------------------ | ------------------- | ----------- |
| `allLabels`           | --                      |                                | `Label[]`           | `undefined` |
| `createLabelDisabled` | `create-label-disabled` |                                | `boolean`           | `undefined` |
| `loading`             | `loading`               |                                | `boolean`           | `undefined` |
| `mobileView`          | `mobile-view`           |                                | `boolean`           | `undefined` |
| `note`                | --                      |                                | `Note`              | `undefined` |
| `open`                | `open`                  | When `true`, the modal is open | `boolean`           | `undefined` |
| `theme`               | `theme`                 |                                | `"dark" \| "light"` | `'dark'`    |


## Events

| Event                            | Description | Type                 |
| -------------------------------- | ----------- | -------------------- |
| `dashModalBeforeClose`           |             | `CustomEvent<any>`   |
| `dashModalClosed`                |             | `CustomEvent<any>`   |
| `hellodashModalNoteLabelCreated` |             | `CustomEvent<Label>` |
| `hellodashModalNoteLabelUpdated` |             | `CustomEvent<Label>` |
| `hellodashModalNoteUpdateNote`   |             | `CustomEvent<Note>`  |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- dash-modal
- [hellodash-text-editor](../../hellodash-text-editor)
- dash-chip
- dash-dropdown
- dash-icon-button
- [hellodash-label-select](../../hellodash-label-select)
- dash-button

### Graph
```mermaid
graph TD;
  hellodash-modal-note --> dash-modal
  hellodash-modal-note --> hellodash-text-editor
  hellodash-modal-note --> dash-chip
  hellodash-modal-note --> dash-dropdown
  hellodash-modal-note --> dash-icon-button
  hellodash-modal-note --> hellodash-label-select
  hellodash-modal-note --> dash-button
  dash-modal --> dash-scrim
  dash-modal --> dash-focus-trap
  dash-modal --> dash-icon-button
  dash-modal --> dash-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  dash-icon-button --> dash-tooltip
  dash-tooltip --> dash-popover
  dash-button --> dash-icon
  hellodash-text-editor --> dash-loader
  dash-chip --> dash-icon
  dash-chip --> dash-tooltip
  dash-dropdown --> dash-popover
  hellodash-label-select --> dash-list
  hellodash-label-select --> dash-list-item
  hellodash-label-select --> dash-color-swatch
  hellodash-label-select --> dash-button
  hellodash-label-select --> dash-drill-menu
  hellodash-label-select --> dash-filter
  hellodash-label-select --> hellodash-label-color-picker
  dash-list-item --> dash-icon
  dash-color-swatch --> dash-icon-button
  dash-color-swatch --> dash-icon
  dash-drill-menu --> dash-icon-button
  dash-filter --> dash-input
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  hellodash-label-color-picker --> dash-color-picker
  style hellodash-modal-note fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
