/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const qBittorrentPort = env.VITE_QBITTORRENT_PORT ?? '8080'
  const proxyTarget = env.VITE_QBITTORRENT_TARGET ?? 'http://127.0.0.1'

  return {
    base: './',
    build: {
      target: 'esnext',
      outDir: './vuetorrent/public',
      rollupOptions: {
        output: {
          manualChunks: {
            // apexcharts: ['apexcharts', 'vue3-apexcharts'],
            vue: ['vue', 'vue-router', 'vue-i18n', 'vue3-toastify', 'vuedraggable', 'pinia', 'pinia-plugin-persist'],
            vuetify: ['vuetify']
          }
        }
      }
    },
    define: {
      'import.meta.env.VITE_PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
      'process.env': {}
    },
    plugins: [
      vue(),
      vuetify()
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
        '/api': {
          target: `${proxyTarget}:${qBittorrentPort}`,
          secure: false
        }
      }
    },
    test: {
      environment: 'jsdom',
      setupFiles: [resolve(__dirname, 'tests/setup.ts')],
      coverage: {
        reportsDirectory: './tests/unit/coverage'
      },
      server: {
        deps: {
          inline: ['vuetify']
        }
      }
    }
  }
})
