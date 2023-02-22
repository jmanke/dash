import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // dash-components: treat all components starting with `dash-` or `hellodash-` as custom elements
          isCustomElement: (tag) =>
            tag.startsWith("dash-") || tag.startsWith("hellodash-"),
        },
      },
    }),
    viteStaticCopy({
      targets: [
        // dash-components assets
        {
          src: "node_modules/@didyoumeantoast/dash-components/dist/dash-components/assets",
          dest: "dash-components",
        },
      ],
    }),
  ],
});
