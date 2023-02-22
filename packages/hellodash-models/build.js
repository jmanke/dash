import { build } from 'esbuild';
import { dtsPlugin } from 'esbuild-plugin-d.ts';

const entryPoints = [
  'src/index.ts',
  'src/app-settings.ts',
  'src/app-state.ts',
  'src/label.ts',
  'src/model.ts',
  'src/note.ts',
  'src/user.ts',
  'src/types/index.ts',
  'src/types/theme.ts',
  'src/enums/index.ts',
  'src/enums/status.ts',
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
