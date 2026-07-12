import type TrackerEndpoint from './TrackerEndpoint'
import type { TrackerStatus } from '@/constants/qbit'

export default interface Tracker {
  /** Tracker message (there is no way of knowing what this message is - it's up to tracker admins) */
  msg: string
  /** Number of completed downloads for current torrent, as reported by the tracker */
  num_downloaded: number
  /** Number of leeches for current torrent, as reported by the tracker */
  num_leeches: number
  /** Number of peers for current torrent, as reported by the tracker */
  num_peers: number
  /** Number of seeds for current torrent, as reported by the tracker */
  num_seeds: number
  /** Tracker status. See the table below for possible values */
  status: TrackerStatus
  /** Tracker priority tier. Lower tier trackers are tried before higher tiers. Tier numbers are valid when >= 0, < 0 is used as placeholder when tier does not exist for special entries (such as DHT). */
  tier: number
  /** Tracker url */
  url: string

  /**
   * TODO
   * @since 5.X
   */
  endpoints?: TrackerEndpoint[]
  /**
   * TODO
   * @since 5.X
   */
  min_announce?: number
  /**
   * TODO
   * @since 5.X
   */
  next_announce?: number
  /**
   * Indicates if the tracker is currently updating
   * TODO
   * @since 5.X
   */
  updating?: boolean
}
