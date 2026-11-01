import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Header from './Header.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

function mountHeader(sortKey: string, activeSortKey: string, reverse: boolean) {
  return mount(Header, {
    props: { title: 'Name', sortKey },
    global: {
      plugins: [createTestingPinia({ initialState: { torrents: { sortCriterias: [{ value: activeSortKey, reverse }] } } }), i18n, vuetify],
    },
  })
}

describe('Table Header', () => {
  test.each([
    ['name', false, 'ascending'],
    ['name', true, 'descending'],
    ['added_on', false, undefined],
  ])('announces sorting for %s, reverse %s', (activeSortKey, reverse, expected) => {
    const wrapper = mountHeader('name', activeSortKey, reverse)
    expect(wrapper.find('th').attributes('aria-sort')).toBe(expected)
  })

  test('uses a native button to activate sorting', async () => {
    const wrapper = mountHeader('name', 'name', false)
    const button = wrapper.find('button')
    expect(button.attributes('type')).toBe('button')
    expect(button.text()).toBe('Name')

    await button.trigger('click')
    expect(wrapper.emitted('onHeaderClick')).toHaveLength(1)

    await wrapper.find('th').trigger('click')
    expect(wrapper.emitted('onHeaderClick')).toHaveLength(2)
  })
})
