import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      name: "vue3Navigation",
      entry: resolve("./src/index.ts"),
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        dir: "./dist",
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
