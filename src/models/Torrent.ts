import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import {TorrentState as QbitTorrentState} from "@/enums/qbit";
import {TorrentState as VtTorrentState} from "@/enums/vuetorrent";
import type {Torrent as QbitTorrent} from '@/types/qbit/models'

dayjs.extend(duration)
dayjs.extend(relativeTime)

const durationFormat = 'D[d] H[h] m[m] s[s]'

export default class Torrent {
  static computedValues = ['globalSpeed', 'globalVolume']

  name: string
  size: number
  added_on: string
  completed_on: string
  dlspeed: number
  dloaded: number
  upspeed: number
  uploaded: number
  uploaded_session: number
  eta: string
  num_leechs: number
  num_seeds: number
  state: VtTorrentState
  hash: string
  available_seeds: number
  available_peers: number
  savePath: string
  progress: number
  ratio: number
  tags: string[] | null
  category: string
  tracker: string
  f_l_piece_prio: boolean
  seq_dl: boolean
  auto_tmm: boolean
  dl_limit: number
  up_limit: number
  ratio_limit: number
  ratio_time_limit: number
  availability: number
  forced: boolean
  magnet: string
  time_active: string
  seeding_time: string | null
  last_activity: string
  globalSpeed: number
  globalVolume: number
  constructor(data: QbitTorrent, format = 'DD/MM/YYYY, HH:mm:ss') {
    this.name = data.name
    this.size = data.size
    this.added_on = dayjs(data.added_on * 1000).format(format)
    this.completed_on = dayjs(data.completion_on * 1000).format(format)
    this.dlspeed = data.dlspeed
    this.dloaded = data.completed
    this.upspeed = data.upspeed
    this.uploaded = data.uploaded
    this.uploaded_session = data.uploaded_session
    this.eta = this.formatEta(data.eta)
    this.num_leechs = data.num_leechs
    this.num_seeds = data.num_seeds
    this.state = this.formatState(data.state)
    this.hash = data.hash
    this.available_seeds = data.num_complete
    this.available_peers = data.num_incomplete
    this.savePath = data.save_path
    this.progress = Math.round(data.progress * 10000) / 100
    this.ratio = Math.round(data.ratio * 100) / 100
    this.tags = data.tags.length > 0 ? data.tags.split(', ').map(t => t.trim()) : null
    this.category = data.category
    this.tracker = data.tracker
    this.f_l_piece_prio = data.f_l_piece_prio
    this.seq_dl = data.seq_dl
    this.auto_tmm = data.auto_tmm
    this.dl_limit = data.dl_limit
    this.up_limit = data.up_limit
    this.ratio_limit = data.max_ratio
    this.ratio_time_limit = data.max_seeding_time
    this.availability = Math.round(data.availability * 100) / 100
    this.forced = data.state.includes('forced')
    this.magnet = data.magnet_uri
    this.time_active = dayjs.duration(data.time_active, 'seconds').format(durationFormat)
    this.seeding_time = data.seeding_time > 0 ? dayjs.duration(data.seeding_time, 'seconds').format(durationFormat) : null
    this.last_activity = dayjs(data.last_activity * 1000).fromNow()

    // computed values
    this.globalSpeed = this.dlspeed + this.upspeed
    this.globalVolume = this.dloaded + this.uploaded

    Object.freeze(this)
  }

  formatState(state: QbitTorrentState): VtTorrentState {
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
      case QbitTorrentState.UNKNOWN:
      case QbitTorrentState.STALLED_DL:
        return VtTorrentState.STALLED
      case QbitTorrentState.MISSING_FILES:
      default:
        return VtTorrentState.FAIL
    }
  }

  formatEta(value: number): string {
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
