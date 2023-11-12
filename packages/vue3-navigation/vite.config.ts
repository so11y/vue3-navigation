/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      name: "vue3Navigation",
      entry: resolve("./src/index.ts"),
    },
    rollupOptions: {
      external: ["vue", "vue-router"],
      output: {
        dir: "./dist",
        exports: "named",
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
        },
      },
    },
  },
  test: {
    environment: "happy-dom",
  },
});
