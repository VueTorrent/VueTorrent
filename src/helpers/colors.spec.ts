import { TorrentState } from '@/constants/vuetorrent'
import { expect, test } from 'vitest'
import { getColorFromName, getRatioColor, getTorrentStateColor, getTorrentStateValue } from './colors'

test('helpers/colors/getColorFromName', () => {
  expect(getColorFromName('foo')).toBe('#7b2fde')
  expect(getColorFromName('bar')).toBe('#97e374')
  expect(getColorFromName('baz')).toBe('#447ecf')
})

test('helpers/colors/getRatioColor', () => {
  expect(getRatioColor(0)).toBe('text-ratio-bad')
  expect(getRatioColor(0.4)).toBe('text-ratio-bad')
  expect(getRatioColor(0.5)).toBe('text-ratio-almost')
  expect(getRatioColor(0.9)).toBe('text-ratio-almost')
  expect(getRatioColor(1)).toBe('text-ratio-good')
  expect(getRatioColor(4.9)).toBe('text-ratio-good')
  expect(getRatioColor(5)).toBe('text-ratio-best')
  expect(getRatioColor(10)).toBe('text-ratio-best')
})

test('helpers/colors/getTorrentStateColor', () => {
  expect(getTorrentStateColor(TorrentState.UNKNOWN)).toBe('torrent-unknown')
  expect(getTorrentStateColor(TorrentState.ERROR)).toBe('torrent-error')
  expect(getTorrentStateColor(TorrentState.MISSING_FILES)).toBe('torrent-missing_files')
  expect(getTorrentStateColor(TorrentState.META_DOWNLOAD)).toBe('torrent-meta_download')
  expect(getTorrentStateColor(TorrentState.FORCED_META_DOWNLOAD)).toBe('torrent-forced_meta_download')
  expect(getTorrentStateColor(TorrentState.UL_PAUSED)).toBe('torrent-ul_paused')
  expect(getTorrentStateColor(TorrentState.UL_QUEUED)).toBe('torrent-ul_queued')
  expect(getTorrentStateColor(TorrentState.UL_STALLED)).toBe('torrent-ul_stalled')
  expect(getTorrentStateColor(TorrentState.UPLOADING)).toBe('torrent-uploading')
  expect(getTorrentStateColor(TorrentState.UL_FORCED)).toBe('torrent-ul_forced')
  expect(getTorrentStateColor(TorrentState.DL_PAUSED)).toBe('torrent-dl_paused')
  expect(getTorrentStateColor(TorrentState.DL_QUEUED)).toBe('torrent-dl_queued')
  expect(getTorrentStateColor(TorrentState.DL_STALLED)).toBe('torrent-dl_stalled')
  expect(getTorrentStateColor(TorrentState.DOWNLOADING)).toBe('torrent-downloading')
  expect(getTorrentStateColor(TorrentState.DL_FORCED)).toBe('torrent-dl_forced')
  expect(getTorrentStateColor(TorrentState.CHECKING_DISK)).toBe('torrent-checking_disk')
  expect(getTorrentStateColor(TorrentState.CHECKING_RESUME_DATA)).toBe('torrent-checking_resume_data')
  expect(getTorrentStateColor(TorrentState.MOVING)).toBe('torrent-moving')
})

test('helpers/colors/getTorrentStateValue', () => {
  expect(getTorrentStateValue(TorrentState.UNKNOWN)).toBe('unknown')
  expect(getTorrentStateValue(TorrentState.ERROR)).toBe('error')
  expect(getTorrentStateValue(TorrentState.MISSING_FILES)).toBe('missing_files')
  expect(getTorrentStateValue(TorrentState.META_DOWNLOAD)).toBe('meta_download')
  expect(getTorrentStateValue(TorrentState.FORCED_META_DOWNLOAD)).toBe('forced_meta_download')
  expect(getTorrentStateValue(TorrentState.UL_PAUSED)).toBe('ul_paused')
  expect(getTorrentStateValue(TorrentState.UL_QUEUED)).toBe('ul_queued')
  expect(getTorrentStateValue(TorrentState.UL_STALLED)).toBe('ul_stalled')
  expect(getTorrentStateValue(TorrentState.UPLOADING)).toBe('uploading')
  expect(getTorrentStateValue(TorrentState.UL_FORCED)).toBe('ul_forced')
  expect(getTorrentStateValue(TorrentState.DL_PAUSED)).toBe('dl_paused')
  expect(getTorrentStateValue(TorrentState.DL_QUEUED)).toBe('dl_queued')
  expect(getTorrentStateValue(TorrentState.DL_STALLED)).toBe('dl_stalled')
  expect(getTorrentStateValue(TorrentState.DOWNLOADING)).toBe('downloading')
  expect(getTorrentStateValue(TorrentState.DL_FORCED)).toBe('dl_forced')
  expect(getTorrentStateValue(TorrentState.CHECKING_DISK)).toBe('checking_disk')
  expect(getTorrentStateValue(TorrentState.CHECKING_RESUME_DATA)).toBe('checking_resume_data')
  expect(getTorrentStateValue(TorrentState.MOVING)).toBe('moving')
})
