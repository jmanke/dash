import { build } from 'esbuild';
import { dtsPlugin } from 'esbuild-plugin-d.ts';

const entryPoints = [
  'src/index.ts',
  'src/class-exists.ts',
  'src/contains.ts',
  'src/deep-copy.ts',
  'src/event-emitter.ts',
  'src/focus.ts',
  'src/is-click.ts',
  'src/is-defined.ts',
  'src/is-hex.ts',
  'src/query-element.ts',
  'src/replace-at.ts',
  'src/space-concat.ts',
  'src/string-search.ts',
  'src/wait.ts',
  'src/is-none.ts',
];

build({
  entryPoints,
  bundle: false,
  minify: true,
  outdir: 'dist',
  platform: 'node',
  format: 'esm',
  plugins: [dtsPlugin()],
});
