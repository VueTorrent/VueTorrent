import comparatorMap from './Comparators'
import { Torrent } from '@/types/vuetorrent'

const makeMockTorrent = (overrides: Partial<Torrent> = {}): Torrent => ({
  added_on: 1,
  amount_left: 2,
  auto_tmm: true,
  availability: 1,
  available_peers: 10,
  available_seeds: 5,
  avgDownloadSpeed: 100,
  avgUploadSpeed: 50,
  basename_content_path: 'file1',
  basename_download_path: 'downloads',
  basename_save_path: 'save',
  category: 'movies',
  comment: 'great',
  completed_on: 1,
  content_path: '/content',
  dl_limit: 1000,
  dlspeed: 200,
  download_path: '/downloads',
  downloaded: 123456,
  downloaded_session: 789,
  eta: 100,
  f_l_piece_prio: false,
  forced: false,
  globalSpeed: 150,
  globalVolume: 3000,
  hasMetadata: true,
  hash: 'abc123',
  inactive_seeding_time_limit: 500,
  infohash_v1: 'hashv1',
  infohash_v2: 'hashv2',
  last_activity: 10,
  magnet: 'magnet:?xt=urn:btih:abc123',
  name: 'Ubuntu ISO',
  num_leechs: 20,
  num_seeds: 10,
  popularity: 100,
  priority: 5,
  private: false,
  progress: 0.75,
  ratio: 1.2,
  ratio_limit: 2.0,
  reannounce: 30,
  rootPath: '/root',
  savePath: '/save',
  seeding_time: 3600,
  seeding_time_limit: 7200,
  seen_complete: 100,
  seq_dl: false,
  size: 1000000000,
  state: 1,
  super_seeding: false,
  tags: ['tag1', 'tag2'],
  time_active: 5000,
  total_size: 1000000000,
  tracker: 'tracker.example.com',
  trackerDomain: 'example.com',
  trackers_count: 3,
  truncated_hash: 'abc',
  up_limit: 500,
  uploaded: 200000,
  uploaded_session: 1000,
  upspeed: 150,
  ...overrides
})

describe('comparatorMap', () => {
  const keys = Object.keys(comparatorMap) as (keyof Torrent)[]

  it('has a comparator function for each key', () => {
    keys.forEach(key => {
      expect(typeof comparatorMap[key]).toBe('function')
    })
  })

  it('each comparator returns a number and behaves consistently', () => {
    keys.forEach(key => {
      const a = makeMockTorrent({ [key]: typeof makeMockTorrent()[key] === 'number' ? 1 : 'a' })
      const b = makeMockTorrent({ [key]: typeof makeMockTorrent()[key] === 'number' ? 2 : 'b' })

      const comparator = comparatorMap[key]

      const resultAsc = comparator(a, b, true)
      const resultDesc = comparator(a, b, false)

      expect(typeof resultAsc).toBe('number')
      expect(typeof resultDesc).toBe('number')
      if (resultAsc !== 0) {
        const aVal = a[key]
        const bVal = b[key]

        if (key === 'priority') {
          const a = makeMockTorrent({ priority: 5, added_on: 1 })
          const b = makeMockTorrent({ priority: 0, added_on: 2 })

          const comparator = comparatorMap[key]

          expect(comparator(a, b, true)).toBeLessThan(0)
          expect(comparator(b, a, true)).toBeGreaterThan(0)

          const a2 = makeMockTorrent({ priority: 0, added_on: 1 })
          const b2 = makeMockTorrent({ priority: 0, added_on: 2 })
          expect(comparator(a2, b2, true)).toBeLessThan(0)
          expect(comparator(a2, b2, false)).toBeGreaterThan(0)

          return
        } else if (key === 'num_leechs') {
          const comparator = comparatorMap[key]

          const a = makeMockTorrent({ num_leechs: 10, available_peers: 5 })
          const b = makeMockTorrent({ num_leechs: 10, available_peers: 8 })

          const resultAsc = comparator(a, b, true)
          const resultDesc = comparator(a, b, false)

          expect(resultAsc).toBeLessThan(0)
          expect(resultDesc).toBeGreaterThan(0)

          const a2 = makeMockTorrent({ num_leechs: 5, available_peers: 10 })
          const b2 = makeMockTorrent({ num_leechs: 10, available_peers: 2 })

          const resultAsc2 = comparator(a2, b2, true)
          expect(resultAsc2).toBeLessThan(0)

          return
        } else if (key === 'num_seeds') {
          const comparator = comparatorMap[key]

          const a = makeMockTorrent({ num_seeds: 10, available_seeds: 3 })
          const b = makeMockTorrent({ num_seeds: 10, available_seeds: 7 })

          const resultAsc = comparator(a, b, true)
          const resultDesc = comparator(a, b, false)

          expect(resultAsc).toBeLessThan(0)
          expect(resultDesc).toBeGreaterThan(0)

          const a2 = makeMockTorrent({ num_seeds: 3, available_seeds: 10 })
          const b2 = makeMockTorrent({ num_seeds: 5, available_seeds: 5 })

          const resultAsc2 = comparator(a2, b2, true)
          expect(resultAsc2).toBeLessThan(0)

          return
        } else if (key === 'eta') {
          const comparator = comparatorMap[key]

          const a = makeMockTorrent({ eta: 0, forced: true })
          const b = makeMockTorrent({ eta: 100, forced: false })

          const resultAsc = comparator(a, b, true)
          const resultDesc = comparator(a, b, false)

          expect(resultAsc).toBeGreaterThan(0)
          expect(resultDesc).toBeLessThan(0)

          const a2 = makeMockTorrent({ eta: 50, forced: false })
          const b2 = makeMockTorrent({ eta: 100, forced: false })

          const resultAsc2 = comparator(a2, b2, true)
          expect(resultAsc2).toBeLessThan(0)

          const a3 = makeMockTorrent({ eta: 100, forced: false })
          const b3 = makeMockTorrent({ eta: 0, forced: true })

          const resultAsc3 = comparator(a3, b3, true)
          expect(resultAsc3).toBeLessThan(0)

          return
        } else if (typeof aVal === 'number' && typeof bVal === 'number' && aVal !== bVal) {
          if (['last_activity'].includes(key)) {
            expect(resultAsc > 0).toBe(aVal < bVal)
            expect(resultDesc < 0).toBe(aVal < bVal)
          } else {
            expect(resultAsc < 0).toBe(aVal < bVal)
            expect(resultDesc > 0).toBe(aVal < bVal)
          }
        } else if (typeof aVal === 'string' && typeof bVal === 'string' && aVal !== bVal) {
          if (['auto_tmm', 'f_l_piece_prio', 'forced', 'hasMetadata', 'private', 'seq_dl', 'super_seeding'].includes(key)) {
            expect(resultAsc > 0).toBe(aVal < bVal)
            expect(resultDesc < 0).toBe(aVal < bVal)
          } else {
            expect(resultAsc < 0).toBe(aVal < bVal)
            expect(resultDesc > 0).toBe(aVal < bVal)
          }
        }
      }
    })
  })
})
