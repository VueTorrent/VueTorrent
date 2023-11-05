import { faker } from '@faker-js/faker'
import type Torrent from '@/types/qbit/models/Torrent'
import { TorrentState } from '@/constants/qbit/TorrentState'
import { FilePriority } from '@/constants/qbit/FilePriority'

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

export function generateTorrent(data: Partial<Torrent>): Torrent {
  return {
    /** Time (Unix Epoch) when the torrent was added to the client */
    added_on: faker.date.recent().getTime(),
    /** Amount of data left to download (bytes) */
    amount_left: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Whether this torrent is managed by Automatic Torrent Management */
    auto_tmm: faker.datatype.boolean(),
    /** Percentage of file pieces currently available */
    availability: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Category of the torrent */
    category: faker.helpers.arrayElement(['ISO', 'Other', 'Movie', 'Music', 'TV']),
    /** Amount of transfer data completed (bytes) */
    completed: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Time (Unix Epoch) when the torrent completed */
    completion_on: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Absolute path of torrent content (root path for multifile torrents, absolute file path for singlefile torrents) */
    content_path: faker.system.filePath(),
    /** Torrent download speed limit (bytes/s). -1 if unlimited. */
    dl_limit: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Torrent download speed (bytes/s) */
    dlspeed: faker.number.int({ min: 0, max: 5000000 }),
    /** TODO */
    download_path: faker.system.filePath(),
    /** Amount of data downloaded */
    downloaded: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Amount of data downloaded this session */
    downloaded_session: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Torrent ETA (seconds) */
    eta: faker.number.int({ min: 1000, max: 900000 }),
    /** True if first last piece are prioritized */
    f_l_piece_prio: faker.datatype.boolean(),
    /** True if force start is enabled for this torrent */
    force_start: faker.datatype.boolean(),
    /** Torrent hash */
    hash: faker.string.uuid(),
    inactive_seeding_time_limit: faker.number.int({ min: 0, max: 50 }),
    /** TODO */
    infohash_v1: faker.string.uuid(),
    /** TODO */
    infohash_v2: faker.string.uuid(),
    /** Last time (Unix Epoch) when a chunk was downloaded/uploaded */
    last_activity: faker.number.int({ min: 0, max: 50 }),
    /** Magnet URI corresponding to this torrent */
    magnet_uri: faker.internet.url(),
    max_inactive_seeding_time: faker.number.int({ min: 0, max: 50 }),
    /** Maximum share ratio until torrent is stopped from seeding/uploading */
    max_ratio: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Maximum seeding time (seconds) until torrent is stopped from seeding */
    max_seeding_time: faker.number.int({ min: 0, max: 50 }),
    /** Torrent name */
    name: data.name || faker.animal.dog(),
    /** Number of seeds in the swarm */
    num_complete: faker.number.int({ min: 0, max: 50 }),
    /** Number of leechers in the swarm */
    num_incomplete: faker.number.int({ min: 0, max: 50 }),
    /** Number of leechers connected to */
    num_leechs: faker.number.int({ min: 0, max: 50 }),
    /** Number of seeds connected to */
    num_seeds: faker.number.int({ min: 0, max: 50 }),
    /** Torrent priority. Returns -1 if queuing is disabled or torrent is in seed mode */
    priority: FilePriority.NORMAL,
    /** Torrent progress (percentage/100) */
    progress: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    /** Torrent share ratio. Max ratio value: 9999. */
    ratio: faker.number.float({ min: 0, max: 5, precision: 0.01 }),
    /** TODO */
    ratio_limit: faker.number.float({ min: 0, max: 4, precision: 0.01 }),
    /** Path where this torrent's data is stored */
    save_path: faker.system.filePath(),
    /** Torrent elapsed time while complete (seconds) */
    seeding_time: faker.number.int({ min: 0, max: 50 }),
    /** TODO */
    seeding_time_limit: faker.number.int({ min: 0, max: 50 }),
    /** Time (Unix Epoch) when this torrent was last seen complete */
    seen_complete: faker.number.int({ min: 0, max: 50 }),
    /** True if sequential download is enabled */
    seq_dl: faker.datatype.boolean(),
    /** Total size (bytes) of files selected for download */
    size: faker.number.int({ min: 1000000, max: 50000000000 }),
    /** Torrent state. See table here below for the possible values */
    state: faker.helpers.arrayElement(Object.values(TorrentState)),
    /** True if super seeding is enabled */
    super_seeding: faker.datatype.boolean(),
    /** Comma-concatenated tag list of the torrent */
    tags: '',
    /** Total active time (seconds) */
    time_active: faker.number.int({ min: 1000, max: 900000 }),
    /** Total size (bytes) of all file in this torrent (including unselected ones) */
    total_size: faker.number.int({ min: 1000, max: 900000 }),
    /** The first tracker with working status. Returns empty string if no tracker is working. */
    tracker: faker.animal.cat(),
    /** TODO */
    trackers_count: faker.number.int({ min: 1000, max: 900000 }),
    /** Torrent upload speed limit (bytes/s). -1 if unlimited. */
    up_limit: faker.number.int({ min: 1000, max: 900000 }),
    /** Amount of data uploaded */
    uploaded: faker.number.int({ min: 1000, max: 900000 }),
    /** Amount of data uploaded this session */
    uploaded_session: faker.number.int({ min: 1000, max: 900000 }),
    /** Torrent upload speed (bytes/s) */
    upspeed: faker.number.int({ min: 0, max: 5000000 })
  }
}
