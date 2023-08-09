import { FilterState } from '@/constants/qbit'

export default interface GetTorrentPayload {
  filter?: FilterState
  category?: string
  tag?: string
  sort: string
  reverse?: boolean
  limit?: number
  offset?: number
  hashes?: string
}