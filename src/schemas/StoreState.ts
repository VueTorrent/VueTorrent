import { JSONSchemaType } from 'ajv'
import { PersistentStoreState } from '@/types/vuetorrent'
import { DashboardProperty, TitleOptions } from '@/enums/vuetorrent'

export const StoreStateSchema: JSONSchemaType<PersistentStoreState> = {
  type: 'object',
  properties: {
    authenticated: { type: 'boolean' },
    sort_options: {
      type: 'object',
      properties: {
        isCustomSortEnabled: { type: 'boolean' },
        sort: { type: 'string' },
        reverse: { type: 'boolean' },
        filter: { type: 'string', nullable: true },
        category: { type: 'string', nullable: true },
        tag: { type: 'string', nullable: true },
        tracker: { type: 'string', nullable: true }
      },
      required: ['isCustomSortEnabled', 'sort', 'reverse', 'filter', 'category', 'tag', 'tracker']
    },
    webuiSettings: {
      type: 'object',
      properties: {
        lang: { type: 'string' },
        darkTheme: { type: 'boolean' },
        showFreeSpace: { type: 'boolean' },
        showSpeedGraph: { type: 'boolean' },
        showSessionStat: { type: 'boolean' },
        showAlltimeStat: { type: 'boolean' },
        showCurrentSpeed: { type: 'boolean' },
        showTrackerFilter: { type: 'boolean' },
        showSpeedInTitle: { type: 'boolean' },
        deleteWithFiles: { type: 'boolean' },
        title: {
          type: 'string',
          enum: [TitleOptions.DEFAULT, TitleOptions.GLOBAL_SPEED, TitleOptions.FIRST_TORRENT_STATUS]
        },
        rightDrawer: { type: 'boolean' },
        topPagination: { type: 'boolean' },
        paginationSize: { type: 'number' },
        dateFormat: { type: 'string' },
        openSideBarOnStart: { type: 'boolean' },
        showShutdownButton: { type: 'boolean' },
        busyDesktopTorrentProperties: { $ref: '/schemas/desktopDashboardProperties' },
        doneDesktopTorrentProperties: { $ref: '/schemas/desktopDashboardProperties' },
        busyMobileCardProperties: { $ref: '/schemas/mobileDashboardProperties' },
        doneMobileCardProperties: { $ref: '/schemas/mobileDashboardProperties' }
      },
      required: [
        'lang',
        'darkTheme',
        'showFreeSpace',
        'showSpeedGraph',
        'showSessionStat',
        'showAlltimeStat',
        'showCurrentSpeed',
        'showTrackerFilter',
        'showSpeedInTitle',
        'deleteWithFiles',
        'title',
        'rightDrawer',
        'topPagination',
        'paginationSize',
        'dateFormat',
        'openSideBarOnStart',
        'showShutdownButton',
        'busyDesktopTorrentProperties',
        'doneDesktopTorrentProperties',
        'busyMobileCardProperties',
        'doneMobileCardProperties'
      ]
    }
  },
  required: ['sort_options', 'webuiSettings', 'authenticated'],
  additionalProperties: false,

  $defs: {
    DesktopDashboardProperties: {
      $id: '/schemas/desktopDashboardProperties',
      type: 'array',
      uniqueItems: true,
      minItems: 35,
      maxItems: 35,
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            enum: [
              DashboardProperty.ADDED_ON,
              DashboardProperty.AMOUNT_LEFT,
              DashboardProperty.AVAILABILITY,
              DashboardProperty.CATEGORY,
              DashboardProperty.COMPLETED_ON,
              DashboardProperty.CONTENT_PATH,
              DashboardProperty.DOWNLOAD_SPEED,
              DashboardProperty.DOWNLOADED,
              DashboardProperty.DOWNLOADED_SESSION,
              DashboardProperty.DOWNLOAD_LIMIT,
              DashboardProperty.DOWNLOAD_PATH,
              DashboardProperty.ETA,
              DashboardProperty.GLOBAL_SPEED,
              DashboardProperty.GLOBAL_VOLUME,
              DashboardProperty.HASH,
              DashboardProperty.INFOHASH_V1,
              DashboardProperty.INFOHASH_V2,
              DashboardProperty.LAST_ACTIVITY,
              DashboardProperty.PEERS,
              DashboardProperty.PROGRESS,
              DashboardProperty.RATIO,
              DashboardProperty.SAVE_PATH,
              DashboardProperty.SEEDS,
              DashboardProperty.SEEN_COMPLETE,
              DashboardProperty.SIZE,
              DashboardProperty.STATUS,
              DashboardProperty.TAGS,
              DashboardProperty.TIME_ACTIVE,
              DashboardProperty.TOTAL_SIZE,
              DashboardProperty.TRACKER,
              DashboardProperty.TRACKERS_COUND,
              DashboardProperty.UPLOAD_LIMIT,
              DashboardProperty.UPLOAD_SPEED,
              DashboardProperty.UPLOADED,
              DashboardProperty.UPLOADED_SESSION
            ]
          },
          active: { type: 'boolean' }
        },
        required: ['name', 'active']
      }
    },
    MobileDashboardProperties: {
      $id: '/schemas/mobileDashboardProperties',
      type: 'array',
      uniqueItems: true,
      minItems: 13,
      maxItems: 13,
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            enum: [
              DashboardProperty.SIZE,
              DashboardProperty.PROGRESS,
              DashboardProperty.DOWNLOAD_SPEED,
              DashboardProperty.UPLOAD_SPEED,
              DashboardProperty.ETA,
              DashboardProperty.PEERS,
              DashboardProperty.SEEDS,
              DashboardProperty.STATUS,
              DashboardProperty.RATIO,
              DashboardProperty.UPLOADED,
              DashboardProperty.TRACKER,
              DashboardProperty.CATEGORY,
              DashboardProperty.TAGS
            ]
          },
          active: { type: 'boolean' }
        },
        required: ['name', 'active']
      }
    }
  }
}
