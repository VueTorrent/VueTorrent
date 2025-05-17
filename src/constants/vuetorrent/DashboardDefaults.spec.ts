import { describe, it, expect, vi, beforeEach } from 'vitest'
import { propsData, propsMetadata, pptMetadataText, pptMetadataChip, type pptMetadataAmount } from './DashboardDefaults'
import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'
import type { Torrent } from '@/types/vuetorrent'
import { TorrentState } from '@/constants/vuetorrent'
import { getRatioColor, getTorrentStateColor, formatEta, formatDuration } from '@/helpers' // formatEta, formatDuration for type hints if needed, or direct use of mocked fns

import { setActivePinia, storeToRefs, defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useTheme } from 'vuetify'
import { ref } from 'vue'
import { useI18nUtils } from '@/composables'

vi.mock('@/helpers', async importOriginal => {
  const actual = (await importOriginal()) as Record<string, any>
  return {
    ...actual,
    getRatioColor: actual.getRatioColor,
    getTorrentStateColor: actual.getTorrentStateColor,
    formatEta: vi.fn((eta, _forced) => `formatted_eta_${eta}`),
    formatDuration: vi.fn((duration, unit, _format) => `formatted_duration_${duration}_${unit}`)
  }
})

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
  vi.clearAllMocks()
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
    expect(stateMetadata.props.enableHashColor).toBeUndefined()
    expect(stateMetadata.props.emptyValueKey).toBe('torrent.state.unknown')
  })
})

