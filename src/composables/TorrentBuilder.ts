import { Torrent } from '@/types/VueTorrent'
import { Torrent as QbitTorrent } from '@/types/qbit/models'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useI18n } from 'vue-i18n'

export function useTorrentBuilder() {
  const { t } = useI18n()

  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  const durationFormat = 'D[d] H[h] m[m] s[s]'
  const computedValues = ['globalSpeed', 'globalVolume', 'priority']

  function buildFromQbit(data: QbitTorrent, format = 'DD/MM/YYYY, HH:mm:ss'): Torrent {
    const torrent = {
      added_on: dayjs(data.added_on * 1000).format(format),
      amount_left: data.amount_left,
      auto_tmm: data.auto_tmm,
      availability: Math.round(data.availability * 100) / 100,
      available_peers: data.num_incomplete,
      available_seeds: data.num_complete,
      category: data.category,
      completed_on: data.completion_on > 0 ? dayjs(data.completion_on * 1000).format(format) : t('dashboard.not_complete'),
      content_path: data.content_path,
      dl_limit: data.dl_limit,
      dlspeed: data.dlspeed,
      download_path: data.download_path,
      downloaded: data.downloaded,
      downloaded_session: data.downloaded_session,
      eta: formatEta(data.eta),
      f_l_piece_prio: data.f_l_piece_prio,
      forced: data.force_start,
      hash: data.hash,
      infohash_v1: data.infohash_v1,
      infohash_v2: data.infohash_v2,
      last_activity: dayjs(data.last_activity * 1000).fromNow(),
      magnet: data.magnet_uri,
      name: data.name,
      num_leechs: data.num_leechs,
      num_seeds: data.num_seeds,
      priority: data.priority,
      progress: Math.round(data.progress * 10000) / 100,
      ratio: Math.round(data.ratio * 100) / 100,
      ratio_limit: data.max_ratio,
      ratio_time_limit: data.max_seeding_time,
      savePath: data.save_path,
      seeding_time: data.seeding_time > 0 ? dayjs.duration(data.seeding_time, 'seconds').format(durationFormat) : null,
      seen_complete: data.seen_complete > 0 ? dayjs(data.seen_complete * 1000).format(format) : t('dashboard.not_complete').toString(),
      seq_dl: data.seq_dl,
      size: data.size,
      state: data.state,
      super_seeding: data.super_seeding,
      tags: data.tags.length > 0 ? data.tags.split(', ').map(t => t.trim()) : [],
      time_active: dayjs.duration(data.time_active, 'seconds').format(durationFormat),
      total_size: data.total_size,
      tracker: data.tracker,
      trackers_count: data.trackers_count,
      up_limit: data.up_limit,
      uploaded: data.uploaded,
      uploaded_session: data.uploaded_session,
      upspeed: data.upspeed
    }

    return Object.freeze({
      ...torrent,
      globalSpeed: torrent.dlspeed + torrent.upspeed,
      globalVolume: torrent.downloaded + torrent.uploaded
    })
  }

  function formatEta(value: number): string {
    const options = { dayLimit: 100 }
    const minute = 60
    const hour = minute * 60
    const day = hour * 24
    const year = day * 365

    const durations = [year, day, hour, minute, 1]
    const units = 'ydhms'

    let index = 0
    let unitSize = 0
    const parts = []

    const defaultOptions = {
      maxUnitSize: 2,
      dayLimit: 0,
      minUnit: 0
    }

    const opt = options ? Object.assign(defaultOptions, options) : defaultOptions

    if (opt.dayLimit && value >= opt.dayLimit * day) {
      return '∞'
    }

    while ((!opt.maxUnitSize || unitSize !== opt.maxUnitSize) && index !== durations.length) {
      const duration = durations[index]
      if (value < duration) {
        index++
        continue
      } else if (opt.minUnit && durations.length - index <= opt.minUnit) {
        break
      }

      const result = Math.floor(value / duration)
      parts.push(result + units[index])

      value %= duration
      index++
      unitSize++
    }

    if (!parts.length) {
      return '0' + units[durations.length - 1 - opt.minUnit]
    }

    return parts.join(' ')
  }

  return { computedValues, buildFromQbit }
}