### Building

1. Run `yarn build`

### Publish to npm

1. Build project
2. Ensure there is a package.json file in `lib`. And exmaple is shown below.
3. Increment version
4. cd into `lib` and run `npm publish`

`package.json`:

    {
    "name": "didyoumeantoast-dash-utils",
    "version": "0.0.6",
    "description": "Utils library by Jeff Manke",
    "type": "module",
    "main": "index.js",
    "dependencies": {
        "@a11y/focus-trap": "^1.0.5"
    }
    }
