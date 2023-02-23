import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssExtendRule from 'postcss-extend-rule';

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
