import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

// Plugins
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VitePWA } from 'vite-plugin-pwa'
import vuetify from 'vite-plugin-vuetify'

const version =
  process.env.NODE_ENV === 'production'
    ? process.env.npm_package_version
    : JSON.stringify(process.env.npm_package_version)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const theEnv = loadEnv(mode, process.cwd())
  const proxyTarget = theEnv.VITE_QBITTORRENT_TARGET

  return {
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: `${proxyTarget}`,
          changeOrigin: true
        }
      }
    },
    plugins: [
      vue(),
      VueRouter({
        routesFolder: 'src/pages'
      }),
      vuetify({
        autoImport: true
      }),
      VueI18nPlugin({
        fullInstall: false,
        runtimeOnly: true
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
        useCredentials: true,
        workbox: {
          skipWaiting: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        }
      })
    ],
    define: {
      'import.meta.env.VITE_PACKAGE_VERSION': version,
      'process.env': {},
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    },
    esbuild: {
      drop: process.env.NODE_ENV === 'development' ? undefined : ['console', 'debugger'],
      legalComments: 'none',
      format: 'esm'
    },
    build: {
      outDir: './vuetorrent/public',
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            core: ['@vueuse/core', 'vue', 'vue-router', 'vuetify'],
            charts: ['vue3-apexcharts']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url))
      }
    }
  }
})
