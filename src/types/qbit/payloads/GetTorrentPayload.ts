import { FilterState } from '@/constants/qbit'
import { Torrent } from '@/types/qbit/models'

export default interface GetTorrentPayload {
  filter?: FilterState
  category?: string
  tag?: string
  sort?: keyof Torrent
  reverse?: boolean
  limit?: number
  offset?: number
  hashes?: string
}
