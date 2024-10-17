import { TorrentFormat } from '@/constants/qbit'

export default interface TorrentCreatorParams {
  /** Torrent comment */
  comment?: string
  /**
   * Torrent format
   * @version libtorrent2
   * @default HYBRID
   */
  format?: TorrentFormat
  /**
   * Should optimize piece alignment
   * @version libtorrent1
   * @default true
   */
  optimizeAlignment?: boolean
  /**
   * Padded file size limit
   * @version libtorrent1
   * @default -1
   */
  paddedFileSizeLimit?: number
  /**
   * Torrent piece size
   * @default 0 (auto)
   */
  pieceSize?: number
  /**
   * Whether created torrent should be private
   * default = false
   */
  private?: boolean
  // /** Parsed from comment ??? */
  // source?: string
  /**
   * Source path containing files to include in torrent
   */
  sourcePath: string
  /**
   * Whether to start seeding after torrent creation
   * @default if torrentFilePath is empty
   */
  startSeeding?: boolean
  /**
   * Output torrent path
   */
  torrentFilePath?: string
  /**
   * Tracker URLs to add to the torrent
   * separated by a pipe (|)
   */
  trackers?: string
  /**
   * Web seed URLs to add to the torrent
   * separated by a pipe (|)
   */
  urlSeeds?: string
}
