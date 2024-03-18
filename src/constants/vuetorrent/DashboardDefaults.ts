import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'

type pptData = { active: boolean; order: number }
type pptMetadata =
  | { type: DashboardPropertyType.AMOUNT; props: { title: string; value: string; total: string } }
  | {
  type: DashboardPropertyType.CHIP;
  props: { title: string; value: string; color: string; enableHashColor: boolean }
}
  | { type: DashboardPropertyType.DATA; props: { title: string; value: string } }
  | { type: DashboardPropertyType.DATETIME; props: { title: string; value: string } }
  | { type: DashboardPropertyType.DURATION; props: { title: string; value: string } }
  | { type: DashboardPropertyType.PERCENT; props: { title: string; value: string } }
  | { type: DashboardPropertyType.RELATIVE; props: { title: string; value: string } }
  | { type: DashboardPropertyType.SPEED; props: { title: string; value: string } }
  | { type: DashboardPropertyType.TEXT; props: { title: string; value: string; color?: (v: any) => string } }

export type TorrentProperty = { name: DashboardProperty } & pptData & pptMetadata

export interface PropertyData {
  [key: DashboardProperty | string]: pptData
}

export interface PropertyMetadata {
  [key: DashboardProperty | string]: pptMetadata
}

export const propsData: PropertyData = {
  [DashboardProperty.ADDED_ON]: {
    active: true,
    order: 16
  },
  [DashboardProperty.AMOUNT_LEFT]: {
    active: false,
    order: 20
  },
  [DashboardProperty.AVAILABILITY]: {
    active: true,
    order: 17
  },
  [DashboardProperty.AVG_DOWNLOAD_SPEED]: {
    active: false,
    order: 40
  },
  [DashboardProperty.AVG_UPLOAD_SPEED]: {
    active: false,
    order: 41
  },
  [DashboardProperty.CATEGORY]: {
    active: true,
    order: 14
  },
  [DashboardProperty.COMPLETED_ON]: {
    active: false,
    order: 19
  },
  [DashboardProperty.CONTENT_PATH]: {
    active: false,
    order: 21
  },
  [DashboardProperty.DOWNLOAD_LIMIT]: {
    active: false,
    order: 23
  },
  [DashboardProperty.DOWNLOAD_PATH]: {
    active: false,
    order: 24
  },
  [DashboardProperty.DOWNLOAD_SPEED]: {
    active: true,
    order: 3
  },
  [DashboardProperty.DOWNLOADED]: {
    active: true,
    order: 5
  },
  [DashboardProperty.DOWNLOADED_SESSION]: {
    active: false,
    order: 22
  },
  [DashboardProperty.ETA]: {
    active: true,
    order: 8
  },
  [DashboardProperty.GLOBAL_SPEED]: {
    active: false,
    order: 34
  },
  [DashboardProperty.GLOBAL_VOLUME]: {
    active: false,
    order: 35
  },
  [DashboardProperty.HASH]: {
    active: false,
    order: 25
  },
  [DashboardProperty.INFOHASH_V1]: {
    active: false,
    order: 26
  },
  [DashboardProperty.INFOHASH_V2]: {
    active: false,
    order: 27
  },
  [DashboardProperty.LAST_ACTIVITY]: {
    active: false,
    order: 18
  },
  [DashboardProperty.PEERS]: {
    active: true,
    order: 9
  },
  [DashboardProperty.PRIORITY]: {
    active: false,
    order: 36
  },
  [DashboardProperty.PROGRESS]: {
    active: true,
    order: 2
  },
  [DashboardProperty.RATIO]: {
    active: true,
    order: 12
  },
  [DashboardProperty.RATIO_LIMIT]: {
    active: false,
    order: 37
  },
  [DashboardProperty.RATIO_TIME_LIMIT]: {
    active: false,
    order: 38
  },
  [DashboardProperty.SAVE_PATH]: {
    active: false,
    order: 6
  },
  [DashboardProperty.SEEDING_TIME]: {
    active: false,
    order: 39
  },
  [DashboardProperty.SEEDS]: {
    active: true,
    order: 10
  },
  [DashboardProperty.SEEN_COMPLETE]: {
    active: false,
    order: 28
  },
  [DashboardProperty.SIZE]: {
    active: true,
    order: 1
  },
  [DashboardProperty.STATE]: {
    active: true,
    order: 11
  },
  [DashboardProperty.TAGS]: {
    active: true,
    order: 15
  },
  [DashboardProperty.TIME_ACTIVE]: {
    active: false,
    order: 29
  },
  [DashboardProperty.TOTAL_SIZE]: {
    active: false,
    order: 30
  },
  [DashboardProperty.TRACKER]: {
    active: false,
    order: 13
  },
  [DashboardProperty.TRACKERS_COUNT]: {
    active: false,
    order: 31
  },
  [DashboardProperty.UPLOAD_LIMIT]: {
    active: false,
    order: 33
  },
  [DashboardProperty.UPLOAD_SPEED]: {
    active: true,
    order: 4
  },
  [DashboardProperty.UPLOADED]: {
    active: true,
    order: 7
  },
  [DashboardProperty.UPLOADED_SESSION]: {
    active: false,
    order: 32
  }
}
export const propsMetadata: PropertyMetadata = {
  [DashboardProperty.ADDED_ON]: {
    props: { title: 'added_on', value: 'added_on' },
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.AMOUNT_LEFT]: {
    props: { title: 'amount_left', value: 'amount_left' },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.AVAILABILITY]: {
    props: { title: 'availability', value: 'availability' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.AVG_DOWNLOAD_SPEED]: {
    props: { title: 'avg_download_speed', value: 'avgDownloadSpeed' },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.AVG_UPLOAD_SPEED]: {
    props: { title: 'avg_upload_speed', value: 'avgUploadSpeed' },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.CATEGORY]: {
    props: { title: 'category', value: 'category', color: 'category', enableHashColor: true },
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.COMPLETED_ON]: {
    props: { title: 'completed_on', value: 'completed_on' },
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.CONTENT_PATH]: {
    props: { title: 'content_path', value: 'content_path' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.DOWNLOAD_LIMIT]: {
    props: { title: 'download_limit', value: 'dl_limit' },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.DOWNLOAD_PATH]: {
    props: { title: 'download_path', value: 'download_path' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.DOWNLOAD_SPEED]: {
    props: { title: 'download_speed', value: 'dlspeed' },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.DOWNLOADED]: {
    props: { title: 'downloaded', value: 'downloaded' },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.DOWNLOADED_SESSION]: {
    props: { title: 'downloaded_session', value: 'downloaded_session' },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.ETA]: {
    props: { title: 'eta', value: 'eta' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.GLOBAL_SPEED]: {
    props: { title: 'global_speed', value: 'globalSpeed' },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.GLOBAL_VOLUME]: {
    props: { title: 'global_volume', value: 'globalVolume' },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.HASH]: {
    props: { title: 'hash', value: 'hash' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.INFOHASH_V1]: {
    props: { title: 'infohash_v1', value: 'infohash_v1' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.INFOHASH_V2]: {
    props: { title: 'infohash_v2', value: 'infohash_v2' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.LAST_ACTIVITY]: {
    props: { title: 'last_activity', value: 'last_activity' },
    type: DashboardPropertyType.RELATIVE
  },
  [DashboardProperty.PEERS]: {
    props: { title: 'peers', value: 'num_leechs', total: 'available_peers' },
    type: DashboardPropertyType.AMOUNT
  },
  [DashboardProperty.PRIORITY]: {
    props: { title: 'priority', value: 'priority' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.PROGRESS]: {
    props: { title: 'progress', value: 'progress' },
    type: DashboardPropertyType.PERCENT
  },
  [DashboardProperty.RATIO]: {
    props: {
      title: 'ratio',
      value: 'ratio',
      color: (v: number) => {
        if (v < 0.5) return 'text-ratio-bad'
        if (v < 1) return 'text-ratio-almost'
        if (v < 5) return 'text-ratio-good'
        return 'text-ratio-best'
      }
    },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.RATIO_LIMIT]: {
    props: { title: 'ratio_limit', value: 'ratio_limit' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.RATIO_TIME_LIMIT]: {
    props: { title: 'ratio_time_limit', value: 'ratio_time_limit' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.SAVE_PATH]: {
    props: { title: 'save_path', value: 'savePath' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.SEEDING_TIME]: {
    props: { title: 'seeding_time', value: 'seeding_time' },
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.SEEDS]: {
    props: { title: 'seeds', value: 'num_seeds', total: 'available_seeds' },
    type: DashboardPropertyType.AMOUNT
  },
  [DashboardProperty.SEEN_COMPLETE]: {
    props: { title: 'seen_complete', value: 'seen_complete' },
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.SIZE]: {
    props: { title: 'size', value: 'size' },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.STATE]: {
    props: { title: 'state', value: 'stateString', color: 'torrent-$1', enableHashColor: false },
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.TAGS]: {
    props: { title: 'tags', value: 'tags', color: 'tag', enableHashColor: true },
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.TIME_ACTIVE]: {
    props: { title: 'time_active', value: 'time_active' },
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.TOTAL_SIZE]: {
    props: { title: 'total_size', value: 'total_size' },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.TRACKER]: {
    props: { title: 'tracker', value: 'tracker_domain', color: 'tracker', enableHashColor: false },
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.TRACKERS_COUNT]: {
    props: { title: 'trackers_count', value: 'trackers_count' },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.UPLOAD_LIMIT]: {
    props: { title: 'upload_limit', value: 'up_limit' },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.UPLOAD_SPEED]: {
    props: { title: 'upload_speed', value: 'upspeed' },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.UPLOADED]: {
    props: { title: 'uploaded', value: 'uploaded' },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.UPLOADED_SESSION]: {
    props: { title: 'uploaded_session', value: 'uploaded_session' },
    type: DashboardPropertyType.DATA
  }
}
