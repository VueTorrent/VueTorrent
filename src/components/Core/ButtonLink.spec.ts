import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import ButtonLink from './ButtonLink.vue'
import { openLink } from '@/helpers'
import vuetify from '@/plugins/vuetify'

vi.mock('@/helpers', () => {
  return {
    openLink: vi.fn(),
  }
})

const link = 'https://example.com/article'

describe('ButtonLink.vue', () => {
  it('renders a text button as a link', () => {
    const wrapper = mount(ButtonLink, {
      props: { link },
      global: { plugins: [vuetify] },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe(link)
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  it('prevents default navigation and opens the link through the helper', () => {
    const wrapper = mount(ButtonLink, {
      props: { link },
      global: { plugins: [vuetify] },
    })
    const event = new MouseEvent('click', { cancelable: true })

    wrapper.element.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
    expect(openLink).toHaveBeenCalledOnce()
    expect(openLink).toHaveBeenCalledWith(link)
  })
})
