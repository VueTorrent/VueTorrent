import { createTestingPinia } from '@pinia/testing'
import { mount, VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect } from 'vitest'
import { ref } from 'vue'
import MixedButton from './MixedButton.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

const icon = 'mdi-home'
const text = 'test value'

function getLeftIconElement(el: VueWrapper) {
  return el.find('[data-testid="mixedbtn-icon-left"]')
}
function getRightIconElement(el: VueWrapper) {
  return el.find('[data-testid="mixedbtn-icon-right"]')
}
function getTextElement(el: VueWrapper) {
  return el.find('[data-testid="mixedbtn-text"]')
}

const mobileRef = ref(true)

vi.mock('vuetify', async importOriginal => {
  const mod = await importOriginal<typeof import('vuetify')>()
  return {
    ...mod,
    useDisplay: vi.fn(() => ({ mobile: mobileRef })),
  }
})

describe('MixedButton.vue', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    mobileRef.value = false
  })

  it.each([
    // Default desktop mode
    /// no position => only text
    { mobile: false, mobileOverride: undefined, mobileValue: undefined, position: undefined, render: { left: false, text: true, right: false } },
    /// left position => left icon and text
    { mobile: false, mobileOverride: undefined, mobileValue: undefined, position: 'left', render: { left: true, text: true, right: false } },
    /// right position => text and right icon
    { mobile: false, mobileOverride: undefined, mobileValue: undefined, position: 'right', render: { left: false, text: true, right: true } },

    // Override desktop mode
    /// no position => only text
    { mobile: false, mobileOverride: true, mobileValue: false, position: undefined, render: { left: false, text: true, right: false } },
    /// left position => left icon and text
    { mobile: false, mobileOverride: true, mobileValue: false, position: 'left', render: { left: true, text: true, right: false } },
    /// right position => text and right icon
    { mobile: false, mobileOverride: true, mobileValue: false, position: 'right', render: { left: false, text: true, right: true } },

    // Default mobile mode
    /// only left icon regardless of position
    { mobile: true, mobileOverride: undefined, mobileValue: undefined, position: undefined, render: { left: true, text: false, right: false } },
    { mobile: true, mobileOverride: undefined, mobileValue: undefined, position: 'left', render: { left: true, text: false, right: false } },
    { mobile: true, mobileOverride: undefined, mobileValue: undefined, position: 'right', render: { left: true, text: false, right: false } },

    // Override mobile mode
    /// only left icon regardless of position
    { mobile: false, mobileOverride: true, mobileValue: true, position: undefined, render: { left: true, text: false, right: false } },
    { mobile: false, mobileOverride: true, mobileValue: true, position: 'left', render: { left: true, text: false, right: false } },
    { mobile: false, mobileOverride: true, mobileValue: true, position: 'right', render: { left: true, text: false, right: false } },
  ])(
    'left: $render.left, text: $render.text, right: $render.right | mobile: $mobile, mobileOverride: $mobileOverride, mobileValue: $mobileValue, position: $position',
    ({ mobile, mobileOverride, mobileValue, position, render }) => {
      mobileRef.value = mobile
      const btn = mount(MixedButton, {
        // @ts-expect-error Vue: Type string | undefined is not assignable to type 'left' | 'right' | undefined
        props: { icon, text, mobileOverride, mobileValue, position },
        global: {
          plugins: [createTestingPinia(), i18n, vuetify],
        },
      })

      const leftIconElement = getLeftIconElement(btn)
      expect(leftIconElement.exists(), `left icon element should${render.left ? '' : ' NOT'} be rendered`).eq(render.left)
      if (render.left) {
        expect(leftIconElement.classes()).include(icon)
      }

      const textElement = getTextElement(btn)
      expect(textElement.exists(), `text element shouldn${render.text ? '' : ' NOT'} be rendered`).eq(render.text)
      if (render.text) {
        expect(textElement.text()).eq(text)
      }

      const rightIconElement = getRightIconElement(btn)
      expect(rightIconElement.exists(), `right icon element should${render.right ? '' : ' NOT'} be rendered`).eq(render.right)
      if (render.right) {
        expect(rightIconElement.classes()).include(icon)
      }
    }
  )
})
