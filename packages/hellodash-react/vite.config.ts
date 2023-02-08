import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        // dash-components assets
        {
          src: 'node_modules/@didyoumeantoast/dash-components/dist/dash-components/assets',
          dest: '/',
        },
      ],
    }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  },
});
