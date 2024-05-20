import type { FilePriority } from '@/constants/qbit'

export default interface TorrentFile {
  /** Percentage of file pieces currently available (percentage/100) */
  availability: number
  /** File index (starting at 0) */
  index: number
  /** True if torrent is seeding/complete
   * @description This property is only found on the first file of the torrent
   */
  is_seed?: boolean
  /** File name (including relative path) */
  name: string
  /** The first number is the starting piece index and the second number is the ending piece index (inclusive) */
  piece_range: [number, number]
  /** File priority. See possible values here below */
  priority: FilePriority
  /** File progress (percentage/100) */
  progress: number
  /** File size in bytes */
  size: number
}
