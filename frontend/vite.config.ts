import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    host: true, // im LAN erreichbar (Handy im selben WLAN)
    proxy: {
      // alles unter /api wird an das Spring-Backend weitergereicht
      "/api": "http://localhost:8081",
    },
  },
})
