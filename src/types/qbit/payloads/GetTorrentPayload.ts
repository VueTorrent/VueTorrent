import { FilterState } from '@/constants/qbit'
import { QbitTorrent } from '@/types/qbit/models'

export default interface GetTorrentPayload {
  category?: string
  filter?: FilterState
  hashes?: string
  /** @since 5.1.0 */
  includeTrackers?: boolean
  limit?: number
  offset?: number
  /** @since 5.X */
  private?: boolean
  reverse?: boolean
  sort?: keyof QbitTorrent
  tag?: string
}
