import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect } from 'vitest'
import DataCard from './DataCard.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

const baseProps = {
  title: 'title',
  icon: 'icon',
}

describe('DataCard.vue', () => {
  describe('should format value and unit correctly', () => {
    test.each([
      [10, true, '10', 'B'],
      [10, false, '10', 'B'],
      [10_240, true, '10.0', 'kiB'],
      [10_000, false, '10.0', 'kB'],
      [10_485_760, true, '10.0', 'MiB'],
      [10_000_000, false, '10.0', 'MB'],
    ])('%i | %s -> %s %s', (value, useBinarySize, expectedValue, expectedUnit) => {
      const wrapper = mount(DataCard, {
        props: {
          ...baseProps,
          value,
        },
        global: {
          plugins: [createTestingPinia({ initialState: { vuetorrent: { useBinarySize } } }), i18n, vuetify],
        },
      })

      expect(wrapper.find('[data-testid="card-value"]').text()).toBe(expectedValue)
      expect(wrapper.find('[data-testid="card-unit"]').text()).toBe(expectedUnit)
    })
  })
})
