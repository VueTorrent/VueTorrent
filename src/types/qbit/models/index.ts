import type AddTorrentParams from './AddTorrentParams'
import { getEmptyParams } from './AddTorrentParams'
import type AppPreferences from './AppPreferences'
import type BuildInfo from './BuildInfo'
import type Category from './Category'
import type Cookie from './Cookie'
import type Feed from './Feed'
import type FeedArticle from './FeedArticle'
import type { FeedRule, LegacyFeedRule } from './FeedRule'
import type Log from './Log'
import type Peer from './Peer'
import type SearchJob from './SearchJob'
import type SearchPlugin from './SearchPlugin'
import type SearchResult from './SearchResult'
import type SearchStatus from './SearchStatus'
import type ServerState from './ServerState'
import type SSLParameters from './SSLParameters'
import type { Torrent as QbitTorrent, RawTorrent as RawQbitTorrent } from './Torrent'
import type TorrentCreatorParams from './TorrentCreatorParams'
import type TorrentCreatorTask from './TorrentCreatorTask'
import type TorrentFile from './TorrentFile'
import type TorrentProperties from './TorrentProperties'
import type Tracker from './Tracker'

type ApplicationVersion = string

export { getEmptyParams }

export type {
  AddTorrentParams,
  ApplicationVersion,
  AppPreferences,
  BuildInfo,
  Category,
  Cookie,
  ServerState,
  Tracker,
  RawQbitTorrent,
  QbitTorrent,
  SSLParameters,
  Peer,
  TorrentCreatorParams,
  TorrentCreatorTask,
  TorrentFile,
  TorrentProperties,
  FeedRule,
  LegacyFeedRule,
  FeedArticle,
  Feed,
  SearchPlugin,
  SearchJob,
  SearchStatus,
  SearchResult,
  Log
}
