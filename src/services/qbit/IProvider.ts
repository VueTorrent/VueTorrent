import { FilePriority, LogType, PieceState } from '@/constants/qbit'
import {
  ApplicationVersion,
  AppPreferences,
  Category,
  Feed,
  FeedRule,
  Log,
  SearchJob,
  SearchPlugin,
  SearchStatus,
  Torrent,
  TorrentFile,
  TorrentProperties,
  Tracker
} from '@/types/qbit/models'
import { NetworkInterface } from '@/types/qbit/models/AppPreferences'
import { AddTorrentPayload, AppPreferencesPayload, CreateFeedPayload, GetTorrentPayload, LoginPayload } from '@/types/qbit/payloads'
import { MaindataResponse, SearchResultsResponse, TorrentPeersResponse } from '@/types/qbit/responses'

export default interface IProvider {
  /// AppController ///

  /**
   * Get the application version
   */
  getVersion(): Promise<ApplicationVersion>

  /**
   * Get the application settings
   */
  getPreferences(): Promise<AppPreferences>

  /**
   * Set the application settings
   * @param params Values to update
   */
  setPreferences(params: AppPreferencesPayload): Promise<void>

  /**
   * Shutdown the application
   */
  shutdownApp(): Promise<boolean>

  /**
   * Get the network interfaces
   */
  getNetworkInterfaces(): Promise<NetworkInterface[]>

  /**
   * Get the network addresses
   * @param iface Network interface name
   */
  getAddresses(iface: string): Promise<string[]>

  /// AuthController ///

  /**
   * Login to the application
   */
  login(params: LoginPayload): Promise<string>

  /**
   * Logout from the application
   */
  logout(): Promise<void>

  /**
   * Get whether the user is authenticated
   */
  getAuthenticationStatus(): Promise<boolean>

  /// LogController ///

  /**
   * Get the application log
   * @param afterId Log ID to start from, defaults to all
   * @param logsToInclude Log types to include, defaults to all
   */
  getLogs(afterId?: number, logsToInclude?: LogType): Promise<Log[]>

  /// RssController ///

  /**
   * Create a new RSS feed
   * @param payload Feed creation payload
   */
  createFeed(payload: CreateFeedPayload): Promise<void>

  /**
   * Set a feed rule, either a creation or an update
   * @param ruleName Rule name
   * @param ruleDef Rule definition
   */
  setRule(ruleName: string, ruleDef: FeedRule): Promise<void>

  /**
   * Get the RSS feeds
   * @param withData Whether to include the articles in the response
   */
  getFeeds(withData: boolean): Promise<Feed[]>

  /**
   * Get the RSS feed rules
   */
  getRules(): Promise<FeedRule[]>

  /**
   * Rename a feed
   * @param oldName Old feed name
   * @param newName New feed name
   */
  renameFeed(oldName: string, newName: string): Promise<void>

  /**
   * Change a feed's URL
   * @param path Feed name
   * @param url New feed URL
   * @version 4.6.0+
   */
  setFeedUrl(path: string, url: string): Promise<void>

  /**
   * Rename a rule
   * @param ruleName Old rule name
   * @param newRuleName New rule name
   */
  renameRule(ruleName: string, newRuleName: string): Promise<void>

  /**
   * Delete a rule
   * @param ruleName Rule name
   */
  deleteRule(ruleName: string): Promise<void>

  /**
   * Delete a feed
   * @param name Feed name
   */
  deleteFeed(name: string): Promise<void>

  /**
   * Mark an article as read
   * @param itemPath Feed path
   * @param articleId Article ID
   */
  markAsRead(itemPath: string, articleId?: string): Promise<void>

  /**
   * Refresh a feed
   * @param itemPath Feed path
   */
  refreshFeed(itemPath: string): Promise<void>

  /**
   * Get the articles matching a rule
   * @param ruleName Rule name
   */
  getMatchingArticles(ruleName: string): Promise<Record<string, string[]>>

  /// SearchController ///

  /**
   * Run a new search
   * @param pattern Search pattern
   * @param category Category to search in
   * @param plugins Plugins to use
   */
  startSearch(pattern: string, category: string, plugins: string[]): Promise<SearchJob>

  /**
   * Stop a running search
   * @param id Search job ID
   */
  stopSearch(id: number): Promise<boolean>

  /**
   * Get the search status
   * @param id Search job ID
   */
  getSearchStatus(id?: number): Promise<SearchStatus[]>

  /**
   * Get the search results
   * @param id Search job ID
   * @param offset Offset to start from
   * @param limit Limit the number of results
   */
  getSearchResults(id: number, offset?: number, limit?: number): Promise<SearchResultsResponse>

