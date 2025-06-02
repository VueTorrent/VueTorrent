export default interface TorrentProperties {
  /** When this torrent was added (unix timestamp), similar to `added_on` */
  addition_date: number
  /** Torrent comment */
  comment: string
  /** Torrent completion date (unix timestamp), similar to `completed_on` */
  completion_date: number
  /** Torrent creator */
  created_by: string
  /** Torrent creation date (Unix timestamp) */
  creation_date: number
  /** Torrent download limit (bytes/s), similar to `dl_limit` */
  dl_limit: number
  /** Torrent download speed (bytes/second), similar to `dlspeed` */
  dl_speed: number
  /** Torrent average download speed (bytes/second) */
  dl_speed_avg: number
  /** Torrent download path, similar to `download_path` */
  download_path: string
  /** Torrent ETA (seconds), similar to `eta` */
  eta: number
  /**
   * TODO: Whether torrent metadata has been downloaded, only useful for magnet links
   */
  has_metadata?: boolean
  /** Torrent hash, similar to `hash` */
  hash: string
  /** Torrent Infohash V1, similar to `infohash_v1` */
  infohash_v1: string
  /** Torrent Infohash V2, similar to `infohash_v2` */
  infohash_v2: string
  /**
   * Whether torrent is private or not
   * @deprecated since 5.X, use private instead */
  is_private?: boolean
  /** Last seen complete date (unix timestamp), similar to `seen_complete` */
  last_seen: number
  /** Torrent name, similar to `name` */
  name: string
  /** Torrent connection count */
  nb_connections: number
  /** Torrent connection count limit */
  nb_connections_limit: number
  /** Number of peers connected to, similar to `num_leechs` */
  peers: number
  /** Number of peers in the swarm, similar to `available_peers` */
  peers_total: number
  /** Torrent piece size (bytes) */
  piece_size: number
  /** Number of pieces owned */
  pieces_have: number
  /** Number of pieces of the torrent */
  pieces_num: number
  /**
   * TODO: Torrent popularity
   */
  popularity?: number
  /** Whether torrent is private or not */
  private?: boolean
  /**
   * Torrent progress (percentage/100)
   * @since 5.1.0
   */
  progress?: number
  /** Number of seconds until the next announce */
  reannounce: number
  /** Torrent save path, similar to `save_path` */
  save_path: string
  /** Torrent elapsed time while complete (seconds), similar to `seeding_time` */
  seeding_time: number
  /** Number of seeds connected to, similar to `num_seeds` */
  seeds: number
  /** Number of seeds in the swarm, similar to `available_seeds` */
  seeds_total: number
  /** Torrent share ratio, similar to `ratio` */
  share_ratio: number
  /** Torrent elapsed time (seconds), similar to `time_active` */
  time_elapsed: number
  /** Total data downloaded for torrent (bytes), similar to `downloaded` */
  total_downloaded: number
  /** Total data downloaded this session (bytes), similar to `downloaded_session` */
  total_downloaded_session: number
  /** Torrent total size (bytes), similar to `total_size` */
  total_size: number
  /** Total data uploaded for torrent (bytes), similar to `uploaded` */
  total_uploaded: number
  /** Total data uploaded this session (bytes), similar to `uploaded_session` */
  total_uploaded_session: number
  /** Total data wasted for torrent (bytes) */
  total_wasted: number
  /** Torrent upload limit (bytes/s), similar to `up_limit` */
  up_limit: number
  /** Torrent upload speed (bytes/second), similar to `upspeed` */
  up_speed: number
  /** Torrent average upload speed (bytes/second) */
  up_speed_avg: number
}
