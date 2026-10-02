import { useTorrentBuilder } from './TorrentBuilder'
import { ShareLimitsMode, Torrent } from '@/types/vuetorrent'

function makeTorrent(): Torrent {
  return {
    hash: 'abc123',
    content_path: 'foo/bar',
    download_path: '/downloads',
    savePath: '/save',
    time_active: 100,
    seeding_time: 50,
    downloaded: 1000,
    uploaded: 2000,
    dlspeed: 10,
    upspeed: 20,
    tracker: 'http://tracker.example.com/announce',
  } as Torrent
}

describe('composables/TorrentBuilder/share_limits_mode', () => {
  const { buildFromPartialUpdate } = useTorrentBuilder()

  it.each([
    ['Default', ShareLimitsMode.DEFAULT],
    ['MatchAny', ShareLimitsMode.MATCH_ANY],
    ['MatchAll', ShareLimitsMode.MATCH_ALL],
  ])('maps the %s string to the matching enum value', (raw, expected) => {
    const torrent = buildFromPartialUpdate('abc123', { share_limits_mode: raw } as any, makeTorrent())

    expect(torrent.share_limits_mode).toBe(expected)
  })

  it('keeps numeric enum values unchanged', () => {
    const torrent = buildFromPartialUpdate('abc123', { share_limits_mode: ShareLimitsMode.MATCH_ALL }, makeTorrent())

    expect(torrent.share_limits_mode).toBe(ShareLimitsMode.MATCH_ALL)
  })
})
