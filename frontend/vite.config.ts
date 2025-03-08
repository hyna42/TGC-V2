import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose le serveur
    hmr: { overlay: true }, // Active le HMR
    watch: {
      usePolling: true, // Corrige les problèmes de fichiers non détectés
    },
  },
})
