# dash-filter



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                        | Default     |
| ------------- | ------------- | ----------- | --------------------------- | ----------- |
| `debounce`    | `debounce`    |             | `number`                    | `250`       |
| `items`       | --            |             | `string[] \| {}[]`          | `undefined` |
| `objKey`      | `obj-key`     |             | `string`                    | `undefined` |
| `placeholder` | `placeholder` |             | `string`                    | `'Filter'`  |
| `scale`       | `scale`       |             | `"l" \| "m" \| "s" \| "xl"` | `'m'`       |


## Events

| Event                     | Description | Type                    |
| ------------------------- | ----------- | ----------------------- |
| `dashFilterFilteredItems` |             | `CustomEvent<object[]>` |
| `dashFilterSubmit`        |             | `CustomEvent<string>`   |
| `dashFilterValueChanged`  |             | `CustomEvent<string>`   |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `select() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [dash-input](../dash-input)

### Graph
```mermaid
graph TD;
  dash-filter --> dash-input
  dash-input --> dash-icon
  dash-input --> dash-icon-button
  dash-icon-button --> dash-icon
  dash-icon-button --> dash-loader
  style dash-filter fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*