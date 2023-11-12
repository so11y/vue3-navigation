import { defineConfig, Plugin, searchForWorkspaceRoot } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

function builderREADME(): Plugin {
  return {
    name: "builder-readme",
    apply: "build",
    async writeBundle(a, b) {
      const __dirname = fileURLToPath(import.meta.url);
      const root = searchForWorkspaceRoot(__dirname);
      const packageREADMEPath = resolve(__dirname, "../README.md");
      const RootREADME = await readFile(resolve(root, "./README.md"), "utf-8");
      await writeFile(packageREADMEPath, RootREADME, "utf-8");
    },
  };
}

export default defineConfig({
  plugins: [vue(), dts(), builderREADME()],
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
});
