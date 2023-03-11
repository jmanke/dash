# hellodash-text-editor



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                          | Type                | Default     |
| ---------------- | ------------------ | -------------------------------------------------------------------- | ------------------- | ----------- |
| `content`        | `content`          | The content of the editor                                            | `string`            | `undefined` |
| `debounce`       | `debounce`         | The debounce time in milliseconds for content changes                | `number`            | `3000`      |
| `heading`        | `heading`          | The heading of the editor                                            | `string`            | `undefined` |
| `loading`        | `loading`          | When `true`, the editor is loading and will show a loading indicator | `boolean`           | `undefined` |
| `readonly`       | `readonly`         | When `true`, the editor will be readonly                             | `boolean`           | `undefined` |
| `resize`         | `resize`           | When `true`, the editor will resize to fit the content               | `boolean`           | `true`      |
| `showFullscreen` | `show-fullscreen`  | When `true`, the editor will show the fullscreen button              | `boolean`           | `undefined` |
| `showTitleInput` | `show-title-input` | When `true`, the editor will show the title input                    | `boolean`           | `undefined` |
| `theme`          | `theme`            | The theme of the editor                                              | `"dark" \| "light"` | `'dark'`    |


## Events

| Event                                  | Description | Type                                          |
| -------------------------------------- | ----------- | --------------------------------------------- |
| `hellodashTextEditorBeforeUnload`      |             | `CustomEvent<Promise<unknown>[]>`             |
| `hellodashTextEditorContentChanged`    |             | `CustomEvent<string>`                         |
| `hellodashTextEditorFullscreenChanged` |             | `CustomEvent<boolean>`                        |
| `hellodashTextEditorHeadingChanged`    |             | `CustomEvent<string>`                         |
| `hellodashTextEditorInit`              |             | `CustomEvent<HTMLHellodashTextEditorElement>` |
| `hellodashTextEditorIsDirty`           |             | `CustomEvent<any>`                            |
| `hellodashTextEditorNodeChanged`       |             | `CustomEvent<object>`                         |
| `hellodashTextEditorUnload`            |             | `CustomEvent<any>`                            |


## Methods

### `getContent() => Promise<string>`

Returns the editor content

#### Returns

Type: `Promise<string>`

the editor content

### `getTextContent() => Promise<string>`

Returns the editor content as text

#### Returns

Type: `Promise<string>`

the editor content as text

### `isEditorDirty() => Promise<boolean>`

Returns true if the editor is dirty

#### Returns

Type: `Promise<boolean>`

true if the editor is dirty

### `save(emitEvent?: boolean) => Promise<void>`

Saves the editor content

#### Returns

Type: `Promise<void>`



### `selectTitle() => Promise<void>`

Selects the title input

#### Returns

Type: `Promise<void>`



### `setContent(content: string) => Promise<void>`

Sets the editor content

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Focuses the editor

#### Returns

Type: `Promise<void>`



### `setHeading(heading: string) => Promise<void>`

Sets the editor heading

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [hellodash-modal-note](../modals/hellodash-modal-note)

### Depends on

- dash-loader

### Graph
```mermaid
graph TD;
  hellodash-text-editor --> dash-loader
  hellodash-modal-note --> hellodash-text-editor
  style hellodash-text-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
