import { ContentLayout, StopCondition } from '@/constants/qbit/AppPreferences'

export default interface AddTorrentPayload {
  /** Whether to add the torrent at the top of the queue */
  addToTopOfQueue?: boolean
  /** Whether Automatic Torrent Management should be used */
  autoTMM?: boolean
  /** Category for the torrent */
  category?: string
  /** Content layout used when creating the torrent */
  contentLayout?: ContentLayout
  /** Cookie sent to download the files using HTTP(S) */
  cookie?: string
  /** Set torrent download speed limit. Unit in bytes/second */
  dlLimit?: number
  /**
   * If enabled and set, will use this location to save torrent content when downloading
   * Otherwise, use `savepath` or default save path
   */
  downloadPath?: string
  /** Prioritize download first last piece */
  firstLastPiecePrio?: boolean
  /**
   * Set inactive torrent seeding time limit. Unit in minutes
   * - -1 to disable
   * - -2 to use global value
   */
  inactiveSeedingTimeLimit?: number
  /** Add torrents in the paused state */
  paused?: boolean
  /** Set torrent share ratio limit */
  ratioLimit?: number
  /** Rename torrent */
  rename?: string
  /**
   * Will use this location to save torrent content when download is complete
   * It will also be used when `downloadPath` is disabled or not set
   */
  savepath?: string
  /** Set torrent seeding time limit. Unit in minutes */
  seedingTimeLimit?: number
  /** Enable sequential download */
  sequentialDownload?: boolean
  /** Skip hash checking */
  skip_checking?: boolean
  /** Torrent stop condition */
  stopCondition?: StopCondition
  /** Tags for the torrent, split by ',' */
  tags?: string
  /** Set torrent upload speed limit. Unit in bytes/second */
  upLimit?: number
  /** Whether to enable use of `downloadPath` */
  useDownloadPath?: boolean
}
