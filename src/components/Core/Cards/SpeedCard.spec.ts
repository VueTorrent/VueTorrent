import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect } from 'vitest'
import SpeedCard from './SpeedCard.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

const baseProps = {
  title: 'title',
  icon: 'icon',
}

describe('components/Core/Cards/SpeedCard.vue', () => {
  describe('should format value and unit correctly', () => {
    test.each([
      [10, true, '80', 'bps'],
      [10, false, '10', 'B/s'],
      [10_000, true, '80.0', 'kbps'],
      [10_000, false, '10.0', 'kB/s'],
      [10_000_000, true, '80.0', 'Mbps'],
      [10_000_000, false, '10.0', 'MB/s'],
    ])('%i | %s -> %s %s', (value, useBitSpeed, expectedValue, expectedUnit) => {
      const wrapper = mount(SpeedCard, {
        props: {
          ...baseProps,
          value,
        },
        global: {
          plugins: [createTestingPinia({ initialState: { vuetorrent: { useBitSpeed } } }), i18n, vuetify],
        },
      })

      expect(wrapper.find('[data-testid="card-value"]').text()).toBe(expectedValue)
      expect(wrapper.find('[data-testid="card-unit"]').text()).toBe(expectedUnit)
    })
  })
})
