import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import autoprefixer from 'autoprefixer';
import postcssExtendRule from 'postcss-extend-rule';
import postcssNested from 'postcss-nested';

export const config: Config = {
  namespace: 'dash-components',
  globalStyle: 'src/global/dash-components.css',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: './loader',
      copy: [{ src: 'assets' }],
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      copy: [{ src: 'assets', dest: 'build/assets' }],
    },
    reactOutputTarget({
      componentCorePackage: '@didyoumeantoast/dash-components',
      proxiesFile: '../dash-components-react/src/index.ts',
      includeDefineCustomElements: true,
    }),
  ],
  // add postcss as a plugin
  plugins: [
    postcss({
      // add postcss plugins
      plugins: [postcssNested(), postcssExtendRule(), autoprefixer()],
    }),
  ],
  extras: {
    experimentalImportInjection: true,
  },
};
