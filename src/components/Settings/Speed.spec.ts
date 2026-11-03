import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect } from 'vitest'
import Speed from './Speed.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { usePreferenceStore } from '@/stores'

function mountSpeed() {
  return mount(Speed, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            preferences: {
              preferences: { up_limit: 512_000, dl_limit: 0, alt_up_limit: 1_007_616, alt_dl_limit: 0 },
            },
          },
        }),
        i18n,
        vuetify,
      ],
    },
  })
}

describe('Speed.vue', () => {
  test('displays limits in kiB/s', () => {
    const wrapper = mountSpeed()
    const inputs = wrapper.findAll('input')
    const suffixes = wrapper.findAll('.v-text-field__suffix')

    expect(inputs[0].element.value).toBe('500')
    expect(inputs[2].element.value).toBe('984')
    expect(suffixes).toHaveLength(4)
    suffixes.forEach(suffix => expect(suffix.text()).toBe('kiB/s'))
  })

  test('stores kiB/s values as bytes per second', async () => {
    const wrapper = mountSpeed()
    const preferenceStore = usePreferenceStore()

    await wrapper.findAll('input')[3].setValue(984)

    expect(preferenceStore.preferences!.alt_dl_limit).toBe(1_007_616)
  })
})
