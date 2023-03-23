import type Category from './Category'
import type { Feed, FeedArticle, FeedRule } from './rss'
import type SearchStatus from './search/SearchStatus'
import type SearchResult from './search/SearchResult'
import type ModalTemplate from './ModalTemplate'
import type SortOptions from './SortOptions'
import type StoreState from './StoreState'
import type { PersistentStoreState } from './StoreState'
import type { TreeNode, TreeFile, TreeFolder } from './TreeObjects'
import type { TorrentProperty, TorrentPropertyLocalized } from './WebUISettings'
import type Tracker from './Tracker'

export type ComponentRule = (value: string) => boolean | string

export {
  Category,
  Feed,
  FeedRule,
  SearchStatus,
  SearchResult,
  ModalTemplate,
  SortOptions,
  PersistentStoreState,
  StoreState,
  TreeNode,
  TreeFile,
  TreeFolder,
  TorrentProperty,
  TorrentPropertyLocalized,
  Tracker
}
