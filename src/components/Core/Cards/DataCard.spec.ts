import { createTestingPinia } from '@pinia/testing'
import { mount, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

import DataCard from './DataCard.vue'
import i18n from '@/plugins/i18n.ts'
import vuetify from '@/plugins/vuetify.ts'

const title = 'Downloaded'
const value = 10000
const color = 'download'

let wrapper: VueWrapper
describe('DataCard.vue', () => {
  beforeEach(() => {
    wrapper = mount(DataCard, {
      propsData: { title, value, color },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })
  })

  it('should render the title', () => {
    expect(wrapper.find('[data-testid="card-title"]').text()).toEqual(title)
  })

  it('should render value and unit & be formatted', () => {
    expect(wrapper.find('[data-testid="card-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="card-value"]').text()).toBe('10.0')

    expect(wrapper.find('[data-testid="card-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="card-unit"]').text()).toBe('kB')
  })

  it('text should have the passed-in color', () => {
    expect(wrapper.find('[data-testid="card-wrapper"]').classes()).toContain('text-' + color)
  })
})
