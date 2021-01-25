import { setup } from '../helpers'
import StorageCard from '@/components/Core/StorageCard'

describe('StorageCard.vue', () => {
  
  it('should render the label', () => {
    const label = 'Downloaded'
    const wrapper = setup(StorageCard, { label })
    expect(wrapper.find('[data-testid="StorageCard-label"]').text()).toEqual(label)
  })

  it('should render value and unit & be formatted', () => {
    const wrapper = setup(StorageCard, { value: 10000 })
    expect(wrapper.find('[data-testid="StorageCard-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="StorageCard-value"]').text()).toBe('9.77')

    expect(wrapper.find('[data-testid="StorageCard-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="StorageCard-unit"]').text()).toBe('KB')
  })

  it('text should have the passed-in color', () => {
    const color = 'download'
    const wrapper = setup(StorageCard, { color })
    expect(wrapper.find('[data-testid="StorageCard-label"]').classes()).toContain(color + '--text')
    expect(wrapper.find('[data-testid="StorageCard-Wrapper"]').classes()).toContain(color + '--text')
  })
})