import { faker } from '@faker-js/faker'
import Torrent from '../../models/Torrent'
import type { Torrent as QbitTorrent } from '@/types/qbit/models'
import { TorrentState } from '@/enums/qbit'

export function generateMultiple(count: number = 1): Torrent[] {
  const torrents: Torrent[] = []
  for (let i = 0; i < count; i++) {
    torrents.push(
      generateTorrent({
        name: 'Torrent - ' + i
      })
    )
  }
  return torrents
}

export function generateTorrent(data: Partial<QbitTorrent>): Torrent {
  return new Torrent({
    added_on: data.added_on ?? faker.date.recent().getTime(),
    amount_left: data.amount_left ?? faker.datatype.number(),
    auto_tmm: data.auto_tmm ?? faker.datatype.boolean(),
    availability: data.availability ?? faker.datatype.number(),
    category: data.category ?? faker.random.word(),
    completed: data.completed ?? faker.datatype.number(),
    completion_on: data.completion_on ?? faker.date.recent().getTime(),
    content_path: data.content_path ?? faker.system.filePath(),
    dl_limit: data.dl_limit ?? faker.datatype.number(),
    dlspeed: data.dlspeed ?? faker.datatype.number(),
    download_path: data.download_path ?? faker.system.filePath(),
    downloaded: data.downloaded ?? faker.datatype.number(),
    downloaded_session: data.downloaded_session ?? faker.datatype.number(),
    eta: data.eta ?? faker.datatype.number(),
    f_l_piece_prio: data.f_l_piece_prio ?? faker.datatype.boolean(),
    force_start: data.force_start ?? faker.datatype.boolean(),
    hash: data.hash ?? faker.datatype.uuid(),
    infohash_v1: data.infohash_v1 ?? faker.datatype.uuid(),
    infohash_v2: data.infohash_v2 ?? faker.datatype.uuid(),
    last_activity: data.last_activity ?? faker.date.recent().getTime(),
    magnet_uri: data.magnet_uri ?? faker.internet.url(),
    max_ratio: data.max_ratio ?? faker.datatype.number(),
    max_seeding_time: data.max_seeding_time ?? faker.datatype.number(),
    name: data.name ?? faker.random.word(),
    num_complete: data.num_complete ?? faker.datatype.number(),
    num_incomplete: data.num_incomplete ?? faker.datatype.number(),
    num_leechs: data.num_leechs ?? faker.datatype.number(),
    num_seeds: data.num_seeds ?? faker.datatype.number(),
    priority: data.priority ?? faker.datatype.number(),
    progress: data.progress ?? faker.datatype.number(),
    ratio: data.ratio ?? faker.datatype.number(),
    ratio_limit: data.ratio_limit ?? faker.datatype.number(),
    save_path: data.save_path ?? faker.system.filePath(),
    seeding_time: data.seeding_time ?? faker.datatype.number(),
    seeding_time_limit: data.seeding_time_limit ?? faker.datatype.number(),
    seen_complete: data.seen_complete ?? faker.datatype.number(),
    seq_dl: data.seq_dl ?? faker.datatype.boolean(),
    size: data.size ?? faker.datatype.number(),
    state: data.state ?? TorrentState.DOWNLOADING,
    super_seeding: data.super_seeding ?? faker.datatype.boolean(),
    tags: data.tags ?? faker.random.words(),
    time_active: data.time_active ?? faker.datatype.number(),
    total_size: data.total_size ?? faker.datatype.number(),
    tracker: data.tracker ?? faker.internet.url(),
    trackers_count: data.trackers_count ?? faker.datatype.number(),
    up_limit: data.up_limit ?? faker.datatype.number(),
    uploaded: data.uploaded ?? faker.datatype.number(),
    uploaded_session: data.uploaded_session ?? faker.datatype.number(),
    upspeed: data.upspeed ?? faker.datatype.number()
  })
}
