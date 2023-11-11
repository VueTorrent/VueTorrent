import { ContentLayout, StopCondition } from '@/constants/qbit/AppPreferences'

export default interface AddTorrentPayload {
  addToTopOfQueue?: boolean
  /** Whether Automatic Torrent Management should be used */
  autoTMM?: boolean
  /** Category for the torrent */
  category?: string
  contentLayout?: ContentLayout
  /** Cookie sent to download the .torrent file */
  cookie?: string
  /** Set torrent download speed limit. Unit in bytes/second */
  dlLimit?: number
  downloadPath?: string
  /** Prioritize download first last piece. Possible values are true, false (default) */
  firstLastPiecePrio?: boolean
  inactiveSeedingTimeLimit?: number
  /** Add torrents in the paused state. Possible values are true, false (default) */
  paused?: boolean
  /** Set torrent share ratio limit */
  ratioLimit?: number
  /** Rename torrent */
  rename?: string
  /** Download folder */
  savepath?: string
  /** Set torrent seeding time limit. Unit in minutes */
  seedingTimeLimit?: number
  /** Enable sequential download. Possible values are true, false (default) */
  sequentialDownload?: boolean
  /** Skip hash checking. Possible values are true, false (default) */
  skip_checking?: boolean
  stopCondition?: StopCondition
  /** Tags for the torrent, split by ',' */
  tags?: string
  /** Set torrent upload speed limit. Unit in bytes/second */
  upLimit?: number
  /** URLs separated with newlines */
  urls?: string
  useDownloadPath?: boolean
}
