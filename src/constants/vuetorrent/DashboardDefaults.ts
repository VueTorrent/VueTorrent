import { Torrent } from '@/types/vuetorrent'
import { useI18n } from 'vue-i18n'
import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'
import { getRatioColor } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { DurationUnitType } from 'dayjs/plugin/duration'

type pptData = { active: boolean; order: number }

type pptMetadataBase<T> = { titleKey: string; value: (t: Torrent) => T }
type pptMetadata =
  | { type: DashboardPropertyType.AMOUNT; props: pptMetadataBase<number> & { total?: (t: Torrent) => number } }
  | { type: DashboardPropertyType.CHIP; props: pptMetadataBase<string[]> & { emptyValueKey: string; color: (t: Torrent) => string; enableHashColor?: boolean } }
  | { type: DashboardPropertyType.DATA; props: pptMetadataBase<number> }
  | { type: DashboardPropertyType.DATETIME; props: pptMetadataBase<number> }
  | { type: DashboardPropertyType.DURATION; props: pptMetadataBase<number> & { unit: DurationUnitType } }
  | { type: DashboardPropertyType.PERCENT; props: pptMetadataBase<number> & { color: (t: Torrent) => string } }
  | { type: DashboardPropertyType.RELATIVE; props: pptMetadataBase<number> }
  | { type: DashboardPropertyType.SPEED; props: pptMetadataBase<number> }
  | { type: DashboardPropertyType.TEXT; props: pptMetadataBase<string> & { color?: (v: any) => string } }

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
  [DashboardProperty.INACTIVE_SEEDING_TIME_LIMIT]: {
    active: false,
    order: 42
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
  [DashboardProperty.SAVE_PATH]: {
    active: false,
    order: 6
  },
  [DashboardProperty.SEEDING_TIME]: {
    active: false,
    order: 38
  },
  [DashboardProperty.SEEDING_TIME_LIMIT]: {
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
    props: { titleKey: 'torrent.properties.added_on', value: t => t.added_on },
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.AMOUNT_LEFT]: {
    props: { titleKey: 'torrent.properties.amount_left', value: t => t.amount_left },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.AVAILABILITY]: {
    props: { titleKey: 'torrent.properties.availability', value: t => t.availability.toString() },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.AVG_DOWNLOAD_SPEED]: {
    props: { titleKey: 'torrent.properties.avg_download_speed', value: t => t.avgDownloadSpeed },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.AVG_UPLOAD_SPEED]: {
    props: { titleKey: 'torrent.properties.avg_upload_speed', value: t => t.avgUploadSpeed },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.CATEGORY]: {
    props: {
      titleKey: 'torrent.properties.category',
      emptyValueKey: 'torrent.properties.empty_category',
      value: t => [t.category],
      color: () => 'category',
      enableHashColor: true
    },
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.COMPLETED_ON]: {
    props: { titleKey: 'torrent.properties.completed_on', value: t => t.completed_on },
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.CONTENT_PATH]: {
    props: { titleKey: 'torrent.properties.content_path', value: t => t.content_path },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.DOWNLOAD_LIMIT]: {
    props: { titleKey: 'torrent.properties.download_limit', value: t => t.dl_limit },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.DOWNLOAD_PATH]: {
    props: { titleKey: 'torrent.properties.download_path', value: t => t.download_path },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.DOWNLOAD_SPEED]: {
    props: { titleKey: 'torrent.properties.download_speed', value: t => t.dlspeed },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.DOWNLOADED]: {
    props: { titleKey: 'torrent.properties.downloaded', value: t => t.downloaded },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.DOWNLOADED_SESSION]: {
    props: { titleKey: 'torrent.properties.downloaded_session', value: t => t.downloaded_session },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.ETA]: {
    props: { titleKey: 'torrent.properties.eta', value: t => t.eta },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.GLOBAL_SPEED]: {
    props: { titleKey: 'torrent.properties.global_speed', value: t => t.globalSpeed },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.GLOBAL_VOLUME]: {
    props: { titleKey: 'torrent.properties.global_volume', value: t => t.globalVolume },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.HASH]: {
    props: { titleKey: 'torrent.properties.hash', value: t => t.hash },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.INACTIVE_SEEDING_TIME_LIMIT]: {
    props: { titleKey: 'torrent.properties.inactive_seeding_time_limit', unit: 'm', value: t => t.inactive_seeding_time_limit },
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.INFOHASH_V1]: {
    props: { titleKey: 'torrent.properties.infohash_v1', value: t => t.infohash_v1 },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.INFOHASH_V2]: {
    props: { titleKey: 'torrent.properties.infohash_v2', value: t => t.infohash_v2 },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.LAST_ACTIVITY]: {
    props: { titleKey: 'torrent.properties.last_activity', value: t => t.last_activity },
    type: DashboardPropertyType.RELATIVE
  },
  [DashboardProperty.PEERS]: {
    props: { titleKey: 'torrent.properties.peers', value: t => t.num_leechs, total: t => t.available_peers },
    type: DashboardPropertyType.AMOUNT
  },
  [DashboardProperty.PRIORITY]: {
    props: { titleKey: 'torrent.properties.priority', value: t => t.priority.toString() },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.PROGRESS]: {
    props: { titleKey: 'torrent.properties.progress', value: t => t.progress, color: t => `torrent-${t.state}` },
    type: DashboardPropertyType.PERCENT
  },
  [DashboardProperty.RATIO]: {
    props: {
      titleKey: 'torrent.properties.ratio',
      value: t => t.ratio.toString(),
      color: (v: number) => {
        const { enableRatioColors } = storeToRefs(useVueTorrentStore())

        if (!enableRatioColors.value) return ''
        return getRatioColor(v)
      }
    },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.RATIO_LIMIT]: {
    props: {
      titleKey: 'torrent.properties.ratio_limit',
      value: t => {
        const i18n = useI18n()
        if (t.ratio_limit === -1) return i18n.t('common.disabled')
        else if (t.ratio_limit === -2) return i18n.t('common.global_value')
        else return t.ratio_limit.toString()
      }
    },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.SAVE_PATH]: {
    props: { titleKey: 'torrent.properties.save_path', value: t => t.savePath },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.SEEDING_TIME]: {
    props: { titleKey: 'torrent.properties.seeding_time', unit: 's', value: t => t.seeding_time },
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.SEEDING_TIME_LIMIT]: {
    props: { titleKey: 'torrent.properties.seeding_time_limit', unit: 'm', value: t => t.seeding_time_limit },
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.SEEDS]: {
    props: { titleKey: 'torrent.properties.seeds', value: t => t.num_seeds, total: t => t.available_seeds },
    type: DashboardPropertyType.AMOUNT
  },
  [DashboardProperty.SEEN_COMPLETE]: {
    props: { titleKey: 'torrent.properties.seen_complete', value: t => t.seen_complete },
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.SIZE]: {
    props: { titleKey: 'torrent.properties.size', value: t => t.size },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.STATE]: {
    props: { titleKey: 'torrent.properties.state', emptyValueKey: 'torrent.state.unknown', value: t => [t.stateString], color: t => `torrent-${t.state}` },
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.TAGS]: {
    props: { titleKey: 'torrent.properties.tags', emptyValueKey: 'torrent.properties.empty_tags', value: t => t.tags, color: () => 'tag', enableHashColor: true },
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.TIME_ACTIVE]: {
    props: { titleKey: 'torrent.properties.time_active', unit: 's', value: t => t.time_active },
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.TOTAL_SIZE]: {
    props: { titleKey: 'torrent.properties.total_size', value: t => t.total_size },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.TRACKER]: {
    props: {
      titleKey: 'torrent.properties.tracker',
      emptyValueKey: 'torrent.properties.empty_category',
      value: t => [t.tracker_domain],
      color: () => 'tracker',
      enableHashColor: true
    },
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.TRACKERS_COUNT]: {
    props: { titleKey: 'torrent.properties.trackers_count', value: t => t.trackers_count.toString() },
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.UPLOAD_LIMIT]: {
    props: { titleKey: 'torrent.properties.upload_limit', value: t => t.up_limit },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.UPLOAD_SPEED]: {
    props: { titleKey: 'torrent.properties.upload_speed', value: t => t.upspeed },
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.UPLOADED]: {
    props: { titleKey: 'torrent.properties.uploaded', value: t => t.uploaded },
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.UPLOADED_SESSION]: {
    props: { titleKey: 'torrent.properties.uploaded_session', value: t => t.uploaded_session },
    type: DashboardPropertyType.DATA
  }
}
