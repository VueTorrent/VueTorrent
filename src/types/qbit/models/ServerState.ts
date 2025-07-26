import type { ConnectionStatus } from '@/constants/qbit'

export default interface ServerState {
  /** All-time downloaded bytes */
  alltime_dl: number
  /** All-time uploaded bytes */
  alltime_ul: number
  /** Average time in queue, in milliseconds */
  average_time_queue: number
  /** Current connection status */
  connection_status: ConnectionStatus
  /** Connected DHT nodes count */
  dht_nodes: number
  /** Bytes downloaded since last start */
  dl_info_data: number
  /** Current download speed */
  dl_info_speed: number
  /** Current download speed limit */
  dl_rate_limit: number
  /** Available disk space on the default save path junction */
  free_space_on_disk: number
  /** Ratio computed from `alltime_dl` and `alltime_ul` */
  global_ratio: string
  /**
   * Last detected IPv4
   * @since 5.1.0
   */
  last_external_address_v4?: string
  /**
   * Last detected IPv6
   * @since 5.1.0
   */
  last_external_address_v6?: string
  /** Count of IO jobs in queue (moving / content renaming) */
  queued_io_jobs: number
  /** Is queueing system enabled */
  queueing: boolean
  /** How many times cache was hit on disk read */
  read_cache_hits: string
  /** TODO */
  read_cache_overload: string
  /** How fast should the UI be refreshed */
  refresh_interval: number
  /** TODO */
  total_buffers_size: number
  /** How much peer connections are opened */
  total_peer_connections: number
  /** TODO */
  total_queued_size: number
  /** Bytes wasted, includes duplicate piece downloads and pieces that don't match hash check */
  total_wasted_session: number
  /** TODO */
  up_info_data: number
  /** TODO */
  up_info_speed: number
  /** Current upload speed limit */
  up_rate_limit: number
  /** Whether alt speed limit modifier is enabled */
  use_alt_speed_limits: boolean
  /** Whether sub-categories should be iterpreted separately */
  use_subcategories: boolean
  /** TODO */
  write_cache_overload: string
}
