import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { h } from 'vue'
import { VExpansionPanels } from 'vuetify/components'

import PanelDuration from './PanelDuration.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { Torrent } from '@/types/vuetorrent'

const now = 1_700_000_000

function mountPanel(torrent: Torrent) {
  return mount(() => h(VExpansionPanels, { modelValue: 0 }, () => h(PanelDuration, { torrent })), {
    global: {
      plugins: [createTestingPinia(), i18n, vuetify],
    },
  })
}

function findValue(wrapper: ReturnType<typeof mountPanel>, title: string) {
  return wrapper
    .findAll('.v-sheet')
    .find(sheet => sheet.find('.pl-4').text() === title)
    ?.find('.pr-4')
    .text()
}

describe('PanelDuration.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(now * 1000)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Display time since last activity as time inactive', () => {
    const wrapper = mountPanel({ last_activity: now - 90_061 } as Torrent)

    expect(findValue(wrapper, 'Time Inactive')).toBe('0Y 0M 1d 1h 1m 1s')
  })

  test('Display N/A when torrent was never active', () => {
    const wrapper = mountPanel({ last_activity: 0 } as Torrent)

    expect(findValue(wrapper, 'Time Inactive')).toBe('N/A')
  })
})
