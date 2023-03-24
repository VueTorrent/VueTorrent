import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Priority, TorrentState as QbitTorrentState } from '@/enums/qbit'
import { TorrentState as VtTorrentState } from '@/enums/vuetorrent'
import type { Torrent as QbitTorrent } from '@/types/qbit/models'
import i18n from '@/plugins/i18n'

dayjs.extend(duration)
dayjs.extend(relativeTime)

const durationFormat = 'D[d] H[h] m[m] s[s]'

export default class Torrent {
  static computedValues = ['globalSpeed', 'globalVolume']

  added_on: string
  amount_left: number
  auto_tmm: boolean
  availability: number
  available_peers: number
  available_seeds: number
  category: string
  completed_on: string
  content_path: string
  dl_limit: number
  dlspeed: number
  download_path: string
  downloaded: number
  downloaded_session: number
  eta: string
  f_l_piece_prio: boolean
  forced: boolean
  hash: string
  infohash_v1: string
  infohash_v2: string
  last_activity: string
  magnet: string
  name: string
  num_leechs: number
  num_seeds: number
  priority: Priority
  progress: number
  ratio: number
  ratio_limit: number
  ratio_time_limit: number
  savePath: string
  seeding_time: string | null
  seen_complete: string
  seq_dl: boolean
  size: number
  state: VtTorrentState
  super_seeding: boolean
  tags: string[] | null
  time_active: string
  total_size: number
  tracker: string
  trackers_count: number
  up_limit: number
  uploaded: number
  uploaded_session: number
  upspeed: number
  globalSpeed: number
  globalVolume: number
  constructor(data: QbitTorrent, format = 'DD/MM/YYYY, HH:mm:ss') {
    this.added_on = dayjs(data.added_on * 1000).format(format)
    this.amount_left = data.amount_left
    this.auto_tmm = data.auto_tmm
    this.availability = Math.round(data.availability * 100) / 100
    this.available_peers = data.num_incomplete
    this.available_seeds = data.num_complete
    this.category = data.category
    this.completed_on = data.completion_on > 0 ? dayjs(data.completion_on * 1000).format(format) : i18n.t('dashboard.not_complete').toString()
    this.content_path = data.content_path
    this.dl_limit = data.dl_limit
    this.dlspeed = data.dlspeed
    this.download_path = data.download_path
    this.downloaded = data.downloaded
    this.downloaded_session = data.downloaded_session
    this.eta = this.formatEta(data.eta)
    this.f_l_piece_prio = data.f_l_piece_prio
    this.forced = data.force_start
    this.hash = data.hash
    this.infohash_v1 = data.infohash_v1
    this.infohash_v2 = data.infohash_v2
    this.last_activity = dayjs(data.last_activity * 1000).fromNow()
    this.magnet = data.magnet_uri
    this.name = data.name
    this.num_leechs = data.num_leechs
    this.num_seeds = data.num_seeds
    this.priority = data.priority
    this.progress = Math.round(data.progress * 10000) / 100
    this.ratio = Math.round(data.ratio * 100) / 100
    this.ratio_limit = data.max_ratio
    this.ratio_time_limit = data.max_seeding_time
    this.savePath = data.save_path
    this.seeding_time = data.seeding_time > 0 ? dayjs.duration(data.seeding_time, 'seconds').format(durationFormat) : null
    this.seen_complete = data.seen_complete > 0 ? dayjs(data.seen_complete * 1000).format(format) : i18n.t('dashboard.not_complete').toString()
    this.seq_dl = data.seq_dl
    this.size = data.size
    this.state = this.formatState(data.state)
    this.super_seeding = data.super_seeding
    this.tags = data.tags.length > 0 ? data.tags.split(', ').map(t => t.trim()) : null
    this.time_active = dayjs.duration(data.time_active, 'seconds').format(durationFormat)
    this.total_size = data.total_size
    this.tracker = data.tracker
    this.trackers_count = data.trackers_count
    this.up_limit = data.up_limit
    this.uploaded = data.uploaded
    this.uploaded_session = data.uploaded_session
    this.upspeed = data.upspeed

    // computed values
    this.globalSpeed = this.dlspeed + this.upspeed
    this.globalVolume = this.downloaded + this.uploaded

    Object.freeze(this)
  }

  private formatState(state: QbitTorrentState): VtTorrentState {
    switch (state) {
      case QbitTorrentState.FORCED_DL:
      case QbitTorrentState.DOWNLOADING:
        return VtTorrentState.DOWNLOADING
      case QbitTorrentState.META_DL:
        return VtTorrentState.METADATA
      case QbitTorrentState.FORCED_UP:
      case QbitTorrentState.UPLOADING:
      case QbitTorrentState.STALLED_UP:
        return VtTorrentState.SEEDING
      case QbitTorrentState.PAUSED_DL:
        return VtTorrentState.PAUSED
      case QbitTorrentState.PAUSED_UP:
        return VtTorrentState.DONE
      case QbitTorrentState.QUEUED_DL:
      case QbitTorrentState.QUEUED_UP:
        return VtTorrentState.QUEUED
      case QbitTorrentState.ALLOCATING:
      case QbitTorrentState.CHECKING_DL:
      case QbitTorrentState.CHECKING_UP:
      case QbitTorrentState.CHECKING_RESUME_DATA:
        return VtTorrentState.CHECKING
      case QbitTorrentState.MOVING:
        return VtTorrentState.MOVING
      case QbitTorrentState.STALLED_DL:
        return VtTorrentState.STALLED
      case QbitTorrentState.MISSING_FILES:
      case QbitTorrentState.ERROR:
        return VtTorrentState.FAIL
      case QbitTorrentState.UNKNOWN:
      default:
        return VtTorrentState.UNKNOWN
    }
  }

  private formatEta(value: number): string {
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
}
