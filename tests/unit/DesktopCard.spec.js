import { describe, beforeEach, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import DesktopCard from '@/components/Settings/Tabs/VueTorrent/VDesktopCard.vue'

let wrapper

const desktopPropertiesTemplate = [
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
