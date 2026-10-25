import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import FilterSelectMulti from './FilterSelectMulti.vue'
import { FilterType } from '@/constants/vuetorrent'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

describe('FilterSelectMulti', () => {
  test('exposes filter mode as a keyboard-operable toggle', async () => {
    const wrapper = mount(FilterSelectMulti, {
      props: {
        title: 'Category Filter',
        items: [],
        filterType: FilterType.CONJUNCTIVE,
        include: [],
        exclude: [],
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    const button = wrapper.find('button.filter-type-button')
    expect(button.attributes('type')).toBe('button')
    expect(button.attributes('aria-label')).toContain('Category Filter')
    expect(button.attributes('aria-pressed')).toBe('true')

    await button.trigger('click')
    expect(wrapper.emitted('toggleFilterType')).toHaveLength(1)

    await wrapper.setProps({ filterType: FilterType.DISJUNCTIVE })
    expect(button.attributes('aria-pressed')).toBe('false')
  })
})
