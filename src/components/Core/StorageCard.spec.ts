import { describe, it, expect } from 'vitest'
import { setup } from '@/utils/vitest'
import StorageCard from '@/components/Core/StorageCard.vue'

const label = 'Downloaded'
const color = 'download'

describe('StorageCard.vue', () => {
  it('should render the label', () => {
    const wrapper = setup(StorageCard, { label, color, value: 0 })
    expect(wrapper.find('[data-testid="StorageCard-label"]').text()).toEqual(label)
  })

  it('should render value and unit & be formatted', () => {
    const wrapper = setup(StorageCard, { label, color, value: 10000 })
    expect(wrapper.find('[data-testid="StorageCard-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="StorageCard-value"]').text()).toBe('9.77')

    expect(wrapper.find('[data-testid="StorageCard-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="StorageCard-unit"]').text()).toBe('KB')
  })

  it('text should have the passed-in color', () => {
    const wrapper = setup(StorageCard, { label, color, value: 1 })
    expect(wrapper.find('[data-testid="StorageCard-label"]').classes()).toContain('text-' + color)
    expect(wrapper.find('[data-testid="StorageCard-Wrapper"]').classes()).toContain('text-' + color)
  })
})
