import type { TrackerStatus } from '@/constants/qbit'

export default interface TrackerEndpoint {
  bt_version: number
  min_announce: number
  name: string
  next_announce: number
  /** Tracker message (there is no way of knowing what this message is - it's up to tracker admins) */
  msg: string
  /** Number of completed downlods for current torrent, as reported by the tracker */
  num_downloaded: number
  /** Number of leeches for current torrent, as reported by the tracker */
  num_leeches: number
  /** Number of peers for current torrent, as reported by the tracker */
  num_peers: number
  /** Number of seeds for current torrent, as reported by the tracker */
  num_seeds: number
  /** Tracker status. See the table below for possible values */
  status: TrackerStatus
  /** Indicates if the tracker is currently updating */
  updating: boolean
}
