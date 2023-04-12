import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'

export function setup(component: any, props?: any) {
  const vuetify = createVuetify()

  return mount(component, {
    global: {
      plugins: [vuetify, createPinia()]
    },
    props
  })
}
