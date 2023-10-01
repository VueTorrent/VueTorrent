import type { BasePayload } from '.'

export default interface AddTorrentPayload extends BasePayload {
  /** Whether Automatic Torrent Management should be used */
  autoTMM?: boolean
  /** Category for the torrent */
  category?: string
  /** Cookie sent to download the .torrent file */
  cookie?: string
  /** Set torrent download speed limit. Unit in bytes/second */
  dlLimit?: number
  /** Prioritize download first last piece. Possible values are true, false (default) */
  firstLastPiecePrio?: boolean
  /** Add torrents in the paused state. Possible values are true, false (default) */
  paused?: boolean
  /** Set torrent share ratio limit */
  ratioLimit?: number
  /** Rename torrent */
  rename?: string
  /** Create the root folder. Possible values are true, false, unset (default) */
  root_folder?: boolean
  /** Download folder */
  savepath?: string
  /** Set torrent seeding time limit. Unit in minutes */
  seedingTimeLimit?: number
  /** Enable sequential download. Possible values are true, false (default) */
  sequentialDownload?: boolean
  /** Skip hash checking. Possible values are true, false (default) */
  skip_checking?: boolean
  /** Tags for the torrent, split by ',' */
  tags?: string
  /** Set torrent upload speed limit. Unit in bytes/second */
  upLimit?: number
  /** URLs separated with newlines */
  urls?: string
}
