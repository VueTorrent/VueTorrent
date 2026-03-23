/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import { VitePWA } from 'vite-plugin-pwa'
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
            vuetify: ['vuetify'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    define: {
      'import.meta.env.VITE_PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
      'process.env': {},
    },
    plugins: [
      vue(),
      vuetify(),
      topLevelAwait({
        promiseExportName: '__tla',
        promiseImportName: i => `__tla_${i}`,
      }),
      VitePWA({
        base: './',
        devOptions: {
          enabled: false,
        },
        includeAssets: ['robots.txt', 'icon.svg', 'apple-touch-icon-180x180.png', 'favicon.ico'],
        manifest: {
          background_color: '#000',
          categories: ['utilities'],
          description: 'The sleekest looking WEBUI for qBittorrent made with Vuejs!',
          file_handlers: [
            {
              action: '.',
              accept: {
                'application/x-bittorrent': ['.torrent'],
                'text/magnet': ['.magnet'],
              },
            },
          ],
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          launch_handler: {
            client_mode: 'focus-existing',
          },
          name: 'VueTorrent',
          protocol_handlers: [
            {
              protocol: 'magnet',
              url: '../#/magnet/%s',
            },
          ],
          screenshots: [
            {
              src: 'screenshots/screenshot-desktop.jpeg',
              sizes: '1788x909',
              type: 'image/jpeg',
              form_factor: 'wide',
              label: 'Screenshot Desktop (Light Mode)',
            },
            {
              src: 'screenshots/screenshot-desktop-dark-mode.jpeg',
              sizes: '1788x909',
              type: 'image/jpeg',
              form_factor: 'wide',
              label: 'Screenshot Desktop (Dark Mode)',
            },
            {
              src: 'screenshots/screenshot-mobile.jpeg',
              sizes: '425x885',
              type: 'image/jpeg',
              form_factor: 'narrow',
              label: 'Screenshot Mobile Dashboard (Light Mode)',
            },
            {
              src: 'screenshots/screenshot-mobile-navbar.jpeg',
              sizes: '425x885',
              type: 'image/jpeg',
              form_factor: 'narrow',
              label: 'Screenshot Mobile Navbar (Light Mode)',
            },
            {
              src: 'screenshots/screenshot-mobile-dark-mode.jpeg',
              sizes: '425x885',
              type: 'image/jpeg',
              form_factor: 'narrow',
              label: 'Screenshot Mobile Dashboard (Dark Mode)',
            },
            {
              src: 'screenshots/screenshot-mobile-navbar-dark-mode.jpeg',
              sizes: '425x885',
              type: 'image/jpeg',
              form_factor: 'narrow',
              label: 'Screenshot Mobile Navbar (Dark Mode)',
            },
          ],
          short_name: 'VueTorrent',
          shortcuts: [
            {
              name: 'Dashboard',
              url: '#/',
            },
            {
              name: 'Settings',
              url: '#/settings',
            },
            {
              name: 'RSS Feeds',
              url: '#/rss',
            },
            {
              name: 'Search Engine',
              url: '#/search',
            },
            {
              name: 'Logs',
              url: '#/logs',
            },
            {
              name: 'Torrent Creator',
              url: '#/torrentCreator',
            },
            {
              name: 'Cookies Manager',
              url: '#/cookies',
            },
          ],
          theme_color: '#64CEAA',
        },
        registerType: 'autoUpdate',
        useCredentials: true,
        workbox: {
          cleanupOutdatedCaches: true,
        },
      }),
    ],
    publicDir: './public',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          secure: false,
          changeOrigin: true,
          xfwd: true,
          target: qBittorrentTarget,
        },
        '/backend': {
          secure: false,
          changeOrigin: true,
          target: qBittorrentTarget,
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: [resolve(__dirname, 'tests/setup.ts')],
      coverage: {
        reportsDirectory: './tests/unit/coverage',
      },
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
    },
  }
})
