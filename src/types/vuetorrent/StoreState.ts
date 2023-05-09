import type Feed from './rss/Feed'
import type FeedRule from './rss/FeedRule'
import type Category from '../qbit/models/Category'
import type Torrent from '@/models/Torrent'
import type SortOptions from './SortOptions'
import type { AppPreferences } from '../qbit/models'
import type ModalTemplate from './ModalTemplate'
import type { Status } from '@/models'
import type WebUISettings from '@/types/vuetorrent/WebUISettings'
import type { SearchPlugin } from '@/types/qbit/models'

export interface PersistentStoreState {
  authenticated: boolean
  sort_options: SortOptions
  webuiSettings: WebUISettings
}

export default interface StoreState extends PersistentStoreState {
  categories: Category[]
  dashboard: {
    currentPage: number
    searchFilter: string
  }
  download_data: number[]
  filteredTorrentsCount: number
  intervals: NodeJS.Timer[]
  isUpdatingMainData: boolean
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
  settings: AppPreferences
  status: Status
  tags: string[]
  torrents: Torrent[]
  trackers: string[]
  upload_data: number[]
  version: string
}
