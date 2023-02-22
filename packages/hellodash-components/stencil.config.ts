import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssExtendRule from 'postcss-extend-rule';

// https://stenciljs.com/docs/config

export const config: Config = {
  namespace: 'hellodash-components',
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
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
      // comment the following line to disable service workers in production
      serviceWorker: null,
      copy: [
        { src: 'assets', dest: 'build/assets' },
        // need to copy over component assets into this project
        { src: '../../dash-components/dist/dash-components/assets', dest: 'build/assets' },
      ],
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
