import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssExtendRule from 'postcss-extend-rule';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';
import replace from 'postcss-replace';
import dotenvPlugin from 'rollup-plugin-dotenv';

//purge function to keep only the classes used in EACH component
const purge = purgecss({
  content: ['./src/**/*.tsx', './src/index.html'],
  safelist: [':host'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

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
      baseUrl: 'https://myapp.local/',
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
        replace({ pattern: 'html', data: { replaceAll: ':host' } }),
        // purge and cssnano if production build
        ...(!process.argv.includes('--dev') ? [purge, cssnano()] : []),
      ],
    }),
    dotenvPlugin(),
  ],
};
