import { describe, it, expect } from 'vitest'
import { setup } from '@/utils/vitest'
import { mdiChevronDown } from '@mdi/js'
import SpeedCard from '@/components/Core/SpeedCard.vue'

import { beforeAll } from 'vitest'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  }
})

const color = 'upload'
const icon = mdiChevronDown

describe('SpeedCard.vue', () => {
  it('should render the icon', () => {
    const wrapper = setup(SpeedCard, { value: 1, color, icon })
    expect(wrapper.find('[data-testid="SpeedCard-icon"]').exists()).toBe(true)
  })

  it('should render with 0 as value', () => {
    const wrapper = setup(SpeedCard, { value: 0, color, icon })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('0')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('B/s')
  })

  it('should render value (0 decimals) and unit & be formatted', () => {
    const wrapper = setup(SpeedCard, { value: 26823, color, icon })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('26')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('KB/s')
  })

  it('should render value (1 decimals) and unit & be formatted', () => {
    const wrapper = setup(SpeedCard, { value: 10899700, color, icon })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('10.4')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('MB/s')
  })
})
