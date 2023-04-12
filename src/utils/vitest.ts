import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'

export function setup(component: any, propsData?: any) {
  const vuetify = createVuetify() 

  return mount(component, {
    vuetify,
    propsData
  })
}