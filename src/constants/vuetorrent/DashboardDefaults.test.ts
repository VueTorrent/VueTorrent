import { describe, it, expect, vi } from 'vitest'
import { propsMetadata, pptMetadataText, pptMetadataChip } from './DashboardDefaults'
import { DashboardProperty } from './DashboardProperty'
import { getRatioColor } from '@/helpers/colors'
import type { Torrent } from '@/types/vuetorrent'
import { TorrentState } from '@/constants/vuetorrent'
import { getTorrentStateColor } from '@/helpers'

import { setActivePinia, storeToRefs, defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useTheme } from 'vuetify'
import { ref } from 'vue'
import { useI18nUtils } from '@/composables'

export const useVueTorrentStore = defineStore('vuetorrent', () => {
  const { global } = useTheme()
  const enableRatioColors = ref(true)
  return {
    themeName: global.name,
    enableRatioColors
  }
})

beforeEach(() => {
  setActivePinia(
    createTestingPinia({
      initialState: {
        vueTorrent: {
          enableRatioColors: true
        }
      },
      stubActions: false
    })
  )
})

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

vi.mock('vuetify', () => ({
  useTheme: () => ({
    global: {
      name: 'mock-theme'
    }
  })
}))

const mockTorrents: Torrent[] = [{ ratio: 0.3 } as Torrent, { ratio: 0.7 } as Torrent, { ratio: 3 } as Torrent, { ratio: 8 } as Torrent]

describe('propsMetadata color logic', () => {
  it('returns correct ratio color when enabled', () => {
    const ratioMetadata = propsMetadata[DashboardProperty.RATIO] as pptMetadataText
    if (ratioMetadata.props.color) {
      mockTorrents.forEach(mockTorrent => {
        const color = ratioMetadata.props.color!(mockTorrent)
        expect(color).toBe(getRatioColor(mockTorrent.ratio))
      })
    }
  })

  it('returns empty string when ratio color is not enabled', () => {
    const store = useVueTorrentStore()
    const { enableRatioColors } = storeToRefs(store)
    enableRatioColors.value = false

    const ratioMetadata = propsMetadata[DashboardProperty.RATIO] as pptMetadataText
    if (ratioMetadata.props.color) {
      mockTorrents.forEach(mockTorrent => {
        const color = ratioMetadata.props.color!(mockTorrent)
        expect(color).toBe('')
      })
    }
  })
})

describe('torrent ratio limit string', () => {
  it('returns correct ratio string', () => {
    const ratioLimitMetadata = propsMetadata[DashboardProperty.RATIO_LIMIT] as pptMetadataText
    const { t } = useI18nUtils()

    expect(ratioLimitMetadata.props.value!({ ratio_limit: -1 } as Torrent)).toBe(t('common.disabled'))
    expect(ratioLimitMetadata.props.value!({ ratio_limit: -2 } as Torrent)).toBe(t('common.global_value'))
    expect(ratioLimitMetadata.props.value!({ ratio_limit: 1 } as Torrent)).toBe('1')
    expect(ratioLimitMetadata.props.value!({ ratio_limit: 2 } as Torrent)).toBe('2')
  })
})

describe('torrent state string and color', () => {
  it('returns correct torrent state string and color', () => {
    const stateMetadata = propsMetadata[DashboardProperty.STATE] as pptMetadataChip
    const { getTorrentStateString } = useI18nUtils()
    const torrentStates = [
      TorrentState.CHECKING_DISK,
      TorrentState.CHECKING_RESUME_DATA,
      TorrentState.DL_FORCED,
      TorrentState.DL_QUEUED,
      TorrentState.DL_STALLED,
      TorrentState.DL_STOPPED,
      TorrentState.DOWNLOADING,
      TorrentState.ERROR,
      TorrentState.FORCED_META_DOWNLOAD,
      TorrentState.META_DOWNLOAD,
      TorrentState.MISSING_FILES,
      TorrentState.MOVING,
      TorrentState.UL_FORCED,
      TorrentState.UL_QUEUED,
      TorrentState.UL_STALLED,
      TorrentState.UL_STOPPED,
      TorrentState.UNKNOWN,
      TorrentState.UPLOADING
    ]
    torrentStates.forEach(state => {
      const mockTorrent = { state } as Torrent
      const expectedStateString = getTorrentStateString(state)
      const expectedStateColor = getTorrentStateColor(state)
      expect(stateMetadata.props.value!(mockTorrent)).toEqual([expectedStateString])
      expect(stateMetadata.props.color!(mockTorrent)).toBe(expectedStateColor)
    })
  })
})
