import type { Priority } from '@/enums/qbit'

export default interface TorrentFile {
  /** Percentage of file pieces currently available (percentage/100) */
  availability: number
  /** File index */
  index: number
  /** True if file is seeding/complete */
  is_seed: boolean
  /** File name (including relative path) */
  name: string
  /** The first number is the starting piece index and the second number is the ending piece index (inclusive) */
  piece_range: [number, number]
  /** File priority. See possible values here below */
  priority: Priority
  /** File progress (percentage/100) */
  progress: number
  /** File size (bytes) */
  size: number
}
