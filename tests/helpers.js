import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'

export function setup(component, propsData) {
  const localVue = createLocalVue() // because of vuetify, we should use a localVue instance
  const vuetify = new Vuetify()

  return mount(component, {
    localVue,
    vuetify,
    propsData
  })
}
