import { describe, beforeEach, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import BitTorrent from '@/components/Settings/Tabs/BitTorrent.vue'

let wrapper

const getSettingsMockRes = {
  dht: true,
  pex: true,
  lsd: true,
  anonymous_mode: true,
  queueing_enabled: true,
  max_active_downloads: 1,
  max_active_uploads: 'max_active_uploads',
  max_active_torrents: 6,
  dont_count_slow_torrents: true,
  slow_torrent_dl_rate_threshold: 1,
  slow_torrent_ul_rate_threshold: 1,
  slow_torrent_inactive_timer: 1,
  max_ratio_enabled: true,
  max_ratio: 1,
  max_seeding_time_enabled: true,
  max_seeding_time: 1
}

const getCustomWrapper = getSettingsRes => {
  return shallowMount(BitTorrent, {
    mocks: {
      $t: x => x,
      $store: {
        getters: {
          getSettings: () => {
            return getSettingsRes
          }
        },
        state: {}
      }
    }
  })
}

describe('BitTorrent', () => {
  beforeEach(() => {
    wrapper = getCustomWrapper(getSettingsMockRes)
  })

  it('render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('render correctly when anonymous_mode is false', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      anonymous_mode: false
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })

  it('render correctly when queueing_enabled is false', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      queueing_enabled: false
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })

  it('render correctly when dont_count_slow_torrents is false', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      dont_count_slow_torrents: false
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })

  it('render correctly when max_ratio_enabled is false', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      max_ratio_enabled: false
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })

  it('render correctly when max_seeding_time_enabled is false', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      max_seeding_time_enabled: false
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })

  it('render correctly when max_active_downloads is 2', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      max_active_downloads: 2
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })

  it('render correctly when max_active_torrents is 3', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      max_active_torrents: 3
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })

  it('render correctly when slow_torrent_dl_rate_threshold is 25', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      slow_torrent_dl_rate_threshold: 25
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })

  it('render correctly when slow_torrent_ul_rate_threshold is 24', () => {
    const customWrapper = getCustomWrapper({
      ...getSettingsMockRes,
      slow_torrent_ul_rate_threshold: 24
    })
    expect(customWrapper.html()).toMatchSnapshot()
  })
})
