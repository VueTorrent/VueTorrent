export default interface TorrentProperties {
  /** When this torrent was added (unix timestamp) */
  addition_date: number
  /** Torrent comment */
  comment: string
  /** Torrent completion date (unix timestamp) */
  completion_date: number
  /** Torrent creator */
  created_by: string
  /** Torrent creation date (Unix timestamp) */
  creation_date: number
  /** Torrent download limit (bytes/s) */
  dl_limit: number
  /** Torrent download speed (bytes/second) */
  dl_speed: number
  /** Torrent average download speed (bytes/second) */
  dl_speed_avg: number
  /** Torrent download path */
  download_path: string
  /** Torrent ETA (seconds) */
  eta: number
  /** Torrent hash */
  hash: string
  /** Torrent Infohash V1 */
  infohash_v1: string
  /** Torrent Infohash V2 */
  infohash_v2: string
  /** Whether torrent is private or not */
  is_private: boolean
  /** Last seen complete date (unix timestamp) */
  last_seen: number
  /** Torrent name */
  name: string
  /** Torrent connection count */
  nb_connections: number
  /** Torrent connection count limit */
  nb_connections_limit: number
  /** Number of peers connected to */
  peers: number
  /** Number of peers in the swarm */
  peers_total: number
  /** Torrent piece size (bytes) */
  piece_size: number
  /** Number of pieces owned */
  pieces_have: number
  /** Number of pieces of the torrent */
  pieces_num: number
  /** Number of seconds until the next announce */
  reannounce: number
  /** Torrent save path */
  save_path: string
  /** Torrent elapsed time while complete (seconds) */
  seeding_time: number
  /** Number of seeds connected to */
  seeds: number
  /** Number of seeds in the swarm */
  seeds_total: number
  /** Torrent share ratio */
  share_ratio: number
  /** Torrent elapsed time (seconds) */
  time_elapsed: number
  /** Total data downloaded for torrent (bytes) */
  total_downloaded: number
  /** Total data downloaded this session (bytes) */
  total_downloaded_session: number
  /** Torrent total size (bytes) */
  total_size: number
  /** Total data uploaded for torrent (bytes) */
  total_uploaded: number
  /** Total data uploaded this session (bytes) */
  total_uploaded_session: number
  /** Total data wasted for torrent (bytes) */
  total_wasted: number
  /** Torrent upload limit (bytes/s) */
  up_limit: number
  /** Torrent upload speed (bytes/second) */
  up_speed: number
  /** Torrent average upload speed (bytes/second) */
  up_speed_avg: number
}
