import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// Plugins
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import vuetify from 'vite-plugin-vuetify'
import Components from 'unplugin-vue-components/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default mergeConfig(
  viteConfig,
  defineConfig({
    // plugin merge not working
    plugins: [
      vue(),
      VueRouter({
        routesFolder: 'src/pages'
      }),
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
    },
  })
)
