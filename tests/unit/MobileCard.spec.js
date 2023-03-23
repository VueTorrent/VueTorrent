import { describe, beforeEach, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import MobileCard from '@/components/Settings/Tabs/VueTorrent/VMobileCard.vue'
import { DashboardProperty } from '@/enums/vuetorrent'

let wrapper

const mobilePropertiesTemplate = [
  { name: DashboardProperty.STATUS, active: true },
  { name: DashboardProperty.TRACKER, active: true },
  { name: DashboardProperty.CATEGORY, active: true },
  { name: DashboardProperty.TAGS, active: true },
  { name: DashboardProperty.SIZE, active: true },
  { name: DashboardProperty.PROGRESS, active: true },
  { name: DashboardProperty.RATIO, active: true },
  { name: DashboardProperty.UPLOADED, active: true },
  { name: DashboardProperty.ETA, active: true },
  { name: DashboardProperty.SEEDS, active: true },
  { name: DashboardProperty.PEERS, active: true },
  { name: DashboardProperty.DOWNLOAD_SPEED, active: true },
  { name: DashboardProperty.UPLOAD_SPEED, active: true }
]
const mobilePropertiesTemplateExpected = [
  { name: 'Status', label: 'Status', active: true },
  { name: 'Tracker', label: 'Tracker', active: true },
  { name: 'Category', label: 'Category', active: true },
  { name: 'Tags', label: 'Tags', active: true },
  { name: 'Size', label: 'Size', active: true },
  { name: 'Progress', label: 'Progress', active: true },
  { name: 'Ratio', label: 'Ratio', active: true },
  { name: 'Uploaded', label: 'Uploaded (global)', active: true },
  { name: 'ETA', label: 'ETA', active: true },
  { name: 'Seeds', label: 'Seeds', active: true },
  { name: 'Peers', label: 'Peers', active: true },
  { name: 'DownloadSpeed', label: 'Download Speed', active: true },
  { name: 'UploadSpeed', label: 'Upload Speed', active: true }
]

describe('MobileCard', () => {
  beforeEach(() => {
    wrapper = shallowMount(MobileCard, {
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
              busyMobileCardProperties: JSON.parse(JSON.stringify(mobilePropertiesTemplate)),
              doneMobileCardProperties: JSON.parse(JSON.stringify(mobilePropertiesTemplate))
            }
          }
        }
      }
    })
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('tests busyMobileCardProperties', () => {
    expect(wrapper.vm.busyMobileCardProperties).toEqual(mobilePropertiesTemplateExpected)
  })

  it('tests doneMobileCardProperties', () => {
    expect(wrapper.vm.doneMobileCardProperties).toEqual(mobilePropertiesTemplateExpected)
  })
})
