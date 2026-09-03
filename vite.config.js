import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   optimizeDeps: {
    include: ['react-window']
  },
  server: {
    port: 8000,
    headers: {
      'Content-Security-Policy': "frame-ancestors 'self' https://google.com https://*.google.com https://openstreetmap.org"    }
  },
})
