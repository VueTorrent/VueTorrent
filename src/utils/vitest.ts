import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import VueApexCharts from 'vue3-apexcharts'
import { createPinia } from 'pinia'

export function setup(component: any, props?: any) {
  const vuetify = createVuetify()

  return mount(component, {
    global: {
      plugins: [vuetify, createPinia(), VueApexCharts]
    },
    props
  })
}
