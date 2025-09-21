import { TorrentState } from '@/constants/vuetorrent/TorrentState'

export default interface Torrent {
  added_on: number
  amount_left: number
  auto_tmm: boolean
  availability: number
  available_peers: number
  available_seeds: number
  get avgDownloadSpeed(): number
  get avgUploadSpeed(): number
  get basename_content_path(): string
  get basename_download_path(): string
  get basename_save_path(): string
  category: string
  comment: string
  completed_on: number
  content_path: string
  dl_limit: number
  dlspeed: number
  /** @since 4.4.0 */
  download_path: string
  downloaded: number
  downloaded_session: number
  eta: number
  f_l_piece_prio: boolean
  forced: boolean
  get globalSpeed(): number
  get globalVolume(): number
  hasMetadata: boolean
  hash: string
  inactive_seeding_time_limit: number
  infohash_v1: string
  infohash_v2: string
  last_activity: number
  magnet: string
  name: string
  num_leechs: number
  num_seeds: number
  /** @since 5.0.0 */
  popularity?: number
  priority: number
  /** @since 5.0.0 */
  private?: boolean
  progress: number
  ratio: number
  ratio_limit: number
  /** @since 5.0.0 */
  reannounce?: number
  /** @since 5.1.0 */
  rootPath?: string
  savePath: string
  seeding_time: number
  seeding_time_limit: number
  seen_complete: number
  seq_dl: boolean
  size: number
  state: TorrentState
  super_seeding: boolean
  tags: string[]
  time_active: number
  total_size: number
  tracker: string
  get trackerDomain(): string
  trackers_count: number
  get truncated_hash(): string
  up_limit: number
  uploaded: number
  uploaded_session: number
  upspeed: number
}
