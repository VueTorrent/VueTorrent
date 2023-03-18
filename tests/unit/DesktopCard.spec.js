import { describe, beforeEach, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import DesktopCard from '@/components/Settings/Tabs/VueTorrent/VDesktopCard.vue'
import {DashboardProperty} from "@/enums/vuetorrent";

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
  { name: 'Size', label: 'Size', active: true },
  { name: 'Progress', label: 'Progress', active: true },
  { name: 'DownloadSpeed', label: 'Download Speed', active: true },
  { name: 'UploadSpeed', label: 'Upload Speed', active: true },
  { name: 'Downloaded', label: 'Downloaded (global)', active: true },
  { name: 'SavePath', label: 'Save Path', active: false },
  { name: 'Uploaded', label: 'Uploaded (global)', active: true },
  { name: 'ETA', label: 'ETA', active: true },
  { name: 'Peers', label: 'Peers', active: true },
  { name: 'Seeds', label: 'Seeds', active: true },
  { name: 'Status', label: 'Status', active: true },
  { name: 'Ratio', label: 'Ratio', active: true },
  { name: 'Tracker', label: 'Tracker', active: false },
  { name: 'Category', label: 'Category', active: true },
  { name: 'Tags', label: 'Tags', active: true },
  { name: 'AddedOn', label: 'Added On', active: true },
  { name: 'Availability', label: 'Availability', active: true },
  { name: 'LastActivity', label: 'Last Activity', active: false },
  { name: 'CompletedOn', label: 'Completed On', active: false },
  { name: 'AmountLeft', label: 'Amount Left', active: false },
  { name: 'ContentPath', label: 'Content Path', active: false },
  { name: 'DownloadedSession', label: 'Downloaded (session)', active: false },
  { name: 'DownloadLimit', label: 'Download Limit', active: false },
  { name: 'DownloadPath', label: 'Download Path', active: false },
  { name: 'Hash', label: 'Hash', active: false },
  { name: 'InfoHashV1', label: 'Infohash v1', active: false },
  { name: 'InfoHashV2', label: 'Infohash v2', active: false },
  { name: 'SeenComplete', label: 'Seen Complete', active: false },
  { name: 'TimeActive', label: 'Time Active', active: false },
  { name: 'TotalSize', label: 'Total Size', active: false },
  { name: 'TrackersCount', label: 'Trackers Count', active: false },
  { name: 'UploadedSession', label: 'Uploaded (session)', active: false },
  { name: 'UploadLimit', label: 'Upload Limit', active: false },
  { name: 'GlobalSpeed', label: 'Global Speed', active: false },
  { name: 'GlobalVolume', label: 'Global Volume', active: false }
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
    expect(wrapper.vm.busyDesktopTorrentProperties).toEqual(desktopPropertiesTemplateExpected)
  })

  it('tests doneDesktopTorrentProperties', () => {
    expect(wrapper.vm.doneDesktopTorrentProperties).toEqual(desktopPropertiesTemplateExpected)
  })
})
