import { describe, beforeEach, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import DesktopCard from '@/components/Settings/Tabs/VueTorrent/VDesktopCard.vue'
import { DashboardProperty } from '@/enums/vuetorrent'

let wrapper

const desktopPropertiesTemplate = [
  { name: DashboardProperty.SIZE, active: true },
  { name: DashboardProperty.PROGRESS, active: true },
  { name: DashboardProperty.DOWNLOAD_SPEED, active: true },
  { name: DashboardProperty.UPLOAD_SPEED, active: true },
  { name: DashboardProperty.DOWNLOADED, active: true },
  { name: DashboardProperty.SAVE_PATH, active: false },
  { name: DashboardProperty.UPLOADED, active: true },
  { name: DashboardProperty.ETA, active: true },
  { name: DashboardProperty.PEERS, active: true },
  { name: DashboardProperty.SEEDS, active: true },
  { name: DashboardProperty.STATUS, active: true },
  { name: DashboardProperty.RATIO, active: true },
  { name: DashboardProperty.TRACKER, active: false },
  { name: DashboardProperty.CATEGORY, active: true },
  { name: DashboardProperty.TAGS, active: true },
  { name: DashboardProperty.ADDED_ON, active: true },
  { name: DashboardProperty.AVAILABILITY, active: true },
  { name: DashboardProperty.LAST_ACTIVITY, active: false },
  { name: DashboardProperty.COMPLETED_ON, active: false },
  { name: DashboardProperty.AMOUNT_LEFT, active: false },
  { name: DashboardProperty.CONTENT_PATH, active: false },
  { name: DashboardProperty.DOWNLOADED_SESSION, active: false },
  { name: DashboardProperty.DOWNLOAD_LIMIT, active: false },
  { name: DashboardProperty.DOWNLOAD_PATH, active: false },
  { name: DashboardProperty.HASH, active: false },
  { name: DashboardProperty.INFOHASH_V1, active: false },
  { name: DashboardProperty.INFOHASH_V2, active: false },
  { name: DashboardProperty.SEEN_COMPLETE, active: false },
  { name: DashboardProperty.TIME_ACTIVE, active: false },
  { name: DashboardProperty.TOTAL_SIZE, active: false },
  { name: DashboardProperty.TRACKERS_COUND, active: false },
  { name: DashboardProperty.UPLOADED_SESSION, active: false },
  { name: DashboardProperty.UPLOAD_LIMIT, active: false },
  { name: DashboardProperty.GLOBAL_SPEED, active: false },
  { name: DashboardProperty.GLOBAL_VOLUME, active: false }
]
const desktopPropertiesTemplateExpected = [
  { name: 'Size', active: true },
  { name: 'Progress', active: true },
  { name: 'DownloadSpeed', active: true },
  { name: 'UploadSpeed', active: true },
  { name: 'Downloaded', active: true },
  { name: 'SavePath', active: false },
  { name: 'Uploaded', active: true },
  { name: 'ETA', active: true },
  { name: 'Peers', active: true },
  { name: 'Seeds', active: true },
  { name: 'Status', active: true },
  { name: 'Ratio', active: true },
  { name: 'Tracker', active: false },
  { name: 'Category', active: true },
  { name: 'Tags', active: true },
  { name: 'AddedOn', active: true },
  { name: 'Availability', active: true },
  { name: 'LastActivity', active: false },
  { name: 'CompletedOn', active: false },
  { name: 'AmountLeft', active: false },
  { name: 'ContentPath', active: false },
  { name: 'DownloadedSession', active: false },
  { name: 'DownloadLimit', active: false },
  { name: 'DownloadPath', active: false },
  { name: 'Hash', active: false },
  { name: 'InfoHashV1', active: false },
  { name: 'InfoHashV2', active: false },
  { name: 'SeenComplete', active: false },
  { name: 'TimeActive', active: false },
  { name: 'TotalSize', active: false },
  { name: 'TrackersCount', active: false },
  { name: 'UploadedSession', active: false },
  { name: 'UploadLimit', active: false },
  { name: 'GlobalSpeed', active: false },
  { name: 'GlobalVolume', active: false }
]

describe('DesktopCard', () => {
  beforeEach(() => {
    wrapper = shallowMount(DesktopCard, {
      mocks: {
        $t: x => x,
        $store: {
          getters: { getAppVersion: vi.fn() },
          state: {
            webuiSettings: {
              lang: 'en',
              darkTheme: false,
              showFreeSpace: true,
              showSpeedGraph: true,
              showSessionStat: true,
              showAlltimeStat: true,
              showCurrentSpeed: true,
              showTrackerFilter: false,
              showSpeedInTitle: false,
              deleteWithFiles: false,
              title: 'Default',
              rightDrawer: false,
              paginationSize: 15,
              dateFormat: 'DD/MM/YYYY, HH:mm:ss',
              openSideBarOnStart: true,
              showShutdownButton: true,
              busyDesktopTorrentProperties: JSON.parse(JSON.stringify(desktopPropertiesTemplate)),
              doneDesktopTorrentProperties: JSON.parse(JSON.stringify(desktopPropertiesTemplate))
            }
          }
        }
      }
    })
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('tests busyDesktopTorrentProperties', () => {
    expect(wrapper.vm.webuiSettings.busyDesktopTorrentProperties).toEqual(desktopPropertiesTemplateExpected)
  })

  it('tests doneDesktopTorrentProperties', () => {
    expect(wrapper.vm.webuiSettings.doneDesktopTorrentProperties).toEqual(desktopPropertiesTemplateExpected)
  })
})
