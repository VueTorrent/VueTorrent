import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect } from 'vitest'
import UnitCard from './UnitCard.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

const baseProps = {
  title: 'title',
  icon: 'icon',
}

describe('components/Core/Cards/UnitCard.vue', () => {
  test('Display value and unit correctly', () => {
    const wrapper = mount(UnitCard, {
      props: {
        ...baseProps,
        value: 123_456,
        unit: 'ms',
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    const valueField = wrapper.find('[data-testid="card-value"]')
    expect(valueField.exists()).toBe(true)
    expect(valueField.classes('font-weight-bold')).toBe(true)
    expect(valueField.text()).toBe('123456')

    const unitField = wrapper.find('[data-testid="card-unit"]')
    expect(unitField.exists()).toBe(true)
    expect(unitField.classes('font-weight-light')).toBe(true)
    expect(unitField.text()).toBe('ms')
  })
})
