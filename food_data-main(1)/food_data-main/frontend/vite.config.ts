import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
    extensions: ['.ts', '.tsx'],
  },
  // 'api'
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/media': {
        target: 'http://localhost:8000/media',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/media/, ''),
      },
    },
  },
})
