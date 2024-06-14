import { FilterState, SortOptions } from '@/constants/qbit'

export default interface GetTorrentPayload {
  filter?: FilterState
  category?: string
  tag?: string
  sort?: SortOptions
  reverse?: boolean
  limit?: number
  offset?: number
  hashes?: string
}
