import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";
// The vite-plugin-pwa does these three things basically
// (1) Generate the web application manifest and add it to your entry point (i.e index.html usually) on build process
// (2) Generate the service worker using the strategies option i.e generateSW or injectManifest
// (3) Generate a script to register the service worker in the browser i.e generate script in the index.html to register the SW. We don't need to specify this as one of the vitePWA options below. it's done automatically but we can manually add with injectRegister: 'auto' which is the default. there are other options 'inline', 'script','script-defer',null

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true, // Web App Manifest and SW will be generated with this option enabled as true to test PWA functionality in dev mode,
      },
      strategies: "injectManifest", //SW strategy is related to how vite-plugin-pwa uses workbox-build node package to generate SW i.e generateSW or injectManifest strategy. NB- I mean precache manifest and workbox-build will precache every file in the build process dist folder
      srcDir: "src", // Location of our SW file
      filename: "sw.ts", // SW file name
      registerType: "autoUpdate", //SW behavior is related to how the SW will work in the browser once the browser detects a new version of your application i.e autoUpdate or prompt behavior
      injectManifest: {
        swDest: "dist/sw.js", // SW path after build process to specify where to inject the cache manifest after build process
      },
      manifest: {
        name: "Task Management App",
        short_name: "Taskio",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#1a1a1a",
        background_color: "#1a1a1a",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
      },
    }),
  ],
});
