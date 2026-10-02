import { useTorrentBuilder } from './TorrentBuilder'
import { TorrentState } from '@/constants/qbit'
import { QbitTorrent } from '@/types/qbit/models'
import { ShareLimitAction, ShareLimitsMode } from '@/types/vuetorrent'

function makeQbitTorrent(overrides: Partial<QbitTorrent> = {}): QbitTorrent {
  return {
    added_on: 1,
    amount_left: 0,
    auto_tmm: false,
    availability: 1,
    num_complete: 1,
    num_incomplete: 1,
    category: '',
    comment: '',
    completion_on: 0,
    content_path: 'foo/bar',
    dl_limit: -1,
    dlspeed: 0,
    download_path: '/downloads',
    downloaded: 0,
    downloaded_session: 0,
    eta: 0,
    f_l_piece_prio: false,
    force_start: false,
    has_metadata: true,
    hash: 'abc123',
    inactive_seeding_time_limit: -2,
    infohash_v1: 'hashv1',
    infohash_v2: 'hashv2',
    last_activity: 0,
    magnet_uri: '',
    name: 'test torrent',
    num_leechs: 0,
    num_seeds: 0,
    popularity: 0,
    priority: 0,
    private: false,
    progress: 0,
    ratio: 0,
    ratio_limit: -2,
    share_limit_action: ShareLimitAction.DEFAULT,
    share_limits_mode: ShareLimitsMode.DEFAULT,
    reannounce: 0,
    root_path: '/',
    save_path: '/save',
    seeding_time: 0,
    seeding_time_limit: -2,
    seen_complete: 0,
    seq_dl: false,
    size: 0,
    state: TorrentState.DOWNLOADING,
    super_seeding: false,
    tags: '',
    time_active: 0,
    total_size: 0,
    tracker: '',
    trackers_count: 0,
    up_limit: -1,
    uploaded: 0,
    uploaded_session: 0,
    upspeed: 0,
    ...overrides,
  } as QbitTorrent
}

describe('composables/TorrentBuilder/share_limits_mode', () => {
  const { buildFromQbit } = useTorrentBuilder()

  it.each([
    ['Default', ShareLimitsMode.DEFAULT],
    ['MatchAny', ShareLimitsMode.MATCH_ANY],
    ['MatchAll', ShareLimitsMode.MATCH_ALL],
  ])('maps the %s string to the matching enum value', (raw, expected) => {
    const torrent = buildFromQbit(makeQbitTorrent({ share_limits_mode: raw as unknown as ShareLimitsMode }))

    expect(torrent.share_limits_mode).toBe(expected)
  })

  it('keeps numeric enum values unchanged', () => {
    const torrent = buildFromQbit(makeQbitTorrent({ share_limits_mode: ShareLimitsMode.MATCH_ALL }))

    expect(torrent.share_limits_mode).toBe(ShareLimitsMode.MATCH_ALL)
  })

  it('falls back to Default when the mode is missing', () => {
    const torrent = buildFromQbit(makeQbitTorrent({ share_limits_mode: undefined }))

    expect(torrent.share_limits_mode).toBe(ShareLimitsMode.DEFAULT)
  })
})
