/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const qBittorrentPort = env.VITE_QBITTORRENT_PORT ?? '8080'
  const proxyTarget = env.VITE_QBITTORRENT_TARGET ?? 'http://127.0.0.1'

  return {
    build: {
      target: 'esnext',
      outDir: './vuetorrent/public'
    },
    define: {
      'process.env': {}
    },
    plugins: [
      vue(), 
      vuetify(),
      VitePWA({
        includeAssets: ['favicon.ico', 'icon.svg', 'icon-192.png', 'icon-512.png', 'robots.txt'],
        manifest: {
          name: 'VueTorrent',
          short_name: 'VueTorrent',
          theme_color: '#597566',
          start_url: '.',
          background_color: '#000',
          icons: [
            { src: './icon-192.png', type: 'image/png', sizes: '192x192' },
            { src: './icon-512.png', type: 'image/png', sizes: '512x512' }
          ]
        },
        // Other options
        registerType: 'autoUpdate',
        base: './',
        useCredentials: true,
        workbox: {
          maximumFileSizeToCacheInBytes: 10000000,
          skipWaiting: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}']
        }
      })
    ],
    publicDir: './public',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': `${proxyTarget}:${qBittorrentPort}`
      }
    },
    test: {
      coverage: {
        reportsDirectory: './tests/unit/coverage'
      }
    }
  }
})
