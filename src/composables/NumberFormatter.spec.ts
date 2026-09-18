import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { defineComponent, h } from 'vue'
import { useNumberFormatter } from './NumberFormatter'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

const formatterComponent = defineComponent({
  setup() {
    return useNumberFormatter()
  },
  render() {
    return h('div')
  },
})

function mountFormatter(options: Partial<{ thousandSeparator: string; useBinarySize: boolean; useBitSpeed: boolean }> = {}) {
  const { thousandSeparator = ' ', useBinarySize = false, useBitSpeed = false } = options
  return mount(formatterComponent, {
    global: {
      plugins: [createTestingPinia({ initialState: { vuetorrent: { thousandSeparator, useBinarySize, useBitSpeed } } }), i18n, vuetify],
    },
  })
}

describe('composables/NumberFormatter', () => {
  test('formats data with the configured binary unit', () => {
    const decimal = mountFormatter().vm
    const binary = mountFormatter({ useBinarySize: true }).vm

    expect(decimal.formatData({ data: 1024 })).toBe('1.02 kB')
    expect(binary.formatData({ data: 1024 })).toBe('1.00 kiB')
    expect(binary.formatDataUnit({ data: 1024 })).toBe('kiB')
  })

  test('formats speed with the configured bit unit', () => {
    const bytes = mountFormatter().vm
    const bits = mountFormatter({ useBitSpeed: true }).vm

    expect(bytes.formatSpeed({ speed: 1000 })).toBe('1.00 kB/s')
    expect(bits.formatSpeed({ speed: 1000 })).toBe('8.00 kbps')
    expect(bits.formatSpeedUnit({ speed: 1000 })).toBe('kbps')
  })

  test('formats raw values using the active locale and optional unit', () => {
    const formatter = mountFormatter({ thousandSeparator: ' ' }).vm

    expect(formatter.formatRawNumber({ value: 1234.5, unit: 'B' })).toBe('1 234.5 B')
  })
})
