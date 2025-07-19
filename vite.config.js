import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        name: "shannyTech",
        short_name: "shannyTech",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#14b8a6",
      },
      registerType: "autoUpdate",
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,
  },
});
