import type { Peer } from '@/types/qbit/models'

export default interface TorrentPeersResponse {
  full_update?: boolean
  rid: number
  peers: Record<string, Peer>
  show_flags: boolean
}
