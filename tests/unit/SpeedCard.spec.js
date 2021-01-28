import { setup } from '../helpers'
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { mdiChevronDown } from '@mdi/js'

describe('SpeedCard.vue', () => {
  it('should render the card', () => {
    const wrapper = setup(SpeedCard)
    expect(wrapper.find('[data-testid="SpeedCard"]').exists()).toBe(true)
  })

  it('shouldn\'t render the icon', () => {
    const wrapper = setup(SpeedCard)
    expect(wrapper.find('[data-testid="SpeedCard-icon"]').exists()).toBe(false)
  })

  it('should render the icon', () => {
    const wrapper = setup(SpeedCard, { icon: mdiChevronDown })
    expect(wrapper.find('[data-testid="SpeedCard-icon"]').exists()).toBe(true)
  })

  it('should render with 0 as value', () => {
    const wrapper = setup(SpeedCard)
    expect(wrapper.find('[data-testid="SpeedCard-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('0')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('B/s')
  })

  it('should render value (0 decimals) and unit & be formatted', () => {
    const wrapper = setup(SpeedCard, { value: 26823 })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('26')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('KB/s')
  })

  it('should render value (2 decimals) and unit & be formatted', () => {
    const wrapper = setup(SpeedCard, { value: 10899700 })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('10.39')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('MB/s')
  })
})