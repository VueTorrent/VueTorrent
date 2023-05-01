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
    name: data.name,
    hash: faker.datatype.uuid(),
    size: faker.datatype.number({ min: 1000000, max: 50000000000 }),
    tags: [],
    upspeed: faker.datatype.number({ min: 0, max: 5000000 }),
    dlspeed: faker.datatype.number({ min: 0, max: 5000000 }),
    progress: faker.datatype.number({ min: 0, max: 1, precision: 0.01 }),
    state: faker.helpers.arrayElement(Object.values(TorrentState)),
    eta: faker.datatype.number({ min: 1000, max: 900000 }),
    availability: faker.datatype.number({ min: 0, max: 1, precision: 0.01 }),
    added_on: faker.date.recent().getTime(),
    ratio: faker.datatype.number({ min: 0, max: 1, precision: 0.01 }),
    num_leechs: faker.datatype.number({ min: 1, max: 20 }),
    num_complete: faker.datatype.number({ min: 1, max: 500 }),
    num_seeds: faker.datatype.number({ min: 1, max: 25 }),
    num_incomplete: faker.datatype.number({ min: 1, max: 500 }),
    save_path: faker.system.filePath(),
    category: faker.helpers.arrayElement(['ISO', 'Other', 'Movie', 'Music', 'TV'])
  })
}
