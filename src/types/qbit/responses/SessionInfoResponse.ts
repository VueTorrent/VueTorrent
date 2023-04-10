import type { ConnectionStatus } from '@/enums/qbit'

export interface SessionInfoResponse {
  connection_status: ConnectionStatus
  dht_nodes: number
  dl_info_data: number
  dl_info_speed: number
  dl_rate_limit: number
  up_info_data: number
  up_info_speed: number
  up_rate_limit: number
}
