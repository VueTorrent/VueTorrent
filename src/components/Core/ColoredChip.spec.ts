import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ColoredChip from './ColoredChip.vue'

const defaultColor = 'default'
const disabledValue = 'disabled value'
const value = 'foo'
const fooRgb = 'rgb(123, 47, 222)'

describe('ColoredChip.vue', () => {
  it('should render chip with random color and value', () => {
    const chip = mount(ColoredChip, {
      props: { defaultColor, value },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              vuetorrent: {
                enableHashColors: true
              }
            }
          }),
          i18n,
          vuetify
        ]
      }
    })

    expect(chip.attributes().style).toContain(`background-color: ${fooRgb}`)
    expect(chip.text()).toBe(value)
  })

  it('should render chip with default color and value', () => {
    const chip = mount(ColoredChip, {
      props: { defaultColor, value },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              vuetorrent: {
                enableHashColors: false
              }
            }
          }),
          i18n,
          vuetify
        ]
      }
    })

    expect(chip.classes()).toContain(`bg-${defaultColor}`)
    expect(chip.text()).toBe(value)
  })

  it('should render chip with default color and default value', () => {
    const chip = mount(ColoredChip, {
      props: { defaultColor, disabled: true, disabledValue, value },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              vuetorrent: {
                enableHashColors: true
              }
            }
          }),
          i18n,
          vuetify
        ]
      }
    })

    expect(chip.classes()).toContain(`bg-${defaultColor}`)
    expect(chip.text()).toBe(disabledValue)
  })
})