  /**
   * Delete a search engine
   * @param id Search job ID
   */
  deleteSearchPlugin(id: number): Promise<boolean>

  /**
   * Get all the search plugins
   */
  getSearchPlugins(): Promise<SearchPlugin[]>

  /**
   * Install a search plugin
   * @param sources Plugin sources
   */
  installSearchPlugin(sources: string[]): Promise<boolean>

  /**
   * Uninstall a search plugin
   * @param names Plugin names
   */
  uninstallSearchPlugin(names: string[]): Promise<void>

  /**
   * Enable/disable a search plugin
   * @param names Plugin names
   * @param enable Enable/disable
   */
  enableSearchPlugin(names: string[], enable: boolean): Promise<void>

  /**
   * Update all the search plugins from source
   */
  updateSearchPlugins(): Promise<void>

  /// SyncController ///

  /**
   * Get the main data
   * @param rid Request ID
   */
  getMaindata(rid?: number): Promise<MaindataResponse>

  /**
   * Get the torrent peers
   * @param hash Torrent hash
   * @param rid Request ID
   */
  syncTorrentPeers(hash: string, rid?: number): Promise<TorrentPeersResponse>

  /// TorrentsController ///

  /**
   * Get torrents
   * @param payload Response modifiers
   */
  getTorrents(payload?: GetTorrentPayload): Promise<Torrent[]>

  /**
   * Get the torrent trackers
   * @param hash Torrent hash
   */
  getTorrentTrackers(hash: string): Promise<Tracker[]>

  /**
   * Rename a torrent
   * @param hash Torrent hash
   * @param name New torrent name
   */
  setTorrentName(hash: string, name: string): Promise<void>

  /**
   * Get the torrent piece states
   * @param hash Torrent hash
   */
  getTorrentPieceStates(hash: string): Promise<PieceState[]>

  /**
   * Get the torrent files
   * @param hash Torrent hash
   * @param indexes File indexes to include
   */
  getTorrentFiles(hash: string, indexes?: number[]): Promise<TorrentFile[]>

  /**
   * Get all the tags
   */
  getAvailableTags(): Promise<string[]>

  /**
   * Get the torrent properties
   * @param hash Torrent hash
   */
  getTorrentProperties(hash: string): Promise<TorrentProperties>

  /**
   * Upload a new torrent to the application
   * @param torrents Torrent files
   * @param urls Torrent URLs
   * @param params Torrent add parameters
   */
  addTorrents(torrents: File[], urls: string, params: AddTorrentPayload): Promise<void>

  /**
   * Set the torrent file priority
   * @param hash Torrent hash
   * @param idList File IDs
   * @param priority File priority to set
   */
  setTorrentFilePriority(hash: string, idList: number[], priority: FilePriority): Promise<void>

  /**
   * Delete torrents
   * @param hashes Torrent hashes
   * @param deleteFiles Whether to delete the files with the torrents
   */
  deleteTorrents(hashes: string[], deleteFiles: boolean): Promise<void>

  /**
   * Pause all torrents
   * @param hashes Torrent hashes
   */
  pauseTorrents(hashes: string[]): Promise<void>

  /**
   * Resume all torrents
   * @param hashes Torrent hashes
   */
  resumeTorrents(hashes: string[]): Promise<void>

  /**
   * Force start torrents
   * @param hashes Torrent hashes
   */
  forceStartTorrents(hashes: string[]): Promise<void>

  /**
   * Toggle sequential download flag
   * @param hashes Torrent hashes
   */
  toggleSequentialDownload(hashes: string[]): Promise<void>

  /**
   * Toggle first/last piece priority flag
   * @param hashes Torrent hashes
   */
  toggleFirstLastPiecePriority(hashes: string[]): Promise<void>

  /**
   * Set super seeding flag
   * @param hashes Torrent hashes
   * @param value Super seeding flag value
   */
  setSuperSeeding(hashes: string[], value: boolean): Promise<void>

  /**
   * Set the automatic torrent management flag
   * @param hashes Torrent hashes
   * @param enable Automatic torrent management flag value
   */
  setAutoTMM(hashes: string[], enable: boolean): Promise<void>

  /**
   * Set the torrent download limit
   * @param hashes Torrent hashes
   * @param limit Download limit
   */
  setDownloadLimit(hashes: string[], limit: number): Promise<void>

  /**
   * Set the torrent upload limit
   * @param hashes Torrent hashes
   * @param limit Upload limit
   */
  setUploadLimit(hashes: string[], limit: number): Promise<void>

  /// TransferController ///

