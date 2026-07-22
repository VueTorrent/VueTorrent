import { stateQbitToVt } from '@/constants/vuetorrent'
import { basename, getDomainBody } from '@/helpers'
import { QbitTorrent, RawQbitTorrent } from '@/types/qbit/models'
import { ShareLimitAction, ShareLimitActionString, Torrent } from '@/types/vuetorrent'

export function useTorrentBuilder() {
  function mapShareLimitAction(action: ShareLimitAction | number | ShareLimitActionString | null | undefined): ShareLimitAction {
    if (typeof action === 'number') return action
    if (typeof action === 'string') {
      // map qBittorrent >= 5.2 string values to enum
      switch (action) {
        case 'Default':
          return ShareLimitAction.DEFAULT
        case 'Stop':
          return ShareLimitAction.STOP_TORRENT
        case 'Remove':
          return ShareLimitAction.REMOVE_TORRENT
        case 'RemoveWithContent':
          return ShareLimitAction.REMOVE_TORRENT_AND_FILES
        case 'EnableSuperSeeding':
          return ShareLimitAction.ENABLE_SUPERSEEDING
        default:
          return ShareLimitAction.DEFAULT
      }
    }

    return ShareLimitAction.DEFAULT
  }

  function refreshDerivedFields(torrent: Torrent) {
    const downloadDuration = torrent.time_active - torrent.seeding_time
    torrent.avgDownloadSpeed = torrent.downloaded / (downloadDuration === 0 ? -1 : downloadDuration)
    torrent.avgUploadSpeed = torrent.uploaded / (torrent.time_active === 0 ? -1 : torrent.time_active)
    torrent.basename_content_path = basename(torrent.content_path)
    torrent.basename_download_path = basename(torrent.download_path)
    torrent.basename_save_path = basename(torrent.savePath)
    torrent.globalSpeed = torrent.dlspeed + torrent.upspeed
    torrent.globalVolume = torrent.downloaded + torrent.uploaded
    torrent.trackerDomain = getDomainBody(torrent.tracker)
    torrent.truncated_hash = torrent.hash.slice(0, 8)
  }

  function applyTorrentData(torrent: Torrent, data: QbitTorrent | Partial<RawQbitTorrent>, fullUpdate: boolean): Torrent {
    function has<K extends keyof RawQbitTorrent>(key: K) {
      return fullUpdate || Object.prototype.hasOwnProperty.call(data, key)
    }

    if (has('added_on')) torrent.added_on = data.added_on!
    if (has('amount_left')) torrent.amount_left = data.amount_left!
    if (has('auto_tmm')) torrent.auto_tmm = data.auto_tmm!
    if (has('availability')) torrent.availability = Math.floor(data.availability! * 100) / 100
    if (has('category')) torrent.category = data.category!
    if (has('comment')) torrent.comment = data.comment!
    if (has('completion_on')) torrent.completed_on = data.completion_on!
    if (has('content_path')) torrent.content_path = data.content_path!
    if (has('dl_limit')) torrent.dl_limit = data.dl_limit!
    if (has('download_path')) torrent.download_path = data.download_path!
    if (has('downloaded')) torrent.downloaded = data.downloaded!
    if (has('downloaded_session')) torrent.downloaded_session = data.downloaded_session!
    if (has('eta')) torrent.eta = data.eta!
    if (has('f_l_piece_prio')) torrent.f_l_piece_prio = data.f_l_piece_prio!
    if (has('force_start')) torrent.forced = data.force_start!
    if (fullUpdate || has('has_metadata')) torrent.hasMetadata = data.has_metadata!
    if (has('inactive_seeding_time_limit')) torrent.inactive_seeding_time_limit = data.inactive_seeding_time_limit!
    if (has('infohash_v1')) torrent.infohash_v1 = data.infohash_v1!
    if (has('infohash_v2')) torrent.infohash_v2 = data.infohash_v2!
    if (has('last_activity')) torrent.last_activity = data.last_activity!
    if (has('magnet_uri')) torrent.magnet = data.magnet_uri!
    if (has('name')) torrent.name = data.name!
    if (has('num_leechs')) torrent.num_leechs = data.num_leechs!
    if (has('num_seeds')) torrent.num_seeds = data.num_seeds!
    if (has('num_incomplete')) torrent.available_peers = data.num_incomplete!
    if (has('num_complete')) torrent.available_seeds = data.num_complete!
    if (has('popularity')) torrent.popularity = data.popularity
    if (has('priority')) torrent.priority = data.priority!
    if (has('private')) torrent.private = data.private
    if (has('progress')) torrent.progress = data.progress!
    if (has('ratio')) torrent.ratio = Math.round(data.ratio! * 100) / 100
    if (has('ratio_limit')) torrent.ratio_limit = data.ratio_limit!
    if (has('share_limit_action')) torrent.share_limit_action = mapShareLimitAction(data.share_limit_action)
    if (has('reannounce')) torrent.reannounce = data.reannounce!
    if (has('root_path')) torrent.rootPath = data.root_path!
    if (has('save_path')) torrent.savePath = data.save_path!
    if (has('seeding_time')) torrent.seeding_time = data.seeding_time!
    if (has('seeding_time_limit')) torrent.seeding_time_limit = data.seeding_time_limit!
    if (has('seen_complete')) torrent.seen_complete = data.seen_complete!
    if (has('seq_dl')) torrent.seq_dl = data.seq_dl!
    if (has('size')) torrent.size = data.size!
    if (has('state')) torrent.state = stateQbitToVt(data.state!)
    if (has('super_seeding')) torrent.super_seeding = data.super_seeding!
    if (has('tags'))
      torrent.tags = data
        .tags!.split(', ')
        .map(t => t.trim())
        .filter(t => t.length)
    if (has('time_active')) torrent.time_active = data.time_active!
    if (has('total_size')) torrent.total_size = data.total_size!
    if (has('tracker')) torrent.tracker = data.tracker!
    if (has('trackers_count')) torrent.trackers_count = data.trackers_count!
    if (has('up_limit')) torrent.up_limit = data.up_limit!
    if (has('uploaded')) torrent.uploaded = data.uploaded!
    if (has('uploaded_session')) torrent.uploaded_session = data.uploaded_session!
    if (has('upspeed')) torrent.upspeed = data.upspeed!

    refreshDerivedFields(torrent)
    return torrent
  }

  function createTorrent(data: QbitTorrent): Torrent {
    return applyTorrentData({ hash: data.hash } as Torrent, data, true)
  }

  function buildFromFullUpdate(entries: [string, RawQbitTorrent][]): Map<string, Torrent> {
    const torrents = new Map<string, Torrent>()
    for (const [hash, data] of entries) {
      torrents.set(hash, createTorrent({ ...data, hash }))
    }
    return torrents
  }

  function buildFromPartialUpdate(current: Torrent, data: Partial<RawQbitTorrent>): Torrent {
    return applyTorrentData(current, data, false)
  }

  return { buildFromFullUpdate, buildFromPartialUpdate }
}
