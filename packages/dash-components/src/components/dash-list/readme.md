# dash-list



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                            | Type                                                 | Default     |
| ----------------- | ------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------- | ----------- |
| `disableDeselect` | `disable-deselect` | Whether the list items can be deselected                               | `boolean`                                            | `undefined` |
| `dragEnabled`     | `drag-enabled`     | Whether the list item can be dragged                                   | `boolean`                                            | `undefined` |
| `maxItems`        | `max-items`        | Number of items to show in the list - a scrollbar appears for overflow | `number`                                             | `undefined` |
| `scale`           | `scale`            | Size of the list and its items                                         | `"l" \| "m" \| "s"`                                  | `'m'`       |
| `selectionMode`   | `selection-mode`   | Selection mode of the list and its items                               | `"multiple" \| "no-selection" \| "none" \| "single"` | `'single'`  |


## Events

| Event                    | Description                                       | Type                                     |
| ------------------------ | ------------------------------------------------- | ---------------------------------------- |
| `dashListDragEnd`        | Emitted when the list items stop being reordered  | `CustomEvent<void>`                      |
| `dashListDragStart`      | Emitted when the list items start to be reordered | `CustomEvent<void>`                      |
| `dashListItemsReordered` | Emitted when the list items are reordered         | `CustomEvent<HTMLDashListItemElement[]>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
