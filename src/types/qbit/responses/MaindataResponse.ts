import type { Category, Torrent, ServerState } from '@/types/qbit/models'

export default interface MaindataResponse {
  // Response ID
  rid: number
  // Whether the response contains all the data or partial data
  fullUpdate?: boolean
  torrents?: Record<string, Torrent>
  torrents_removed?: string[]
  categories?: Record<string, Category>
  categories_removed?: Category[]
  tags?: string[]
  tags_removed?: string[]
  trackers?: Record<string, string[]>
  server_state?: Partial<ServerState>
}
