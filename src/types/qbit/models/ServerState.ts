import type { ConnectionStatus } from '@/constants/qbit'

export default interface ServerState {
  alltime_dl: number
  alltime_ul: number
  average_time_queue: number
  connection_status: ConnectionStatus
  dht_nodes: number
  dl_info_data: number
  dl_info_speed: number
  dl_rate_limit: number
  free_space_on_disk: number
  global_ratio: string
  last_external_address_v4: string
  queued_io_jobs: number
  queueing: boolean
  read_cache_hits: string
  read_cache_overload: string
  refresh_interval: number
  total_buffers_size: number
  total_peer_connections: number
  total_queued_size: number
  total_wasted_session: number
  up_info_data: number
  up_info_speed: number
  up_rate_limit: number
  use_alt_speed_limits: boolean
  use_subcategories: boolean
  write_cache_overload: string
}
