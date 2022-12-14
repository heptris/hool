import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
// import dns from "dns"

// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5442,
    fs: {
      strict: false,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5442,
  },
  plugins: [svgr(), react(), tsconfigPaths()],
});
