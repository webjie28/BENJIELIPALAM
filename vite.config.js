import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        portfolio: fileURLToPath(new URL('./index.html', import.meta.url)),
        automationDashboard: fileURLToPath(new URL('./automation-dashboard.html', import.meta.url)),
      },
    },
  },
})
