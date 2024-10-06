import { FilterState } from '@/constants/qbit'
import { QbitTorrent } from '@/types/qbit/models'

export default interface GetTorrentPayload {
  filter?: FilterState
  category?: string
  tag?: string
  hashes?: string
  /** @since 5.X */
  private?: boolean
  sort?: keyof QbitTorrent
  reverse?: boolean
  limit?: number
  offset?: number
}
