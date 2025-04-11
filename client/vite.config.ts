import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ["**/*.html", "**/*.js"],
    server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
})
