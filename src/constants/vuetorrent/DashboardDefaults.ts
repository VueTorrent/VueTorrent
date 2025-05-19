import { useI18nUtils } from '@/composables'
import { formatDuration, formatEta, getRatioColor, getTorrentStateColor } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { DurationUnitType } from 'dayjs/plugin/duration'
import { storeToRefs } from 'pinia'
import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'

type pptData = { active: boolean; order: number }

// TODO: Use `keyof Torrent` instead of `DashboardProperty` and remove sortKey, needs storage migration
type pptMetadataBase<T> = { titleKey: string; value: (t: Torrent) => T }
export type pptMetadataAmount = { type: DashboardPropertyType.AMOUNT; props: pptMetadataBase<number> & { total?: (t: Torrent) => number } }
type pptMetadataBoolean = { type: DashboardPropertyType.BOOLEAN; props: pptMetadataBase<boolean> }
export type pptMetadataChip = {
  type: DashboardPropertyType.CHIP
  props: pptMetadataBase<string[]> & { emptyValueKey: string; color: (t: Torrent) => string; enableHashColor?: boolean }
}
type pptMetadataData = { type: DashboardPropertyType.DATA; props: pptMetadataBase<number> }
type pptMetadataDatetime = { type: DashboardPropertyType.DATETIME; props: pptMetadataBase<number> }
type pptMetadataDuration = { type: DashboardPropertyType.DURATION; props: pptMetadataBase<number> & { unit: DurationUnitType } }
type pptMetadataPercent = { type: DashboardPropertyType.PERCENT; props: pptMetadataBase<number> & { color: (t: Torrent) => string } }
type pptMetadataRelative = { type: DashboardPropertyType.RELATIVE; props: pptMetadataBase<number> }
type pptMetadataSpeed = { type: DashboardPropertyType.SPEED; props: pptMetadataBase<number> }
export type pptMetadataText = { type: DashboardPropertyType.TEXT; props: pptMetadataBase<string> & { color?: (v: Torrent) => string } }

