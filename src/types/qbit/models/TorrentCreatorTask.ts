import { TorrentCreatorTaskStatus } from '@/constants/qbit'
import { TorrentFormat } from './TorrentCreatorParams'

export default interface TorrentCreatorTask {
  taskID: string
  /**
   * TODO: Source path containing files to include in torrent
   */
  sourcePath: string
  /**
   * TODO: Torrent piece size
   * default: 0
   */
  pieceSize?: number
  /**
   * TODO: Whether created torrent should be private
   * default = false
   */
  private?: boolean
  timeAdded: string
  /**
   * TODO: torrent format
   * Needs libtorrent2
   * Default = hybrid
   */
  format?: TorrentFormat
  /**
   * TODO: Should optimize alignment
   * Needs libtorrent1
   * default: true
   */
  optimizeAlignment?: boolean
  status: TorrentCreatorTaskStatus
  /** TODO: Torrent comment */
  comment?: string
  /**
   * TODO: Output torrent path
   */
  torrentFilePath?: string
  /** TODO: Parsed from comment ??? */
  source?: string
  /** TODO: trackers list, separated by a pipe (|) */
  trackers?: string
  /** TODO: URL seeds list, separated by a pipe (|) */
  urlSeeds?: string
  /** TODO: Wed May 20 03:40:13 1998 */
  timeFinished: string
  /** TODO: Wed May 20 03:40:13 1998 */
  timeStarted: string
  /** TODO: Task error message if failed */
  errorMessage?: string
  /** TODO: Task progress, only if status === RUNNING */
  progress?: number
}
