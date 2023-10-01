import type { Category, Torrent, ServerState } from '@/types/qbit/models'
import type { Optional } from '@/global'

export default interface MainDataResponse {
  // Response ID
  rid: number
  // Whether the response contains all the data or partial data
  fullUpdate: Optional<boolean>
  torrents: Optional<Record<string, Torrent>>
  torrents_removed: Optional<string[]>
  categories: Optional<Record<string, Category>>
  categories_removed: Optional<Category[]>
  tags: Optional<string[]>
  tags_removed: Optional<string[]>
  trackers: Optional<Record<string, string[]>>
  server_state?: Optional<ServerState>
}
