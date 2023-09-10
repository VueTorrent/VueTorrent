import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())
  const qBittorrentPort = env.VITE_QBITTORRENT_PORT ?? '8080'
  const proxyTarget = env.VITE_QBITTORRENT_TARGET ?? 'http://127.0.0.1'

  return {
    build: {
      target: 'esnext',
      outDir: './vuetorrent/public',
    },
    define: {
      'process.env': {},
    },
    plugins: [
      vue(),
      vuetify()
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
        '/api': `${proxyTarget}:${qBittorrentPort}`
      }
    }
  }
})
