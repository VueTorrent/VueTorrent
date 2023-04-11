import { createLocalVue, mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'


export function setup(component, propsData) {
  const localVue = createLocalVue() // because of vuetify, we should use a localVue instance
  const vuetify = createVuetify()

  return mount(component, {
    localVue,
    vuetify,
    propsData
  })
}