  /**
   * Set the torrent share limits
   * @param hashes Torrent hashes
   * @param ratioLimit Ratio limit
   * @param seedingTimeLimit Seeding time limit
   * @param inactiveSeedingTimeLimit Inactive seeding time limit
   */
  setShareLimit(hashes: string[], ratioLimit: number, seedingTimeLimit: number, inactiveSeedingTimeLimit: number): Promise<void>

  /**
   * Reannounce torrents
   * @param hashes Torrent hashes
   */
  reannounceTorrents(hashes: string[]): Promise<void>

  /**
   * Recheck torrents
   * @param hashes Torrent hashes
   */
  recheckTorrents(hashes: string[]): Promise<void>

  /**
   * Set the torrent download location
   * @param hashes Torrent hashes
   * @param path Download location
   */
  setTorrentDownloadPath(hashes: string[], path: string): Promise<void>

  /**
   * Set the torrent save location
   * @param hashes Torrent hashes
   * @param path Save location
   */
  setTorrentSavePath(hashes: string[], path: string): Promise<void>

  /**
   * Add trackers to torrents
   * @param hash Torrent hash
   * @param trackers Trackers to add
   */
  addTorrentTrackers(hash: string, trackers: string): Promise<void>

  /**
   * Edit a torrent tracker
   * @param hash Torrent hash
   * @param origUrl Original tracker URL
   * @param newUrl New tracker URL
   */
  editTorrentTracker(hash: string, origUrl: string, newUrl: string): Promise<void>

  /**
   * Remove trackers from torrents
   * @param hash Torrent hash
   * @param trackers Trackers to remove
   */
  removeTorrentTrackers(hash: string, trackers: string[]): Promise<void>

  /**
   * Add peers to torrents
   * @param hashes Torrent hashes
   * @param peers Peers to add
   */
  addTorrentPeers(hashes: string[], peers: string[]): Promise<void>

  /**
   * Rename a file
   * @param hash Torrent hash
   * @param oldPath Old file path
   * @param newPath New file path
   */
  renameFile(hash: string, oldPath: string, newPath: string): Promise<void>

  /**
   * Rename a folder
   * @param hash Torrent hash
   * @param oldPath Old folder path
   * @param newPath New folder path
   */
  renameFolder(hash: string, oldPath: string, newPath: string): Promise<void>

  /**
   * Set the torrent priority
   * @param hashes Torrent hashes
   * @param priority Priority to set
   */
  setTorrentPriority(hashes: string[], priority: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio'): Promise<void>

  /**
   * Add tags to torrents
   * @param hashes Torrent hashes
   * @param tags Tags to add
   */
  addTorrentTag(hashes: string[], tags: string[]): Promise<void>

  /**
   * Remove tags to torrents
   * @param hashes Torrent hashes
   * @param tags Tags to remove
   */
  removeTorrentTag(hashes: string[], tags: string[]): Promise<void>

  /**
   * Create a new tag
   * @param tags Tags to create
   */
  createTag(tags: string[]): Promise<void>

  /**
   * Delete a tag
   * @param tags Tags to delete
   */
  deleteTags(tags: string[]): Promise<void>

  /**
   * Get all categories
   */
  getCategories(): Promise<Category[]>

  /**
   * Delete a category
   * @param categories Categories to delete
   */
  deleteCategory(categories: string[]): Promise<void>

  /**
   * Create a new category
   * @param cat Category to create
   */
  createCategory(cat: Category): Promise<void>

  /**
   * Assign torrents to a category
   * @param hashes Torrent hashes
   * @param category Category to assign
   */
  setCategory(hashes: string[], category: string): Promise<void>

  /**
   * Edit a category
   * @param cat Category to edit
   */
  editCategory(cat: Category): Promise<void>

  /**
   * Export torrent as .torrent file
   * @param hash Torrent hash
   */
  exportTorrent(hash: string): Promise<Blob>

  /// TransferController ///

  /**
   * Toggle alternative speed limits mode
   */
  toggleSpeedLimitsMode(): Promise<void>

  /**
   * Get the global download limit
   * @return current global download speed limit in bytes/second; this value will be zero if no limit is applied.
   */
  getGlobalDownloadLimit(): Promise<number>

  /**
   * Get the global upload limit
   * @return current global upload speed limit in bytes/second; this value will be zero if no limit is applied.
   */
  getGlobalUploadLimit(): Promise<number>

  /**
   * Set the global download limit
   * @param limit - The global download speed limit to set in bytes/second
   */
  setGlobalDownloadLimit(limit: number): Promise<void>

  /**
   * Set the global upload limit
   * @param limit - The global upload speed limit to set in bytes/second
   */
  setGlobalUploadLimit(limit: number): Promise<void>

  /**
   * Ban peers
   * @param peers Peers' IPs to ban
   */
  banPeers(peers: string[]): Promise<void>
}
