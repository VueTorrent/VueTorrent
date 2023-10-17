import { formatEta, getDomainBody } from '@/helpers'
import { Torrent } from '@/types/vuetorrent'
import { Torrent as QbitTorrent } from '@/types/qbit/models'
import { useI18n } from 'vue-i18n'

export function useTorrentBuilder() {
  const { t } = useI18n()

  const computedValues = ['globalSpeed', 'globalVolume', 'priority']

  function buildFromQbit(data: QbitTorrent): Torrent {
    const torrent = {
      added_on: data.added_on,
      amount_left: data.amount_left,
      auto_tmm: data.auto_tmm,
      availability: Math.floor(data.availability * 100) / 100,
      available_peers: data.num_incomplete,
      available_seeds: data.num_complete,
      category: data.category,
      completed_on: data.completion_on,
      content_path: data.content_path,
      dl_limit: data.dl_limit,
      dlspeed: data.dlspeed,
      download_path: data.download_path,
      downloaded: data.downloaded,
      downloaded_session: data.downloaded_session,
      eta: formatEta(data.eta),
      f_l_piece_prio: data.f_l_piece_prio,
      forced: data.force_start,
      hash: data.hash,
      infohash_v1: data.infohash_v1,
      infohash_v2: data.infohash_v2,
      last_activity: data.last_activity,
      magnet: data.magnet_uri,
      name: data.name,
      num_leechs: data.num_leechs,
      num_seeds: data.num_seeds,
      priority: data.priority,
      progress: data.progress,
      ratio: Math.round(data.ratio * 100) / 100,
      ratio_limit: data.max_ratio,
      ratio_time_limit: data.max_seeding_time,
      savePath: data.save_path,
      seeding_time: data.seeding_time,
      seen_complete: data.seen_complete,
      seq_dl: data.seq_dl,
      size: data.size,
      state: data.state,
      stateString: t(`torrent.state.${data.state}`),
      super_seeding: data.super_seeding,
      tags: data.tags.length > 0 ? data.tags.split(', ').map(t => t.trim()) : [],
      time_active: data.time_active,
      total_size: data.total_size,
      tracker: data.tracker,
      tracker_domain: getDomainBody(data.tracker),
      trackers_count: data.trackers_count,
      up_limit: data.up_limit,
      uploaded: data.uploaded,
      uploaded_session: data.uploaded_session,
      upspeed: data.upspeed
    }

    return Object.freeze({
      ...torrent,
      globalSpeed: torrent.dlspeed + torrent.upspeed,
      globalVolume: torrent.downloaded + torrent.uploaded
    })
  }

  return { computedValues, buildFromQbit }
}
