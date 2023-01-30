import type { Tracker as QbitTracker } from '@/types/qbit/models'
import type { Tracker as VtTracker } from '@/types/vuetorrent'
import type { BaseMapper } from '@/types/mappers/index'

export default class TrackerMapper implements BaseMapper<QbitTracker, VtTracker> {
  public toVt(tracker: QbitTracker): VtTracker {
    return {
      isSelectable: tracker.tier >= 0,
      msg: tracker.msg,
      num_downloaded: tracker.num_downloaded,
      num_leeches: tracker.num_leeches,
      num_peers: tracker.num_peers,
      num_seeds: tracker.num_seeds,
      status: tracker.status,
      tier: tracker.tier,
      url: tracker.url
    }
  }

  toQbit(tracker: VtTracker): QbitTracker {
    return {
      msg: tracker.msg,
      num_downloaded: tracker.num_downloaded,
      num_leeches: tracker.num_leeches,
      num_peers: tracker.num_peers,
      num_seeds: tracker.num_seeds,
      status: tracker.status,
      tier: tracker.tier,
      url: tracker.url
    }
  }
}
