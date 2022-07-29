import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssExtendRule from 'postcss-extend-rule';
import replace from 'postcss-replace';
import dotenvPlugin from 'rollup-plugin-dotenv';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      copy: [
        { src: 'assets', dest: 'build/assets' },
        // need to copy over component assets into this project
        { src: '../../../node_modules/@didyoumeantoast/dash-components/dist/dash-components/assets', dest: 'build/assets' },
      ],
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
        replace({ pattern: 'html', data: { replaceAll: ':host' } }),
      ],
    }),
    dotenvPlugin(),
  ],
};
