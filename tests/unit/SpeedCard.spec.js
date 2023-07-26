import { describe, expect, it, vi } from 'vitest'

import { mdiChevronDown } from '@mdi/js'
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { setup } from '../helpers'

describe('SpeedCard.vue', () => {
  it('should render the card', () => {
    const wrapper = setup(SpeedCard, {}, { $store: { getters: { shouldUseBitSpeed: vi.fn().mockReturnValue(true) } } })
    expect(wrapper.find('[data-testid="SpeedCard"]').exists()).toBe(true)
  })

  it("shouldn't render the icon", () => {
    const wrapper = setup(SpeedCard, {}, { $store: { getters: { shouldUseBitSpeed: vi.fn().mockReturnValue(true) } } })
    expect(wrapper.find('[data-testid="SpeedCard-icon"]').exists()).toBe(false)
  })

  it('should render the icon', () => {
    const wrapper = setup(SpeedCard, { icon: mdiChevronDown }, { $store: { getters: { shouldUseBitSpeed: vi.fn().mockReturnValue(true) } } })
    expect(wrapper.find('[data-testid="SpeedCard-icon"]').exists()).toBe(true)
  })

  it('should render with 0 as value', () => {
    const wrapper = setup(SpeedCard, {}, { $store: { getters: { shouldUseBitSpeed: vi.fn().mockReturnValue(false) } } })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('0')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('B/s')
  })

  it('should render value (0 decimals) and unit & be formatted', () => {
    const wrapper = setup(SpeedCard, { value: 26823 }, { $store: { getters: { shouldUseBitSpeed: vi.fn().mockReturnValue(false) } } })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('26.8')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('kB/s')
  })

  it('should render value (1 decimals) and unit & be formatted', () => {
    const wrapper = setup(SpeedCard, { value: 10899700 }, { $store: { getters: { shouldUseBitSpeed: vi.fn().mockReturnValue(false) } } })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('10.9')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('MB/s')
  })
})
