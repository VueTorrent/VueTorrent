import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

import { fileURLToPath, URL } from 'node:url'

const version = process.env.NODE_ENV === 'production' ? process.env.npm_package_version : JSON.stringify(process.env.npm_package_version)

export default defineConfig(({ mode }) => {
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