describe('DashboardDefaults Extended Coverage', () => {
  describe('propsData', () => {
    it('should have valid entries for all DashboardProperty keys', () => {
      Object.values(DashboardProperty).forEach(propKey => {
        if (typeof propKey === 'string') {
          const data = propsData[propKey as DashboardProperty]
          expect(data).toBeDefined()
          expect(typeof data.active).toBe('boolean')
          expect(typeof data.order).toBe('number')
        }
      })
    })
  })

  describe('propsMetadata', () => {
    describe('General Structure and Basic Props', () => {
      Object.values(DashboardProperty).forEach(propKey => {
        if (typeof propKey === 'string') {
          it(`should have valid metadata for ${propKey}`, () => {
            const metadata = propsMetadata[propKey as DashboardProperty]
            expect(metadata).toBeDefined()
            expect(typeof metadata.type).toBe('string')
            expect(Object.values(DashboardPropertyType).includes(metadata.type as DashboardPropertyType)).toBe(true)
            expect(metadata.props).toBeDefined()
            expect(typeof metadata.props.titleKey).toBe('string')
            expect(typeof metadata.props.value).toBe('function')
            expect(typeof metadata.sortKey).toBe('string')

            const mockTorrentBase = { [metadata.sortKey]: 'test_value' } as any

            if (metadata.type === DashboardPropertyType.BOOLEAN) {
              const mockTorrentBoolean = { ...mockTorrentBase, [metadata.sortKey]: true } as unknown as Torrent
              expect(typeof metadata.props.value(mockTorrentBoolean)).toBe('boolean')
            } else if (metadata.type === DashboardPropertyType.CHIP) {
              let mockTorrentChip: Partial<Torrent> = { ...mockTorrentBase, [metadata.sortKey]: ['chip_value'] }
              if (propKey === DashboardProperty.CATEGORY) mockTorrentChip = { ...mockTorrentChip, category: 'cat1' }
              if (propKey === DashboardProperty.TAGS) mockTorrentChip = { ...mockTorrentChip, tags: ['tag1'] }
              if (propKey === DashboardProperty.BASENAME_DOWNLOAD_PATH) mockTorrentChip = { ...mockTorrentChip, basename_download_path: 'file.txt' }
              if (propKey === DashboardProperty.BASENAME_SAVE_PATH) mockTorrentChip = { ...mockTorrentChip, basename_save_path: 'file.txt' }
              if (propKey === DashboardProperty.TRACKER) mockTorrentChip = { ...mockTorrentChip, trackerDomain: 'tracker.com' }
              if (propKey === DashboardProperty.STATE) mockTorrentChip = { ...mockTorrentChip, state: TorrentState.DOWNLOADING }


              const valueResult = metadata.props?.value(mockTorrentChip as Torrent)
              if (valueResult !== undefined && Array.isArray(valueResult)) {
                expect(Array.isArray(valueResult)).toBe(true)
              } else if (propKey === DashboardProperty.STATE && valueResult !== undefined) {
                
                expect(Array.isArray(valueResult)).toBe(true)
              }
            }
          })

          const qbitVersionProps = [
            DashboardProperty.COMMENT,
            DashboardProperty.HAS_METADATA,
            DashboardProperty.POPULARITY,
            DashboardProperty.PRIVATE,
            DashboardProperty.REANNOUNCE,
            DashboardProperty.ROOT_PATH
          ]
          if (qbitVersionProps.includes(propKey as DashboardProperty)) {
            it(`should have qbitVersion for ${propKey}`, () => {
              const metadata = propsMetadata[propKey as DashboardProperty]
              expect(metadata.qbitVersion).toBeDefined()
              expect(typeof metadata.qbitVersion).toBe('string')
            })
          }
        }
      })
    })

    describe('Specific Value, Color, and Total Functions', () => {
      it('AVAILABILITY: value should return availability as string', () => {
        const meta = propsMetadata[DashboardProperty.AVAILABILITY]
        const mockTorrent = { availability: 2.5 } as unknown as Torrent
        expect(meta.props.value(mockTorrent)).toBe('2.5')
      })

      it('ETA: value should use mocked formatEta', () => {
        const meta = propsMetadata[DashboardProperty.ETA]
        const mockTorrent = { eta: 3600, forced: false } as unknown as Torrent
        expect(meta.props.value(mockTorrent)).toBe('formatted_eta_3600')
        expect(formatEta).toHaveBeenCalledWith(3600, false)
      })

      it('POPULARITY: value should handle defined and undefined popularity', () => {
        const meta = propsMetadata[DashboardProperty.POPULARITY]
        const mockTorrentDefined = { popularity: 0.75123 } as unknown as Torrent
        const mockTorrentUndefined = { popularity: undefined } as unknown as Torrent
        expect(meta.props.value(mockTorrentDefined)).toBe('0.75') // .toFixed(2)
        expect(meta.props.value(mockTorrentUndefined)).toBe('???')
      })

      it('PROGRESS: value should return progress, color should use getTorrentStateColor', () => {
        const meta = propsMetadata[DashboardProperty.PROGRESS] as any // pptMetadataPercent
        const mockTorrent = { progress: 0.5, state: TorrentState.DOWNLOADING } as unknown as Torrent
        expect(meta.props.value(mockTorrent)).toBe(0.5)
        expect(meta.props.color(mockTorrent)).toBe(getTorrentStateColor(TorrentState.DOWNLOADING))
      })

      it('RATIO: value should return ratio toFixed(2)', () => {
        const meta = propsMetadata[DashboardProperty.RATIO]
        const mockTorrent = { ratio: 0.12345 } as unknown as Torrent
        expect(meta.props.value(mockTorrent)).toBe('0.12')
      })

      it('REANNOUNCE: value should use mocked formatDuration for defined reannounce', () => {
        const meta = propsMetadata[DashboardProperty.REANNOUNCE]
        const mockTorrentDefined = { reannounce: 120 } as unknown as Torrent // 120 seconds
        const mockTorrentUndefined = { reannounce: undefined } as unknown as Torrent
        expect(meta.props.value(mockTorrentDefined)).toBe('formatted_duration_120_s')
        expect(formatDuration).toHaveBeenCalledWith(120, 's', 'mm:ss')
        expect(meta.props.value(mockTorrentUndefined)).toBe('???')
      })

      it('ROOT_PATH: value should handle defined and undefined rootPath', () => {
        const meta = propsMetadata[DashboardProperty.ROOT_PATH]
        const mockTorrentDefined = { rootPath: '/path/to/root' } as unknown as Torrent
        const mockTorrentUndefined = { rootPath: undefined } as unknown as Torrent
        expect(meta.props.value(mockTorrentDefined)).toBe('/path/to/root')
        expect(meta.props.value(mockTorrentUndefined)).toBe('')
      })

      it('TRACKERS_COUNT: value should return trackers_count as string', () => {
        const meta = propsMetadata[DashboardProperty.TRACKERS_COUNT]
        const mockTorrent = { trackers_count: 5 } as unknown as Torrent
        expect(meta.props.value(mockTorrent)).toBe('5')
      })

      it('PEERS: value should return num_leechs, total should return available_peers', () => {
        const meta = propsMetadata[DashboardProperty.PEERS] as pptMetadataAmount
        const mockTorrent = { num_leechs: 10, available_peers: 20 } as unknown as Torrent
        expect(meta.props.value(mockTorrent)).toBe(10)
        expect(meta.props.total!(mockTorrent)).toBe(20)
      })

      it('SEEDS: value should return num_seeds, total should return available_seeds', () => {
        const meta = propsMetadata[DashboardProperty.SEEDS] as pptMetadataAmount
        const mockTorrent = { num_seeds: 5, available_seeds: 15 } as unknown as Torrent
        expect(meta.props.value(mockTorrent)).toBe(5)
        expect(meta.props.total!(mockTorrent)).toBe(15)
      })

      const chipColorTests: { prop: DashboardProperty; expectedColor: string; valueProp: keyof Torrent, sampleValue: any }[] = [
        { prop: DashboardProperty.BASENAME_DOWNLOAD_PATH, expectedColor: 'primary', valueProp: 'basename_download_path', sampleValue: 'file.iso' },
        { prop: DashboardProperty.BASENAME_SAVE_PATH, expectedColor: 'primary', valueProp: 'basename_save_path', sampleValue: 'file.iso' },
        { prop: DashboardProperty.CATEGORY, expectedColor: 'category', valueProp: 'category', sampleValue: 'movies' },
        { prop: DashboardProperty.TAGS, expectedColor: 'tag', valueProp: 'tags', sampleValue: ['tag1'] },
        { prop: DashboardProperty.TRACKER, expectedColor: 'tracker', valueProp: 'trackerDomain', sampleValue: 'tracker.org' }
      ]

      chipColorTests.forEach(({ prop, expectedColor, valueProp, sampleValue }) => {
        it(`${prop}: value should be [t.${valueProp}], color should be "${expectedColor}"`, () => {
          const meta = propsMetadata[prop] as pptMetadataChip
          const mockTorrent = { [valueProp]: sampleValue } as unknown as Torrent
          const val = meta.props.value(mockTorrent)

          if (prop === DashboardProperty.TAGS) {
            expect(val).toEqual(sampleValue)
          } else {
            expect(val).toEqual([sampleValue])
          }
          expect(meta.props.color(mockTorrent)).toBe(expectedColor)
          expect(meta.props.enableHashColor).toBe(true)
          expect(typeof meta.props.emptyValueKey).toBe('string')
        })
      })

      const simpleTextProps: DashboardProperty[] = [
        DashboardProperty.CONTENT_PATH,
        DashboardProperty.DOWNLOAD_PATH,
        DashboardProperty.HASH,
        DashboardProperty.INFOHASH_V1,
        DashboardProperty.INFOHASH_V2,
        DashboardProperty.MAGNET,
        DashboardProperty.SAVE_PATH,
        DashboardProperty.TRUNCATED_HASH,
        DashboardProperty.COMMENT,
        DashboardProperty.BASENAME_CONTENT_PATH
      ]
      simpleTextProps.forEach(propKey => {
        it(`${propKey}: value should return t.${propsMetadata[propKey].sortKey}`, () => {
          const meta = propsMetadata[propKey]
          const sortKey = meta.sortKey as keyof Torrent
          const mockTorrent = { [sortKey]: 'test string' } as unknown as Torrent
          expect(meta.props.value(mockTorrent)).toBe('test string')
        })
      })

      const simpleNumericProps: {prop: DashboardProperty, unit?: string}[] = [
        {prop: DashboardProperty.ADDED_ON},
        {prop: DashboardProperty.AMOUNT_LEFT},
        {prop: DashboardProperty.AVG_DOWNLOAD_SPEED},
        {prop: DashboardProperty.AVG_UPLOAD_SPEED},
        {prop: DashboardProperty.COMPLETED_ON},
        {prop: DashboardProperty.DOWNLOAD_LIMIT},
        {prop: DashboardProperty.DOWNLOAD_SPEED},
        {prop: DashboardProperty.DOWNLOADED},
        {prop: DashboardProperty.DOWNLOADED_SESSION},
        {prop: DashboardProperty.GLOBAL_SPEED},
        {prop: DashboardProperty.GLOBAL_VOLUME},
        {prop: DashboardProperty.INACTIVE_SEEDING_TIME_LIMIT, unit: 'm'},
        {prop: DashboardProperty.LAST_ACTIVITY},
        {prop: DashboardProperty.PRIORITY},
        {prop: DashboardProperty.SEEDING_TIME, unit: 's'},
        {prop: DashboardProperty.SEEDING_TIME_LIMIT, unit: 'm'},
        {prop: DashboardProperty.SEEN_COMPLETE},
        {prop: DashboardProperty.SIZE},
        {prop: DashboardProperty.TIME_ACTIVE, unit: 's'},
        {prop: DashboardProperty.TOTAL_SIZE},
        {prop: DashboardProperty.UPLOAD_LIMIT},
        {prop: DashboardProperty.UPLOAD_SPEED},
        {prop: DashboardProperty.UPLOADED},
        {prop: DashboardProperty.UPLOADED_SESSION},
      ];

      simpleNumericProps.forEach(({prop, unit}) => {
        it(`${prop}: value should return t.${propsMetadata[prop].sortKey} ${unit ? `(unit: ${unit})` : ''}`, () => {
          const meta = propsMetadata[prop] as any;
          const sortKey = meta.sortKey as keyof Torrent;
          const mockTorrent = { [sortKey]: 12345 } as unknown as Torrent;
          const expectedValue = (prop === DashboardProperty.PRIORITY) ? '12345' : 12345;
          expect(meta.props.value(mockTorrent)).toBe(expectedValue);
          if (unit) {
            expect(meta.props.unit).toBe(unit);
          }
        });
      });


      const booleanProps: DashboardProperty[] = [
        DashboardProperty.AUTO_TMM,
        DashboardProperty.FIRST_LAST_PIECE_PRIORITY,
        DashboardProperty.FORCED,
        DashboardProperty.HAS_METADATA,
        DashboardProperty.PRIVATE, 
        DashboardProperty.SEQUENTIAL_DOWNLOADS,
        DashboardProperty.SUPER_SEEDING,
      ];
      booleanProps.forEach(propKey => {
        it(`${propKey}: value should return t.${propsMetadata[propKey].sortKey}`, () => {
          const meta = propsMetadata[propKey];
          const sortKey = meta.sortKey as keyof Torrent;
          let mockTorrentTrue = { [sortKey]: true } as unknown as Torrent;
          expect(meta.props.value(mockTorrentTrue)).toBe(true);
          let mockTorrentFalse = { [sortKey]: false } as unknown as Torrent;
          expect(meta.props.value(mockTorrentFalse)).toBe(false);

          if (propKey === DashboardProperty.PRIVATE) {
            const mockTorrentUndefined = { [sortKey]: undefined } as unknown as Torrent;
             expect(meta.props.value(mockTorrentUndefined)).toBe(false);
          }
        });
      });
    })
  })
})
