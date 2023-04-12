import type { App } from 'vue'
import vuetify from './vuetify'
import VueApexCharts from 'vue3-apexcharts'
import i18n from './i18n'
import { Toast, config } from './toast'
import { VueQueryPlugin } from '@tanstack/vue-query'

const loadFont = async () => {
  const webFontLoader = await import('webfontloader')

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap']
    }
  })
}

export const registerPlugins = (app: App) => {
  loadFont()
  app.use(createPinia())
  app.use(vuetify)
  app.use(VueApexCharts)
  app.use(i18n)
  app.use(Toast, config)
  app.use(VueQueryPlugin)
}
