import { describe, beforeEach, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import DesktopCard from '@/components/Settings/Tabs/VueTorrent/VDesktopCard.vue'

let wrapper

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
              busyDesktopTorrentProperties: [
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
              doneDesktopTorrentProperties: [
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

  it('tests busyDesktopTorrentProperties', () => {
    const busyDesktopTorrentProperties = [
      { name: 'Size', label: 'Size', active: true },
      { name: 'Progress', label: 'Progress', active: true },
      { name: 'Download', label: 'Download Speed', active: true },
      { name: 'Upload', label: 'Upload Speed', active: true },
      { name: 'Downloaded', label: 'Downloaded', active: true },
      { name: 'Uploaded', label: 'Uploaded', active: true },
      { name: 'ETA', label: 'ETA', active: true },
      { name: 'Peers', label: 'Peers', active: true },
      { name: 'Seeds', label: 'Seeds', active: true },
      { name: 'Status', label: 'State', active: true },
      { name: 'Ratio', label: 'Ratio', active: true },
      { name: 'Category', label: 'Category', active: true },
      { name: 'Tags', label: 'Tags', active: true },
      { name: 'AddedOn', label: 'Added On', active: true },
      { name: 'Availability', label: 'Availability', active: true }
    ]
    expect(wrapper.vm.busyDesktopTorrentProperties).toEqual(busyDesktopTorrentProperties)
  })

  it('tests doneDesktopTorrentProperties', () => {
    const doneDesktopTorrentProperties = [
      { name: 'Size', label: 'Size', active: true },
      { name: 'Progress', label: 'Progress', active: true },
      { name: 'Download', label: 'Download Speed', active: true },
      { name: 'Upload', label: 'Upload Speed', active: true },
      { name: 'Downloaded', label: 'Downloaded', active: true },
      { name: 'Uploaded', label: 'Uploaded', active: true },
      { name: 'ETA', label: 'ETA', active: true },
      { name: 'Peers', label: 'Peers', active: true },
      { name: 'Seeds', label: 'Seeds', active: true },
      { name: 'Status', label: 'State', active: true },
      { name: 'Ratio', label: 'Ratio', active: true },
      { name: 'Category', label: 'Category', active: true },
      { name: 'Tags', label: 'Tags', active: true },
      { name: 'AddedOn', label: 'Added On', active: true },
      { name: 'Availability', label: 'Availability', active: true }
    ]
    expect(wrapper.vm.doneDesktopTorrentProperties).toEqual(doneDesktopTorrentProperties)
  })
})
