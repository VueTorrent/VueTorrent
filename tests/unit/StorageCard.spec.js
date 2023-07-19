import { describe, beforeEach, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import StorageCard from '@/components/Core/StorageCard.vue'

const label = 'Downloaded'
const value = 10000
const color = 'download'

let wrapper
describe('StorageCard.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(StorageCard, {
      propsData: {label, value, color},
      filters: {
        formatDataValue: vi.fn().mockReturnValue('9.77'),
        formatDataUnit: vi.fn().mockReturnValue('KB')
      },
      mocks: {
        $store: {
          getters: { shouldUseBinaryData: vi.fn().mockReturnValue(true) },
        }
      }
    })
  })

  it('should render the label', () => {
    expect(wrapper.find('[data-testid="StorageCard-label"]').text()).toEqual(label)
  })

  it('should render value and unit & be formatted', () => {
    expect(wrapper.find('[data-testid="StorageCard-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="StorageCard-value"]').text()).toBe('9.77')

    expect(wrapper.find('[data-testid="StorageCard-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="StorageCard-unit"]').text()).toBe('KB')
  })

  it('text should have the passed-in color', () => {
    expect(wrapper.find('[data-testid="StorageCard-label"]').classes()).toContain(color + '--text')
    expect(wrapper.find('[data-testid="StorageCard-Wrapper"]').classes()).toContain(color + '--text')
  })
})
