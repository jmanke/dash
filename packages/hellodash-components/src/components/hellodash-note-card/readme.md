# hellodash-note-card



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute  | Description                       | Type                     | Default     |
| ------------ | ---------- | --------------------------------- | ------------------------ | ----------- |
| `mode`       | `mode`     | Mode of the note card             | `"edit" \| "selectable"` | `'edit'`    |
| `note`       | --         | Note                              | `Note`                   | `undefined` |
| `noteLabels` | --         | Labels for note                   | `Label[]`                | `undefined` |
| `selected`   | `selected` | Whether the note card is selected | `boolean`                | `false`     |


## Events

| Event                           | Description | Type                |
| ------------------------------- | ----------- | ------------------- |
| `hellodashNoteCardNoteSelected` |             | `CustomEvent<void>` |


## Dependencies

### Depends on

- dash-chip
- dash-icon

### Graph
```mermaid
graph TD;
  hellodash-note-card --> dash-chip
  hellodash-note-card --> dash-icon
  dash-chip --> dash-icon
  dash-chip --> dash-tooltip
  dash-tooltip --> dash-popover
  style hellodash-note-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
