
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bug-free-palm-tree-69vq4xw7q7j9256xg-5000.app.github.dev',
        changeOrigin: true,
        secure: false
      }
    }
  }
})