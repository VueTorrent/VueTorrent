import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  directives: {
    Ripple
  }
})

export function setup(component, propsData, mocks) {
  const localVue = createLocalVue() // because of vuetify, we should use a localVue instance
  const vuetify = new Vuetify()

  return mount(component, {
    localVue,
    vuetify,
    propsData,
    mocks
  })
}
