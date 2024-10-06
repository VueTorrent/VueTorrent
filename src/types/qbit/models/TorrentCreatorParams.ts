// TODO

export type TorrentFormat = 'v1' | 'v2' | 'hybrid'

export default interface TorrentCreatorParams {
  /**
   * TODO: Whether created torrent should be private
   * default = false
   */
  private?: boolean
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
  /**
   * TODO: Padded file size limit
   * Needs libtorrent1
   * default: -1
   */
  paddedFileSizeLimit?: number
  /**
   * TODO: Torrent piece size
   * default: 0
   */
  pieceSize?: number
  /**
   * TODO: Source path containing files to include in torrent
   */
  sourcePath: string
  /**
   * TODO: Output torrent path
   */
  torrentFilePath?: string
  /** TODO: Torrent comment */
  comment?: string
  /** TODO: Parsed from comment ??? */
  source?: string
  /** TODO: trackers list, separated by a pipe (|) */
  trackers?: string
  /** TODO: URL seeds list, separated by a pipe (|) */
  urlSeeds?: string

  /**
   * TODO: Whether to start seeding after torrent creation
   * default: if torrentFilePath is empty
   */
  startSeeding?: boolean
}
