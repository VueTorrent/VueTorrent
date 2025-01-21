import type { TorrentState } from '@/constants/qbit'

export interface RawTorrent {
  /** Time (Unix Epoch) when the torrent was added to the client */
  added_on: number
  /** Amount of data left to download (bytes) */
  amount_left: number
  /** Whether this torrent is managed by Automatic Torrent Management */
  auto_tmm: boolean
  /** Percentage of file pieces currently available */
  availability: number
  /** Category of the torrent */
  category: string
  /**
   * Torrent comment
   * @since 5.0.0
   */
  comment?: string
  /** Amount of transfer data completed (bytes) */
  completed: number
  /** Time (Unix Epoch) when the torrent completed */
  completion_on: number
  /** Absolute path of torrent content (root path for multifile torrents, absolute file path for singlefile torrents) */
  content_path: string
  /** Torrent download speed limit (bytes/s). -1 if unlimited. */
  dl_limit: number
  /** Torrent download speed (bytes/s) */
  dlspeed: number
  /** Torrent download path */
  download_path: string
  /** Amount of data downloaded */
  downloaded: number
  /** Amount of data downloaded this session */
  downloaded_session: number
  /** Torrent ETA (seconds) */
  eta: number
  /** True if first last piece are prioritized */
  f_l_piece_prio: boolean
  /** True if force start is enabled for this torrent */
  force_start: boolean
  /**
   * Whether metadata has been downloaded or not, only useful for magnet links
   * @since 5.0.0
   */
  has_metadata?: boolean
  inactive_seeding_time_limit: number
  /** Torrent SHA1 Hash */
  infohash_v1: string
  /** Torrent SHA256 Hash (only in LibTorrent v2) */
  infohash_v2: string
  /** Last time (Unix Epoch) when a chunk was downloaded/uploaded */
  last_activity: number
  /** Magnet URI corresponding to this torrent */
  magnet_uri: string
  max_inactive_seeding_time: number
  /** Maximum share ratio until torrent is stopped from seeding/uploading */
  max_ratio: number
  /** Maximum seeding time (seconds) until torrent is stopped from seeding */
  max_seeding_time: number
  /** Torrent name */
  name: string
  /** Number of seeds in the swarm */
  num_complete: number
  /** Number of leechers in the swarm */
  num_incomplete: number
  /** Number of leechers connected to */
  num_leechs: number
  /** Number of seeds connected to */
  num_seeds: number
  /**
   * Ratio / Time Active (in months), indicates how popular the torrent is
   * @since 5.0.0
   */
  popularity?: number
  /** Torrent priority. Returns -1 if queuing is disabled or torrent is in seed mode */
  priority: number
  /**
   * Whether torrent is private or not
   * @since 5.0.0
   */
  private?: boolean
  /** Torrent progress (percentage/100) */
  progress: number
  /** Torrent share ratio. Max ratio value: 9999. */
  ratio: number
  /** Upload share ratio limit */
  ratio_limit: number
  /**
   * Seconds until next tracker reannounce
   * @since 5.0.0
   */
  reannounce?: number
  /**
   * TODO
   * @since 5.1.0
   */
  root_path?: string
  /** Path where this torrent's data is stored */
  save_path: string
  /** Torrent elapsed time while complete (seconds) */
  seeding_time: number
  /** Upload seeding time limit */
  seeding_time_limit: number
  /** Time (Unix Epoch) when this torrent was last seen complete */
  seen_complete: number
  /** True if sequential download is enabled */
  seq_dl: boolean
  /** Total size (bytes) of files selected for download */
  size: number
  /** Torrent state. See table here below for the possible values */
  state: TorrentState
  /** True if super seeding is enabled */
  super_seeding: boolean
  /** Comma-concatenated tag list of the torrent */
  tags: string
  /** Total active time (seconds) */
  time_active: number
  /** Total size (bytes) of all file in this torrent (including unselected ones) */
  total_size: number
  /** The first tracker with working status. Returns empty string if no tracker is working. */
  tracker: string
  /** The number of trackers registered for that torrent */
  trackers_count: number
  /** Torrent upload speed limit (bytes/s). -1 if unlimited. */
  up_limit: number
  /** Amount of data uploaded */
  uploaded: number
  /** Amount of data uploaded this session */
  uploaded_session: number
  /** Torrent upload speed (bytes/s) */
  upspeed: number
}

export interface Torrent extends RawTorrent {
  /** Torrent hash */
  hash: string
}
