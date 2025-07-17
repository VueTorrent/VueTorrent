import { TorrentState } from '@/constants/qbit'
import { stateQbitToVt } from '@/constants/vuetorrent'
import { basename, getDomainBody } from '@/helpers'
import { QbitTorrent } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'

export function useTorrentBuilder() {
  function buildFromQbit(data: QbitTorrent): Torrent {
    return {
      added_on: data.added_on,
      amount_left: data.amount_left,
      auto_tmm: data.auto_tmm,
      availability: Math.floor(data.availability * 100) / 100,
      available_peers: data.num_incomplete,
      available_seeds: data.num_complete,
      category: data.category,
      comment: data.comment ?? '',
      completed_on: data.completion_on,
      content_path: data.content_path,
      dl_limit: data.dl_limit,
      dlspeed: data.dlspeed,
      download_path: data.download_path,
      downloaded: data.downloaded,
      downloaded_session: data.downloaded_session,
      eta: data.eta,
      f_l_piece_prio: data.f_l_piece_prio,
      forced: data.force_start,
      hasMetadata: data.has_metadata ?? [TorrentState.META_DL, TorrentState.FORCED_META_DL].includes(data.state),
      hash: data.hash,
      inactive_seeding_time_limit: data.inactive_seeding_time_limit,
      infohash_v1: data.infohash_v1,
      infohash_v2: data.infohash_v2,
      last_activity: data.last_activity,
      magnet: data.magnet_uri,
      name: data.name,
      num_leechs: data.num_leechs,
      num_seeds: data.num_seeds,
      popularity: data.popularity,
      priority: data.priority,
      private: data.private,
      progress: data.progress,
      ratio: Math.round(data.ratio * 100) / 100,
      ratio_limit: data.ratio_limit,
      reannounce: data.reannounce,
      rootPath: data.root_path,
      savePath: data.save_path,
      seeding_time: data.seeding_time,
      seeding_time_limit: data.seeding_time_limit,
      seen_complete: data.seen_complete,
      seq_dl: data.seq_dl,
      size: data.size,
      state: stateQbitToVt(data.state),
      super_seeding: data.super_seeding,
      tags: data.tags.length > 0 ? data.tags.split(', ').map(t => t.trim()) : [],
      time_active: data.time_active,
      total_size: data.total_size,
      tracker: data.tracker,
      trackers_count: data.trackers_count,
      up_limit: data.up_limit,
      uploaded: data.uploaded,
      uploaded_session: data.uploaded_session,
      upspeed: data.upspeed,

      get avgDownloadSpeed() {
        const dlDuration = this.time_active - this.seeding_time
        return this.downloaded / (dlDuration === 0 ? -1 : dlDuration)
      },
      get avgUploadSpeed() {
        const ulDuration = this.time_active
        return this.uploaded / (ulDuration === 0 ? -1 : ulDuration)
      },
      get basename_content_path() {
        return basename(this.content_path)
      },
      get basename_download_path() {
        return basename(this.download_path)
      },
      get basename_save_path() {
        return basename(this.savePath)
      },
      get globalSpeed() {
        return this.dlspeed + this.upspeed
      },
      get globalVolume() {
        return this.downloaded + this.uploaded
      },
      get trackerDomain() {
        return getDomainBody(this.tracker)
      },
      get truncated_hash() {
        return this.hash.slice(0, 8)
      },
    }
  }

  return { buildFromQbit }
}
