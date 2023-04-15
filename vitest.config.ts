import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// Plugins
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import vuetify from 'vite-plugin-vuetify'

export default mergeConfig(
  viteConfig,
  defineConfig({
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
      })
    ],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude],
      deps: {
        inline: ['vuetify']
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
)
