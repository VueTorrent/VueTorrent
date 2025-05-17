/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const qBittorrentTarget = env.VITE_QBITTORRENT_TARGET ?? 'http://localhost:8080'

  return {
    base: './',
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: 'lightningcss',
      sourcemap: false,
      outDir: mode === 'demo' ? './vuetorrent-demo' : './vuetorrent/public',
      rollupOptions: {
        output: {
          manualChunks: {
            // apexcharts: ['apexcharts', 'vue3-apexcharts'],
            vue: ['vue', 'vue-router', 'vue-i18n', 'vue3-toastify', 'vuedraggable', 'pinia', 'pinia-persistence-plugin'],
            vuetify: ['vuetify']
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    define: {
      'import.meta.env.VITE_PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
      'process.env': {}
    },
    plugins: [
      vue(),
      vuetify(),
      topLevelAwait({
        promiseExportName: '__tla',
        promiseImportName: i => `__tla_${i}`
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
        '/api': {
          secure: false,
          changeOrigin: true,
          xfwd: true,
          target: qBittorrentTarget
        },
        '/backend': {
          secure: false,
          changeOrigin: true,
          target: qBittorrentTarget
        }
      }
    },
    test: {
      environment: 'jsdom',
      globals: true,
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
