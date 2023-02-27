import type { Optional } from '@/global'
import type { TorrentState } from '@/enums/vuetorrent'

export default interface SortOptions {
  isCustomSortEnabled: boolean
  sort: string
  reverse: boolean
  filter: Optional<TorrentState>
  category: Optional<string>
  tag: Optional<string>
  tracker: Optional<string>
}
