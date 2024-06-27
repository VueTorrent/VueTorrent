import { FilterState } from '@/constants/qbit'
import { QbitTorrent } from '@/types/qbit/models'

export default interface GetTorrentPayload {
  filter?: FilterState
  category?: string
  tag?: string
  sort?: keyof QbitTorrent
  reverse?: boolean
  limit?: number
  offset?: number
  hashes?: string
}
