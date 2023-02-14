import type Feed from './rss/Feed'
import type FeedRule from './rss/FeedRule'
import type Category from '../qbit/models/Category'
import type Torrent from '@/models/Torrent'
import type SortOptions from './SortOptions'
import type { AppPreferences } from '../qbit/models'
import type { Optional } from '@/global'
import type ModalTemplate from './ModalTemplate'
import type { Status } from '@/models'
import type WebUISettings from '@/types/vuetorrent/WebUISettings'
import type { SearchPlugin } from '@/types/qbit/models'

export default interface StoreState {
  authenticated: boolean
  categories: Category[]
  dashboard: {
    currentPage: number
    searchFilter: string
  }
  download_data: number[]
  filteredTorrentsCount: number
  intervals: NodeJS.Timer[]
  latestSelectedTorrent: number
  modals: ModalTemplate[]
  rid?: number
  rss: {
    feeds: Feed[]
    rules: FeedRule[]
  }
  searchPlugins: SearchPlugin[]
  selectMode: boolean
  selected_torrents: string[]
  settings: Optional<AppPreferences>
  sort_options: SortOptions
  status: Status
  tags: string[]
  torrents: Torrent[]
  trackers: string[]
  upload_data: number[]
  version: string
  webuiSettings: WebUISettings
}
