import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    outDir: './vuetorrent/public'
  },
  define: {
    'process.env': {}
  },
  plugins: [
    vue()
  ],
  publicDir: './public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
