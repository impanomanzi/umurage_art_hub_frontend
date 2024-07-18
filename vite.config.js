import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: true,
  },
  plugins: [react(), commonjs(), nodePolyfills()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  build: {
    rollupOptions: {
      external: ["react-confirm-alert/dist/react-confirm-alert.css"],
    },
  },
});
