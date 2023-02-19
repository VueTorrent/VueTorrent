import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

import { fileURLToPath, URL } from 'node:url'

const version = process.env.NODE_ENV === 'production' ? process.env.npm_package_version : JSON.stringify(process.env.npm_package_version)

export default defineConfig(({ command, mode }) => {
  const theEnv = loadEnv(mode, process.cwd())
  const qBittorrentPort = theEnv.VITE_QBITTORRENT_PORT ?? 8080
  const proxyTarget = theEnv.VITE_QBITTORRENT_TARGET ?? 'http://127.0.0.1'

  return {
    base: './',
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'vue-router/composables', 'vuex', 'vuex-persist']
          }
        }
      },
      outDir: './vuetorrent/public'
    },
    define: {
      'import.meta.env.VITE_PACKAGE_VERSION': version,
      'process.env': {}
    },
    plugins: [
      vue(),
      Components({
        dts: false,
        directives: false,
        resolvers: [VuetifyResolver()],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView']
          }
        ]
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
    publicDir: './public',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url))
      },
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.vue']
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': `${proxyTarget}:${qBittorrentPort}`
      }
    }
  }
})
