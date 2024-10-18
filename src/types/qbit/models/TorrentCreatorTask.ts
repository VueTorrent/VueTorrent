import { TorrentCreatorTaskStatus, TorrentFormat } from '@/constants/qbit'

export default interface TorrentCreatorTask {
  /**
   * Torrent comment
   */
  comment?: string
  /** Task error message if failed */
  errorMessage?: string
  /**
   * Torrent format
   * Needs libtorrent2
   * Default = hybrid
   */
  format?: TorrentFormat
  /**
   * Should optimize alignment
   * Needs libtorrent1
   * default: true
   */
  optimizeAlignment?: boolean
  /**
   * Torrent piece size
   * default: 0
   */
  pieceSize?: number
  /**
   * Whether created torrent should be private
   * default = false
   */
  private?: boolean
  /**
   * Task progress
   * only if status === RUNNING
   * Between 0 and 100, as integer
   */
  progress?: number
  /**
   * Source path containing files to include in torrent
   */
  sourcePath: string
  /**
   * Task status
   */
  status: TorrentCreatorTaskStatus
  taskID: string
  // /** Parsed from comment ??? */
  // source?: string
  timeAdded: string
  /**
   * Example: Wed May 20 03:40:13 1998
   */
  timeFinished: string
  /**
   * Example: Wed May 20 03:40:13 1998
   */
  timeStarted: string
  /**
   * Output torrent path
   */
  torrentFilePath?: string
  /**
   * Trackers list
   */
  trackers?: string[]
  /**
   * URL seeds list
   */
  urlSeeds?: string[]
}
