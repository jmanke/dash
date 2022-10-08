import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssExtendRule from 'postcss-extend-rule';
import replace from 'postcss-replace';

export const config: Config = {
  namespace: 'dash-components',
  globalStyle: 'src/global/dash-components.css',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
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
  //add postcss as a plugin
  plugins: [
    postcss({
      // add postcss plugins
      plugins: [
        postcssNested(),
        postcssExtendRule(),
        autoprefixer(),
        // shadow dom does not respect 'html' and 'body' styling, so we replace it with ':host' instead
        // @ts-ignore
        replace({ pattern: 'html', data: { replaceAll: ':host' } }),
      ],
    }),
  ],
};
