import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { createTestingPinia } from '@pinia/testing'
import { mount, VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect } from 'vitest'
import { ref } from 'vue'
import MixedButton from './MixedButton.vue'

const icon = 'mdi-home'
const text = 'test value'

const getIconElement = (el: VueWrapper) => el.find('[data-testid="mixedbtn-icon"]')
const getTextElement = (el: VueWrapper) => el.find('[data-testid="mixedbtn-text"]')

const mobile = ref(true)

vi.mock('vuetify', async importOriginal => {
  const mod = await importOriginal<typeof import('vuetify')>()
  return {
    ...mod,
    useDisplay: vi.fn(() => ({ mobile }))
  }
})

describe('MixedButton.vue', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render icon in mobile view', () => {
    mobile.value = true
    const btn = mount(MixedButton, {
      props: { icon, text },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify]
      }
    })

    const iconElement = getIconElement(btn)
    const textElement = getTextElement(btn)
    expect(iconElement.exists(), 'icon element should be rendered').true
    expect(iconElement.classes()).include(icon)
    expect(textElement.exists(), "text element shouldn't be rendered").false
  })

  it('should render text in desktop view', () => {
    mobile.value = false
    const btn = mount(MixedButton, {
      props: { icon, text },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify]
      }
    })

    const iconElement = getIconElement(btn)
    const textElement = getTextElement(btn)
    expect(iconElement.exists(), "icon element shouldn't be rendered").false
    expect(textElement.exists(), 'text element should be rendered').true
    expect(textElement.text()).eq(text)
  })

  it('should render icon in override mobile view', () => {
    const btn = mount(MixedButton, {
      props: { icon, text, mobileOverride: true, mobileValue: true },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify]
      }
    })

    const iconElement = getIconElement(btn)
    const textElement = getTextElement(btn)
    expect(iconElement.exists(), 'icon element should be rendered').true
    expect(iconElement.classes()).include(icon)
    expect(textElement.exists(), "text element shouldn't be rendered").false
  })

  it('should render text in override desktop view', () => {
    const btn = mount(MixedButton, {
      props: { icon, text, mobileOverride: true, mobileValue: false },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify]
      }
    })

    const iconElement = getIconElement(btn)
    const textElement = getTextElement(btn)
    expect(iconElement.exists(), "icon element shouldn't be rendered").false
    expect(textElement.exists(), 'text element should be rendered').true
    expect(textElement.text()).eq(text)
  })
})
