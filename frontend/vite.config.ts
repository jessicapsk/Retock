import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // force file‐watch polling so Docker + Windows mounts trigger HMR
    watch: {
      usePolling: true,
      interval: 100
    },
    // ensure the client WS connects back to your host
/*     hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    } */
  }
})