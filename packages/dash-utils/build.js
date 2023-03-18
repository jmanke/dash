import { build } from 'esbuild';
import { dtsPlugin } from 'esbuild-plugin-d.ts';
import { globPlugin } from 'esbuild-plugin-glob';

const devMode = process.argv.slice(2)?.[0] === '--dev';

const sharedConfig = {
  bundle: false,
  platform: 'node',
  format: 'esm',
  minify: !devMode,
  plugins: [dtsPlugin(), globPlugin()],
};

// build all files in src
build({
  ...sharedConfig,
  entryPoints: ['src/**/*.ts'],
  outdir: 'dist',
});