type pptMetadata = { qbitVersion?: string; sortKey: keyof Torrent } & (
  | pptMetadataAmount
  | pptMetadataBoolean
  | pptMetadataChip
  | pptMetadataData
  | pptMetadataDatetime
  | pptMetadataDuration
  | pptMetadataPercent
  | pptMetadataRelative
  | pptMetadataSpeed
  | pptMetadataText
)

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
  [DashboardProperty.AUTO_TMM]: {
    active: false,
    order: 53
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
  [DashboardProperty.BASENAME_CONTENT_PATH]: {
    active: false,
    order: 43
  },
  [DashboardProperty.BASENAME_DOWNLOAD_PATH]: {
    active: false,
    order: 44
  },
  [DashboardProperty.BASENAME_SAVE_PATH]: {
    active: false,
    order: 45
  },
  [DashboardProperty.CATEGORY]: {
    active: true,
    order: 14
  },
  [DashboardProperty.COMMENT]: {
    active: false,
    order: 47
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
  [DashboardProperty.FIRST_LAST_PIECE_PRIORITY]: {
    active: false,
    order: 54
  },
  [DashboardProperty.FORCED]: {
    active: false,
    order: 55
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
  [DashboardProperty.HAS_METADATA]: {
    active: false,
    order: 48
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
  [DashboardProperty.MAGNET]: {
    active: false,
    order: 56
  },
  [DashboardProperty.PEERS]: {
    active: true,
    order: 9
  },
  [DashboardProperty.POPULARITY]: {
    active: false,
    order: 50
  },
  [DashboardProperty.PRIORITY]: {
    active: false,
    order: 36
  },
  [DashboardProperty.PRIVATE]: {
    active: false,
    order: 49
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
  [DashboardProperty.REANNOUNCE]: {
    active: false,
    order: 51
  },
  [DashboardProperty.ROOT_PATH]: {
    active: false,
    order: 52
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
  [DashboardProperty.SEQUENTIAL_DOWNLOADS]: {
    active: false,
    order: 57
  },
  [DashboardProperty.SIZE]: {
    active: true,
    order: 1
  },
  [DashboardProperty.STATE]: {
    active: true,
    order: 11
  },
  [DashboardProperty.SUPER_SEEDING]: {
    active: false,
    order: 58
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
  [DashboardProperty.TRUNCATED_HASH]: {
    active: false,
    order: 46
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
    sortKey: 'added_on',
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.AMOUNT_LEFT]: {
    props: { titleKey: 'torrent.properties.amount_left', value: t => t.amount_left },
    sortKey: 'amount_left',
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.AUTO_TMM]: {
    props: { titleKey: 'torrent.properties.auto_tmm', value: t => t.auto_tmm },
    sortKey: 'auto_tmm',
    type: DashboardPropertyType.BOOLEAN
  },
  [DashboardProperty.AVAILABILITY]: {
    props: { titleKey: 'torrent.properties.availability', value: t => t.availability.toString() },
    sortKey: 'availability',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.AVG_DOWNLOAD_SPEED]: {
    props: { titleKey: 'torrent.properties.avg_download_speed', value: t => t.avgDownloadSpeed },
    sortKey: 'avgDownloadSpeed',
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.AVG_UPLOAD_SPEED]: {
    props: { titleKey: 'torrent.properties.avg_upload_speed', value: t => t.avgUploadSpeed },
    sortKey: 'avgUploadSpeed',
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.BASENAME_CONTENT_PATH]: {
    props: { titleKey: 'torrent.properties.basename_content_path', value: t => t.basename_content_path },
    sortKey: 'basename_content_path',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.BASENAME_DOWNLOAD_PATH]: {
    props: {
      titleKey: 'torrent.properties.basename_download_path',
      emptyValueKey: 'common.NA',
      value: t => [t.basename_download_path],
      color: () => 'primary',
      enableHashColor: true
    },
    sortKey: 'basename_download_path',
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.BASENAME_SAVE_PATH]: {
    props: {
      titleKey: 'torrent.properties.basename_save_path',
      emptyValueKey: 'common.NA',
      value: t => [t.basename_save_path],
      color: () => 'primary',
      enableHashColor: true
    },
    sortKey: 'basename_save_path',
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.CATEGORY]: {
    props: {
      titleKey: 'torrent.properties.category',
      emptyValueKey: 'torrent.properties.empty_category',
      value: t => [t.category],
      color: () => 'category',
      enableHashColor: true
    },
    sortKey: 'category',
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.COMMENT]: {
    qbitVersion: '5.0.0',
    props: { titleKey: 'torrent.properties.comment', value: t => t.comment },
    sortKey: 'comment',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.COMPLETED_ON]: {
    props: { titleKey: 'torrent.properties.completed_on', value: t => t.completed_on },
    sortKey: 'completed_on',
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.CONTENT_PATH]: {
    props: { titleKey: 'torrent.properties.content_path', value: t => t.content_path },
    sortKey: 'content_path',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.DOWNLOAD_LIMIT]: {
    props: { titleKey: 'torrent.properties.download_limit', value: t => t.dl_limit },
    sortKey: 'dl_limit',
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.DOWNLOAD_PATH]: {
    props: { titleKey: 'torrent.properties.download_path', value: t => t.download_path },
    sortKey: 'download_path',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.DOWNLOAD_SPEED]: {
    props: { titleKey: 'torrent.properties.download_speed', value: t => t.dlspeed },
    sortKey: 'dlspeed',
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.DOWNLOADED]: {
    props: { titleKey: 'torrent.properties.downloaded', value: t => t.downloaded },
    sortKey: 'downloaded',
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.DOWNLOADED_SESSION]: {
    props: { titleKey: 'torrent.properties.downloaded_session', value: t => t.downloaded_session },
    sortKey: 'downloaded_session',
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.ETA]: {
    props: { titleKey: 'torrent.properties.eta', value: t => formatEta(t.eta, t.forced) },
    sortKey: 'eta',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.FIRST_LAST_PIECE_PRIORITY]: {
    props: { titleKey: 'torrent.properties.f_l_piece_prio', value: t => t.f_l_piece_prio },
    sortKey: 'f_l_piece_prio',
    type: DashboardPropertyType.BOOLEAN
  },
  [DashboardProperty.FORCED]: {
    props: { titleKey: 'torrent.properties.forced', value: t => t.forced },
    sortKey: 'forced',
    type: DashboardPropertyType.BOOLEAN
  },
  [DashboardProperty.GLOBAL_SPEED]: {
    props: { titleKey: 'torrent.properties.global_speed', value: t => t.globalSpeed },
    sortKey: 'globalSpeed',
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.GLOBAL_VOLUME]: {
    props: { titleKey: 'torrent.properties.global_volume', value: t => t.globalVolume },
    sortKey: 'globalVolume',
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.HASH]: {
    props: { titleKey: 'torrent.properties.hash', value: t => t.hash },
    sortKey: 'hash',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.HAS_METADATA]: {
    qbitVersion: '5.0.0',
    props: { titleKey: 'torrent.properties.has_metadata', value: t => t.hasMetadata },
    sortKey: 'hasMetadata',
    type: DashboardPropertyType.BOOLEAN
  },
  [DashboardProperty.INACTIVE_SEEDING_TIME_LIMIT]: {
    props: {
      titleKey: 'torrent.properties.inactive_seeding_time_limit',
      unit: 'm',
      value: t => t.inactive_seeding_time_limit
    },
    sortKey: 'inactive_seeding_time_limit',
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.INFOHASH_V1]: {
    props: { titleKey: 'torrent.properties.infohash_v1', value: t => t.infohash_v1 },
    sortKey: 'infohash_v1',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.INFOHASH_V2]: {
    props: { titleKey: 'torrent.properties.infohash_v2', value: t => t.infohash_v2 },
    sortKey: 'infohash_v2',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.LAST_ACTIVITY]: {
    props: { titleKey: 'torrent.properties.last_activity', value: t => t.last_activity },
    sortKey: 'last_activity',
    type: DashboardPropertyType.RELATIVE
  },
  [DashboardProperty.MAGNET]: {
    props: { titleKey: 'torrent.properties.magnet', value: t => t.magnet },
    sortKey: 'magnet',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.PEERS]: {
    props: { titleKey: 'torrent.properties.peers', value: t => t.num_leechs, total: t => t.available_peers },
    sortKey: 'num_leechs',
    type: DashboardPropertyType.AMOUNT
  },
  [DashboardProperty.POPULARITY]: {
    qbitVersion: '5.0.0',
    props: {
      titleKey: 'torrent.properties.popularity',
      value: t => (t.popularity ? t.popularity.toFixed(2).toString() : '???')
    },
    sortKey: 'popularity',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.PRIORITY]: {
    props: { titleKey: 'torrent.properties.priority', value: t => t.priority.toString() },
    sortKey: 'priority',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.PRIVATE]: {
    qbitVersion: '5.0.0',
    props: { titleKey: 'torrent.properties.private', value: t => t.private ?? false },
    sortKey: 'private',
    type: DashboardPropertyType.BOOLEAN
  },
  [DashboardProperty.PROGRESS]: {
    props: {
      titleKey: 'torrent.properties.progress',
      value: t => t.progress,
      color: t => getTorrentStateColor(t.state)
    },
    sortKey: 'progress',
    type: DashboardPropertyType.PERCENT
  },
  [DashboardProperty.RATIO]: {
    props: {
      titleKey: 'torrent.properties.ratio',
      value: t => t.ratio.toFixed(2),
      color: t => {
        const { enableRatioColors } = storeToRefs(useVueTorrentStore())

        if (!enableRatioColors.value) return ''
        return getRatioColor(t.ratio)
      }
    },
    sortKey: 'ratio',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.RATIO_LIMIT]: {
    props: {
      titleKey: 'torrent.properties.ratio_limit',
      value: torrent => {
        const { t } = useI18nUtils()
        if (torrent.ratio_limit === -1) return t('common.disabled')
        else if (torrent.ratio_limit === -2) return t('common.global_value')
        else return torrent.ratio_limit.toString()
      }
    },
    sortKey: 'ratio_limit',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.REANNOUNCE]: {
    qbitVersion: '5.0.0',
    props: {
      titleKey: 'torrent.properties.reannounce',
      value: t => (t.reannounce ? formatDuration(t.reannounce, 's', 'mm:ss').toString() : '???')
    },
    sortKey: 'reannounce',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.ROOT_PATH]: {
    qbitVersion: '5.1.0',
    props: { titleKey: 'torrent.properties.root_path', value: t => t.rootPath ?? '' },
    sortKey: 'rootPath',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.SAVE_PATH]: {
    props: { titleKey: 'torrent.properties.save_path', value: t => t.savePath },
    sortKey: 'savePath',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.SEEDING_TIME]: {
    props: { titleKey: 'torrent.properties.seeding_time', unit: 's', value: t => t.seeding_time },
    sortKey: 'seeding_time',
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.SEEDING_TIME_LIMIT]: {
    props: { titleKey: 'torrent.properties.seeding_time_limit', unit: 'm', value: t => t.seeding_time_limit },
    sortKey: 'seeding_time_limit',
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.SEEDS]: {
    props: { titleKey: 'torrent.properties.seeds', value: t => t.num_seeds, total: t => t.available_seeds },
    sortKey: 'num_seeds',
    type: DashboardPropertyType.AMOUNT
  },
  [DashboardProperty.SEEN_COMPLETE]: {
    props: { titleKey: 'torrent.properties.seen_complete', value: t => t.seen_complete },
    sortKey: 'seen_complete',
    type: DashboardPropertyType.DATETIME
  },
  [DashboardProperty.SEQUENTIAL_DOWNLOADS]: {
    props: { titleKey: 'torrent.properties.seq_dl', value: t => t.seq_dl },
    sortKey: 'seq_dl',
    type: DashboardPropertyType.BOOLEAN
  },
  [DashboardProperty.SIZE]: {
    props: { titleKey: 'torrent.properties.size', value: t => t.size },
    sortKey: 'size',
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.STATE]: {
    props: {
      titleKey: 'torrent.properties.state',
      emptyValueKey: 'torrent.state.unknown',
      value: torrent => {
        const { getTorrentStateString } = useI18nUtils()
        return [getTorrentStateString(torrent.state)]
      },
      color: t => getTorrentStateColor(t.state)
    },
    sortKey: 'state',
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.SUPER_SEEDING]: {
    props: { titleKey: 'torrent.properties.super_seeding', value: t => t.super_seeding },
    sortKey: 'super_seeding',
    type: DashboardPropertyType.BOOLEAN
  },
  [DashboardProperty.TAGS]: {
    props: {
      titleKey: 'torrent.properties.tags',
      emptyValueKey: 'torrent.properties.empty_tags',
      value: t => t.tags,
      color: () => 'tag',
      enableHashColor: true
    },
    sortKey: 'tags',
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.TIME_ACTIVE]: {
    props: { titleKey: 'torrent.properties.time_active', unit: 's', value: t => t.time_active },
    sortKey: 'time_active',
    type: DashboardPropertyType.DURATION
  },
  [DashboardProperty.TOTAL_SIZE]: {
    props: { titleKey: 'torrent.properties.total_size', value: t => t.total_size },
    sortKey: 'total_size',
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.TRACKER]: {
    props: {
      titleKey: 'torrent.properties.tracker',
      emptyValueKey: 'torrent.properties.empty_tracker',
      value: t => [t.trackerDomain],
      color: () => 'tracker',
      enableHashColor: true
    },
    sortKey: 'trackerDomain',
    type: DashboardPropertyType.CHIP
  },
  [DashboardProperty.TRACKERS_COUNT]: {
    props: { titleKey: 'torrent.properties.trackers_count', value: t => t.trackers_count.toString() },
    sortKey: 'trackers_count',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.TRUNCATED_HASH]: {
    props: { titleKey: 'torrent.properties.truncated_hash', value: t => t.truncated_hash },
    sortKey: 'truncated_hash',
    type: DashboardPropertyType.TEXT
  },
  [DashboardProperty.UPLOAD_LIMIT]: {
    props: { titleKey: 'torrent.properties.upload_limit', value: t => t.up_limit },
    sortKey: 'up_limit',
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.UPLOAD_SPEED]: {
    props: { titleKey: 'torrent.properties.upload_speed', value: t => t.upspeed },
    sortKey: 'upspeed',
    type: DashboardPropertyType.SPEED
  },
  [DashboardProperty.UPLOADED]: {
    props: { titleKey: 'torrent.properties.uploaded', value: t => t.uploaded },
    sortKey: 'uploaded',
    type: DashboardPropertyType.DATA
  },
  [DashboardProperty.UPLOADED_SESSION]: {
    props: { titleKey: 'torrent.properties.uploaded_session', value: t => t.uploaded_session },
    sortKey: 'uploaded_session',
    type: DashboardPropertyType.DATA
  }
}
