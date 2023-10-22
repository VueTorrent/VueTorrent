import { FilePriority, TorrentState } from '@/constants/qbit'
import { formatEta, getDomainBody } from '@/helpers'
import { Torrent as QbitTorrent } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'
import { faker } from '@faker-js/faker'
import { useI18n } from 'vue-i18n'

type StaticTorrent = Omit<Torrent, 'avgDownloadSpeed' | 'avgUploadSpeed' | 'globalSpeed' | 'globalVolume'>

export function useTorrentBuilder() {
  const { t } = useI18n()

  const computedValues = ['avgDownloadSpeed', 'avgUploadSpeed', 'globalSpeed', 'globalVolume', 'priority']

  function buildFromQbit(data: QbitTorrent): Torrent {
    return buildTorrent({
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
      inactive_seeding_time_limit: data.inactive_seeding_time_limit,
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
      ratio_limit: data.ratio_limit,
      savePath: data.save_path,
      seeding_time: data.seeding_time,
      seeding_time_limit: data.seeding_time_limit,
      seen_complete: data.seen_complete,
      seq_dl: data.seq_dl,
      size: data.size,
      state: data.state,
      stateString: t(`torrent.state.${ data.state }`),
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
    })
  }

  function buildFromFaker(data: Partial<Torrent>, index: number): Torrent {
    const state = data.state || faker.helpers.arrayElement(Object.values(TorrentState))
    const tracker = data.tracker || faker.internet.url()

    return buildTorrent({
      added_on: data.added_on || faker.date.recent().getTime(),
      amount_left: data.amount_left || faker.number.float({ min: 0, max: 1, precision: 0.01 }),
      auto_tmm: data.auto_tmm || faker.datatype.boolean(),
      availability: data.availability || faker.number.float({ min: 0, max: 1, precision: 0.01 }),
      available_peers: data.available_peers || faker.number.int({ min: 0, max: 50 }),
      available_seeds: data.available_seeds || faker.number.int({ min: 0, max: 50 }),
      category: data.category || faker.helpers.arrayElement(['ISO', 'Other', 'Movie', 'Music', 'TV']),
      completed_on: data.completion_on || faker.number.float({ min: 0, max: 1, precision: 0.01 }),
      content_path: data.content_path || faker.system.filePath(),
      dl_limit: data.dl_limit || faker.number.float({ min: 0, max: 1, precision: 0.01 }),
      dlspeed: data.dlspeed || faker.number.int({ min: 0, max: 5000000 }),
      download_path: data.download_path || faker.system.filePath(),
      downloaded: data.downloaded || faker.number.float({ min: 0, max: 1, precision: 0.01 }),
      downloaded_session: data.downloaded_session || faker.number.float({ min: 0, max: 1, precision: 0.01 }),
      eta: data.eta || formatEta(faker.number.int({ min: 0, max: 900000 })),
      forced: data.forced || faker.datatype.boolean(),
      force_start: data.force_start || faker.datatype.boolean(),
      hash: data.hash || faker.string.uuid(),
      infohash_v1: data.infohash_v1 || faker.string.uuid(),
      infohash_v2: data.infohash_v2 || faker.string.uuid(),
      last_activity: data.last_activity || faker.number.int({ min: 0, max: 50 }),
      magnet: data.magnet_uri || faker.internet.url(),
      name: data.name || `Torrent ${ index + 1 }`,
      num_leechs: data.num_leechs || faker.number.int({ min: 0, max: 50 }),
      num_seeds: data.num_seeds || faker.number.int({ min: 0, max: 50 }),
      priority: data.priority || FilePriority.NORMAL,
      progress: data.progress || faker.number.float({ min: 0, max: 1, precision: 0.01 }),
      ratio: data.ratio || faker.number.float({ min: 0, max: 5, precision: 0.01 }),
      ratio_limit: data.ratio_limit || faker.number.float({ min: 0, max: 4, precision: 0.01 }),
      ratio_time_limit: data.ratio_time_limit || faker.number.float({ min: 0, max: 4, precision: 0.01 }),
      savePath: data.savePath || faker.system.filePath(),
      seeding_time: data.seeding_time || faker.number.int({ min: 0, max: 50 }),
      seen_complete: data.seen_complete || faker.number.int({ min: 0, max: 50 }),
      seq_dl: data.seq_dl || faker.datatype.boolean(),
      size: data.size || faker.number.int({ min: 1000000, max: 50000000000 }),
      state,
      stateString: t(`torrent.state.${ state }`),
      super_seeding: data.super_seeding || faker.datatype.boolean(),
      tags: data.tags || '',
      time_active: data.time_active || faker.number.int({ min: 1000, max: 900000 }),
      total_size: data.total_size || faker.number.int({ min: 1000, max: 900000 }),
      tracker,
      tracker_domain: getDomainBody(tracker),
      trackers_count: data.trackers_count || faker.number.int({ min: 1, max: 50 }),
      up_limit: data.up_limit || faker.number.int({ min: 1000, max: 900000 }),
      uploaded: data.uploaded || faker.number.int({ min: 1000, max: 900000 }),
      uploaded_session: data.uploaded_session || faker.number.int({ min: 1000, max: 900000 }),
      upspeed: data.upspeed || faker.number.int({ min: 0, max: 5000000 })
    })
  }

  function buildTorrent(data: StaticTorrent): Torrent {
    const dlDuration = torrent.time_active - torrent.seeding_time
    const ulDuration = torrent.time_active

    return Object.freeze({
      ...data,
      avgDownloadSpeed: data.downloaded / ((dlDuration == 0) ? -1 : dlDuration),
      avgUploadSpeed: data.uploaded / ((ulDuration == 0) ? -1 : ulDuration),
      globalSpeed: data.dlspeed + data.upspeed,
      globalVolume: data.downloaded + data.uploaded
    })
  }

  return { computedValues, buildFromQbit, buildFromFaker }
}
