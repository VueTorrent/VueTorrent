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

  it('shouldn\'t render the value or unit', () => {
    const wrapper = setup(SpeedCard)
    expect(wrapper.find('[data-testid="SpeedCard-value"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="SpeedCard-unit"]').exists()).toBe(false)
  })

  it('should render the icon', () => {
    const wrapper = setup(SpeedCard, { icon: mdiChevronDown })
    expect(wrapper.find('[data-testid="SpeedCard-icon"]').exists()).toBe(true)
  })

  it('should render value and unit & formatted', () => {
    const wrapper = setup(SpeedCard, { icon: mdiChevronDown, value: 100 })
    expect(wrapper.find('[data-testid="SpeedCard-value"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-value"]').text()).toBe('100')

    expect(wrapper.find('[data-testid="SpeedCard-unit"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="SpeedCard-unit"]').text()).toBe('b/s')
  })
})