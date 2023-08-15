import { Priority, TorrentState } from '@/constants/qbit'

export default interface Torrent {
  raw_added_on: number
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
  state: TorrentState
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

  // computed
  globalSpeed: number
  globalVolume: number

  [key: string]: any
}
