import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from "path";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
          manifest: {
              name: 'Sava Savon',
              short_name: 'Sava',
              description: 'Калькулятор мыла — веб-приложение',
              theme_color: '#ffffff',
              background_color: '#ffffff',
              display: 'standalone',
              scope: '/',
              start_url: '/',
              icons: [
                  {
                      src: 'pwa-192x192.png',
                      sizes: '192x192',
                      type: 'image/png'
                  },
                  {
                      src: 'pwa-512x512.png',
                      sizes: '512x512',
                      type: 'image/png'
                  }
              ]
          }
      })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
