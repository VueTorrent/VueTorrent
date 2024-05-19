import type { Peer } from '@/types/qbit/models'

export default interface TorrentPeersResponse {
  full_update?: boolean
  rid: number
  peers?: Record<string, Peer>
  peers_removed?: string[]
  show_flags?: boolean
}
