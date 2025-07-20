import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect } from 'vitest'
import StringCard from './StringCard.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

const baseProps = {
  title: 'title',
  icon: 'icon',
}

describe('components/Core/Cards/StringCard.vue', () => {
  describe('should display value as string', () => {
    test.each([['value1'], ['value2'], [1], [2], [true], [false]])('%s', value => {
      const wrapper = mount(StringCard, {
        props: {
          ...baseProps,
          value,
        },
        global: {
          plugins: [createTestingPinia(), i18n, vuetify],
        },
      })

      expect(wrapper.text()).toBe(value.toString())
    })
  })
})
