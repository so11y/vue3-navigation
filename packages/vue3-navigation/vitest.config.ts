import viteConfig from "./vite.config";
import jsx from "@vitejs/plugin-vue-jsx";
import { defineConfig, mergeConfig } from "vitest/config";
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [jsx()],
    test: {
      environment: "happy-dom",
    },
  })
);
