import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3333,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        // dash-components assets
        {
          src: 'node_modules/@didyoumeantoast/hellodash-components/dist/hellodash-components/assets',
          dest: 'hellodash-components',
        },
        {
          src: ['public/icon', 'public/tinymce'],
          dest: './',
        },
      ],
    }),
    vue({
      template: {
        compilerOptions: {
          // dash-components: treat all components starting with `dash-` or `hellodash-` as custom elements
          isCustomElement: tag => tag.startsWith('dash-') || tag.startsWith('hellodash-'),
        },
      },
    }),
  ],
});
