import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  registerType: "autoUpdate",
  includeAssets: [
    "maskedLogo.svg",
    "Noir_medium.woff2",
    "Noir_regular.woff2",
    "offline.html",
    "OfflineLogo.png",
  ],
  injectRegister: "auto",
  manifest: {
    name: "FOOS WARRIORS",
    short_name: "FOOS WARRIORS",
    description: "Foosball tournament application for HiQWest",
    background_color: "#fffdf9",
    theme_color: "#333",
    orientation: "portrait-primary",
    icons: [
      {
        src: "Logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "Logo512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "LogoMasked.png",
        sizes: "512x512",
        purpose: "any maskable",
      },
    ],
  },
  devOptions: {
    enabled: false, // change to true when developing
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
