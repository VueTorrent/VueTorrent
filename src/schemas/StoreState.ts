import { JSONSchemaType } from 'ajv'
import { StoreState } from '@/types/vuetorrent'
import { DashboardProperty, TitleOptions } from '@/enums/vuetorrent'

export const StoreStateSchema: JSONSchemaType<StoreState> = {
  type: "object",
  properties: {
    authenticated: {type: "boolean"},
    sort_options: {
      type: "object",
      properties: {
        isCustomSortEnabled: {type: "boolean"},
        sort: {type: "string"},
        reverse: {type: "boolean"},
        filter: {type: "string", nullable: true},
        category: {type: "string", nullable: true},
        tag: {type: "string", nullable: true},
        tracker: {type: "string", nullable: true},
      },
      required: [
        "isCustomSortEnabled",
        "sort",
        "reverse",
        "filter",
        "category",
        "tag",
        "tracker"
      ]
    },
    webuiSettings: {
      type: "object",
      properties: {
        lang: {type: "string"},
        darkTheme: {type: "boolean"},
        showFreeSpace: {type: "boolean"},
        showSpeedGraph: {type: "boolean"},
        showSessionStat: {type: "boolean"},
        showAlltimeStat: {type: "boolean"},
        showCurrentSpeed: {type: "boolean"},
        showTrackerFilter: {type: "boolean"},
        showSpeedInTitle: {type: "boolean"},
        deleteWithFiles: {type: "boolean"},
        title: {
          type: "string",
          enum: [
            TitleOptions.DEFAULT,
            TitleOptions.GLOBAL_SPEED,
            TitleOptions.FIRST_TORRENT_STATUS
          ]
        },
        rightDrawer: {type: "boolean"},
        topPagination: {type: "boolean"},
        paginationSize: {type: "number"},
        dateFormat: {type: "string"},
        openSideBarOnStart: {type: "boolean"},
        busyTorrentProperties: {$ref: "/schemas/dashboardProperties"},
        doneTorrentProperties: {$ref: "/schemas/dashboardProperties"}
      }
    }
  },
  required: [
    "sort_options",
    "webuiSettings",
    "authenticated"
  ],
  additionalProperties: false,

  $defs: {
    DashboardProperties: {
      $id: "/schemas/dashboardProperties",
      type: "array",
      uniqueItems: true,
      minItems: 21,
      maxItems: 21,
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            enum: [
              DashboardProperty.SIZE,
              DashboardProperty.PROGRESS,
              DashboardProperty.DOWNLOAD,
              DashboardProperty.UPLOAD,
              DashboardProperty.DOWNLOADED,
              DashboardProperty.DIRECTORY,
              DashboardProperty.UPLOADED,
              DashboardProperty.ETA,
              DashboardProperty.PEERS,
              DashboardProperty.SEEDS,
              DashboardProperty.STATUS,
              DashboardProperty.RAIO,
              DashboardProperty.TRACKER,
              DashboardProperty.CATEGORY,
              DashboardProperty.TAGS,
              DashboardProperty.ADDED_ON,
              DashboardProperty.AVAILABILITY,
              DashboardProperty.LAST_ACTIVITY,
              DashboardProperty.COMPLETED_ON,
              DashboardProperty.GLOBAL_SPEED,
              DashboardProperty.GLOBAL_VOLUME
            ]
          },
          active: {type: "boolean"}
        },
        required: ["name", "active"]
      }
    }
  }
}
