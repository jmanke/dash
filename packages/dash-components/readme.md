# Welcome to Dash Components!

Dash components is a shared component library built entirely in StencilJS. 

## How to integrate

### StencilJS

1. Run `yarn add didyoumeantoast-dash-components`
2. Import `didyoumeantoast-dash-components/dist/dash-components/dash-components.css` into the global css file
3. Import `didyoumeantoast-dash-components` into global app.ts
4. Copy assets folder into build assets in stencil.config.ts
    `{ src: '../node_modules/didyoumeantoast-dash-components/dist/dash-components/assets', dest: 'build/assets' }`