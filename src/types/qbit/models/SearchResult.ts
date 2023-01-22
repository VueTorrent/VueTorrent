export default interface SearchResult {
  /** URL of the torrent's description page */
  descrLink: string
  /** Name of the file */
  fileName: string
  /** Size of the file in Bytes */
  fileSize: number
  /** Torrent download link (usually either .torrent file or magnet link) */
  fileUrl: string
  /** Number of leechers */
  nbLeechers: number
  /** Number of seeders */
  nbSeeders: number
  /** URL of the torrent site */
  siteUrl: string
}
