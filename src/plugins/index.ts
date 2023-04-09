import type { App } from 'vue'
import vuetify from './vuetify'
import VueApexCharts from 'vue3-apexcharts'
import router from '@/router'
import i18n from './i18n'
import { Toast, config } from './toast'
import { VueQueryPlugin } from '@tanstack/vue-query'
import pinia from './pinia'

export const registerPlugins = (app: App) => {
  app.use(router)
  app.use(vuetify)
  app.use(pinia)
  app.use(VueApexCharts)
  app.use(i18n)
  app.use(Toast, config)
  app.use(VueQueryPlugin)
}
;(async () => {
  const webFontLoader = await import('webfontloader')

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap']
    }
  })
})()
