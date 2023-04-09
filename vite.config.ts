import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import VueRouter from 'unplugin-vue-router/vite'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

const version =
  process.env.NODE_ENV === 'production'
    ? process.env.npm_package_version
    : JSON.stringify(process.env.npm_package_version)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:8080`,
        changeOrigin: true
      }
    }
  },
  plugins: [
    VueRouter({
      routesFolder: 'src/pages'
    }),
    vue(),
    vuetify({
      autoImport: true
    }),
    Components({
      dts: true
    }),
    AutoImport({
      eslintrc: {
        enabled: true
      },
      imports: [VueRouterAutoImports, 'vue', '@vueuse/core', 'pinia', 'vue-i18n']
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
    // vue
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// import vue from '@vitejs/plugin-vue'
// import { fileURLToPath, URL } from 'node:url'
// import Components from 'unplugin-vue-components/vite'
// import VueRouter from 'unplugin-vue-router/vite'
// import { defineConfig } from 'vite'
// import { VitePWA } from 'vite-plugin-pwa'
// import vuetify from 'vite-plugin-vuetify'
// import AutoImport from 'unplugin-auto-import/vite'
// import { VueRouterAutoImports } from 'unplugin-vue-router'
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Referrer-Policy': 'no-referrer'
//     }
//   },
//   plugins: [
//     VueRouter({
//       routesFolder: 'src/pages',
//       dataFetching: true,
//       routeBlockLang: 'json5',
//       importMode: 'async'
//     }),
//     vue(),
//     vuetify({
//       autoImport: true
//     }),
//     VueI18nPlugin({
//       fullInstall: false,
//       runtimeOnly: true
//     }),
//     AutoImport({
//       eslintrc: {
//         enabled: true
//       },
//       imports: ['vue', VueRouterAutoImports, '@vueuse/core', 'pinia', 'vue-i18n']
//     }),
//     Components({
//       dts: true
//     }),
//     VitePWA({
//       injectRegister: 'inline',
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
//       devOptions: {
//         enabled: false
//       },
//       manifest: {
//         name: 'JCS Tab Tracker',
//         short_name: 'JCS Tabs',
//         start_url: '.',
//         display: 'standalone',
//         description: 'Helps users keep track of their tab',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any maskable'
//           }
//         ]
//       },
//       workbox: {
//         skipWaiting: true,
//         cleanupOutdatedCaches: true,
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'google-fonts-cache',
//               expiration: {
//                 maxEntries: 1,
//                 maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           },
//           {
//             urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'gstatic-fonts-cache',
//               expiration: {
//                 maxEntries: 1,
//                 maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           },
//           {
//             urlPattern: /^https:\/\/www\.googleapis.com\/plus\/v1\/people\/.*/i,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'google-profile-cache',
//               expiration: {
//                 maxEntries: 1,
//                 maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
//               }
//             }
//           },
//           {
//             urlPattern: /^https:\/\/(.*\.googleusercontent\.com\/.*)/i,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'google-profile-images',
//               expiration: {
//                 maxEntries: 1,
//                 maxAgeSeconds: 60 * 60 * 24 * 30 // <== 1 month
//               },
//               cacheableResponse: {
//                 statuses: [0, 200]
//               }
//             }
//           }
//         ]
//       }
//     })
//   ],
//   define: {
//     // vue
//     __VUE_OPTIONS_API__: true,
//     __VUE_PROD_DEVTOOLS__: false
//   },
//   esbuild: {
//     drop: ['console', 'debugger'],
//     legalComments: 'none',
//     format: 'esm'
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           firebase: ['firebase/auth', 'firebase/firestore', 'firebase/functions'],
//           vue: ['vue', 'vue-router']
//         }
//       }
//     }
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//       '~utils': fileURLToPath(new URL('./src/utils', import.meta.url))
//     }
//   }
// })
