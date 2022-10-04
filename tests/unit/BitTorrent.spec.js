import { shallowMount } from '@vue/test-utils'
import BitTorrent from '../../src/components/Settings/Tabs/BitTorrent.vue'

let wrapper

const getSettingsMockRes = {
    dht:true,
    pex:true,
    lsd:true,
    anonymous_mode:true,
    queueing_enabled:true,
    max_active_downloads:1,
    max_active_uploads:'max_active_uploads',
    max_active_torrents:6,
    dont_count_slow_torrents:true,
    slow_torrent_dl_rate_threshold:1,
    slow_torrent_ul_rate_threshold:1,
    slow_torrent_inactive_timer:1,
    max_ratio_enabled:true,
    max_ratio:1,
    max_seeding_time_enabled:true,
    max_seeding_time:1
}

const getCustomWrapper = (getSettingsRes)=>  {
    return shallowMount(BitTorrent,{ mocks: { $t: (x) => x , $store: {
        getters:{getSettings:()=>{
            return getSettingsRes
        }},
        state: {  }
            }
        } })
}

describe('BitTorrent', () => {
    beforeEach(() => {
        wrapper = shallowMount(BitTorrent,{ mocks: { $t: (x) => x , $store: {
            getters:{getSettings:()=>{
                return getSettingsMockRes
            }},
            state: {  }
                }
            } })
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('render correctly when anonymous_mode is false', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            anonymous_mode:false
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })

    it('render correctly when queueing_enabled is false', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            queueing_enabled:false
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })

    it('render correctly when dont_count_slow_torrents is false', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            dont_count_slow_torrents:false
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })

    it('render correctly when max_ratio_enabled is false', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            max_ratio_enabled:false
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })

    it('render correctly when max_seeding_time_enabled is false', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            max_seeding_time_enabled:false
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })

    it('render correctly when max_active_downloads is 2', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            max_active_downloads:2
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })

    it('render correctly when max_active_torrents is 3', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            max_active_torrents:3
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })

    it('render correctly when slow_torrent_dl_rate_threshold is 25', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            slow_torrent_dl_rate_threshold:25
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })

    it('render correctly when slow_torrent_ul_rate_threshold is 24', () => {
        const customerWarpper = getCustomWrapper({
            ...getSettingsMockRes,
            slow_torrent_ul_rate_threshold:24
        })
        expect(customerWarpper.html()).toMatchSnapshot()
    })
})
