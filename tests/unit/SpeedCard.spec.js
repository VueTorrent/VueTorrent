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

  it('should render value and unit & be formatted', () => {
    const wrapper = setup(SpeedCard, { value: 10000 })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('9.77')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('KB/s')
  })
})