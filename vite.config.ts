import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePWA({
      manifest,
      injectRegister: "script",
      includeAssets: [
        "Logo.192.png",
        "Logo.512.png",
        "LogoMasked.png",
        "OfflineLofo.png",
        "Noir_medium.woff2",
        "Noir_regular.woff2",
      ],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: false,
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
