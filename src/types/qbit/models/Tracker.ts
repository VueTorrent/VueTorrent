import type { TrackerStatus } from '@/enums/qbit'

export default interface Tracker {
  /** Tracker message (there is no way of knowing what this message is - it's up to tracker admins) */
  msg: string
  /** Number of completed downlods for current torrent, as reported by the tracker */
  num_downloaded: number
  /** Number of leeches for current torrent, as reported by the tracker */
  num_leeches: number
  /** Number of peers for current torrent, as reported by the tracker */
  num_peers: number
  /** Number of seeds for current torrent, asreported by the tracker */
  num_seeds: number
  /** Tracker status. See the table below for possible values */
  status: TrackerStatus
  /** Tracker priority tier. Lower tier trackers are tried before higher tiers. Tier numbers are valid when >= 0, < 0 is used as placeholder when tier does not exist for special entries (such as DHT). */
  tier: number
  /** Tracker url */
  url: string
}
