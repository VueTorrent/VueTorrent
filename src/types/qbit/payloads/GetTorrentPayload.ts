import { FilterState } from '@/constants/qbit'
import { SortOptions } from '@/constants/qbit/SortOptions'

export default interface GetTorrentPayload {
  filter?: FilterState
  category?: string
  tag?: string
  sort: SortOptions
  reverse?: boolean
  limit?: number
  offset?: number
  hashes?: string
}