import { describe, beforeEach, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import Dashboard from '@/components/Settings/Tabs/VueTorrent/Dashboard.vue'

let wrapper

describe('Dashboard', () => {
  beforeEach(() => {
    wrapper = shallowMount(Dashboard, {
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
              busyTorrentProperties: [
                { name: 'Size', active: true },
                { name: 'Progress', active: true },
                { name: 'Download', active: true },
                { name: 'Upload', active: true },
                { name: 'Downloaded', active: true },
                { name: 'Uploaded', active: true },
                { name: 'ETA', active: true },
                { name: 'Peers', active: true },
                { name: 'Seeds', active: true },
                { name: 'Status', active: true },
                { name: 'Ratio', active: true },
                { name: 'Category', active: true },
                { name: 'Tags', active: true },
                { name: 'AddedOn', active: true },
                { name: 'Availability', active: true }
              ],
              doneTorrentProperties: [
                { name: 'Size', active: true },
                { name: 'Progress', active: true },
                { name: 'Download', active: true },
                { name: 'Upload', active: true },
                { name: 'Downloaded', active: true },
                { name: 'Uploaded', active: true },
                { name: 'ETA', active: true },
                { name: 'Peers', active: true },
                { name: 'Seeds', active: true },
                { name: 'Status', active: true },
                { name: 'Ratio', active: true },
                { name: 'Category', active: true },
                { name: 'Tags', active: true },
                { name: 'AddedOn', active: true },
                { name: 'Availability', active: true }
              ]
            }
          }
        }
      }
    })
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('tests busyTorrentProperties', () => {
    const busyTorrentProperties = [
      { name: 'Size', active: true },
      { name: 'Progress', active: true },
      { name: 'Download', active: true },
      { name: 'Upload', active: true },
      { name: 'Downloaded', active: true },
      { name: 'Uploaded', active: true },
      { name: 'ETA', active: true },
      { name: 'Peers', active: true },
      { name: 'Seeds', active: true },
      { name: 'Status', active: true },
      { name: 'Ratio', active: true },
      { name: 'Category', active: true },
      { name: 'Tags', active: true },
      { name: 'AddedOn', active: true },
      { name: 'Availability', active: true }
    ]
    expect(wrapper.vm.busyTorrentProperties).toEqual(busyTorrentProperties)
  })

  it('tests doneTorrentProperties', () => {
    const doneTorrentProperties = [
      { name: 'Size', active: true },
      { name: 'Progress', active: true },
      { name: 'Download', active: true },
      { name: 'Upload', active: true },
      { name: 'Downloaded', active: true },
      { name: 'Uploaded', active: true },
      { name: 'ETA', active: true },
      { name: 'Peers', active: true },
      { name: 'Seeds', active: true },
      { name: 'Status', active: true },
      { name: 'Ratio', active: true },
      { name: 'Category', active: true },
      { name: 'Tags', active: true },
      { name: 'AddedOn', active: true },
      { name: 'Availability', active: true }
    ]
    expect(wrapper.vm.doneTorrentProperties).toEqual(doneTorrentProperties)
  })
})
