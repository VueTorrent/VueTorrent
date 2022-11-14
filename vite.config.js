import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

const version = process.env.NODE_ENV === 'production' ? process.env.npm_package_version : JSON.stringify(process.env.npm_package_version)

const qBittorrentPort = process.env['QBITTORRENT_PORT'] ?? 8080
const proxyTarget = process.env['QBITTORRENT_TARGET'] ?? 'http://127.0.0.1'

export default defineConfig({
  plugins: [
    createVuePlugin(),
    Components({
      resolvers: [VuetifyResolver()]
    }),
    VitePWA({
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        './icons/android-chrome-192x192.png',
        './icons/android-chrome-512x512.png',
        './icons/android-chrome-maskable-192x192.png',
        './icons/android-chrome-maskable-512x512.png',
        './icons/apple-touch-icon.png',
        './icons/safari-pinned-tab.svg',
        './icons/msapplication-icon-144x144.png'
      ],
      manifest: {
        name: 'VueTorrent',
        short_name: 'VueTorrent',
        theme_color: '#597566',
        start_url: '.',
        background_color: '#000',
        icons: [
          {
            src: './icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: './icons/android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: './icons/android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },

          {
            src: './icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: './icons/safari-pinned-tab.svg',
            sizes: '683x683',
            type: 'image/svg+xml'
          },
          {
            src: './icons/msapplication-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          }
        ]
      },
      // Other options
      registerType: 'autoUpdate',
      base: './',
      useCredentials: true,
      workbox: {
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  define: {
    'import.meta.env.VITE_PACKAGE_VERSION': version
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  base: './',
  publicDir: './public',
  build: {
    outDir: './vuetorrent/public'
  },
  server: {
    proxy: {
      '/api': `${proxyTarget}:${qBittorrentPort}`
    }
  }
})
