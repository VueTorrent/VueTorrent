import Torrent from '../models/torrent'
import Status from '../models/Status'
import qbit from '../services/qbit'
import { getHostName } from '../helpers'

export default {
    SET_APP_VERSION(state, version) {
        state.version = version
    },
    REMOVE_INTERVALS: state => {
        state.intervals.forEach(el => clearInterval(el))
    },
    ADD_MODAL(state, modal) {
        state.modals.push(modal)
    },
    DELETE_MODAL(state, guid) {
        state.modals = state.modals.filter(m => m.guid !== guid)
    },
    SET_SELECTED: (state, payload) => {
        if (payload.type === 'add') state.selected_torrents.push(payload.hash)
        if (payload.type === 'remove')
            state.selected_torrents.splice(
                state.selected_torrents.indexOf(payload.hash),
                1
            )
    },
    RESET_SELECTED: state => {
        state.selected_torrents = []
    },
    TOGGLE_THEME(state) {
        state.webuiSettings.darkTheme = !state.webuiSettings.darkTheme
    },
    LOGOUT: state => {
        qbit.logout()
        state.authenticated = false
    },
    LOGIN: async (state, payload) => {
        state.authenticated = payload
    },
    updateMainData: async state => {
        const rid = state.rid ? state.rid : undefined
        const res = await qbit.getMainData(rid)

        // status
        state.status = new Status(res.data.server_state, res.data.tags)

        // graph
        state.download_data.splice(0, 1)
        state.download_data.push(state.status.dlspeedRaw)
        state.upload_data.splice(0, 1)
        state.upload_data.push(state.status.upspeedRaw)

        let { data } = await qbit.getTorrents(state.sort_options)
        if (state.sort_options.tracker !== null)
            data = data.filter(d => getHostName(d.tracker) != state.sort_options.tracker)

        // torrents
        state.torrents = []
        for (const [key, value] of Object.entries(data)) {
            state.torrents.push(new Torrent({ hash: key, ...value }))
        }
    },
    FETCH_SETTINGS: async state => {
        const { data } = await qbit.getAppPreferences()
        state.settings = data
    },
    UPDATE_SORT_OPTIONS: (state, payload) => {
        state.sort_options.sort = payload.name ? payload.name : state.sort_options.sort
        state.sort_options.reverse = payload.reverse ? payload.reverse : state.sort_options.reverse
        state.sort_options.hashes = payload.hashes ? payload.hashes : state.sort_options.hashes
        state.sort_options.filter = payload.filter ? payload.filter : state.sort_options.filter
        state.sort_options.category =
            payload.category !== null ? payload.category : null
        state.sort_options.tracker = 
            payload.tracker !== null ? payload.tracker : null
    },
    FETCH_CATEGORIES: async state => {
        const { data } = await qbit.getCategories()
        state.categories = data
    },
    SET_CURRENT_ITEM_COUNT: (state, count) => (state.filteredTorrentsCount = count),
    FETCH_TRACKERS: async state => {
        if (!state.torrents) await this.updateMainData()
        state.trackers = state.torrents.map(t => t.tracker)
            .map(url => getHostName(url))
            .filter((domain, index, self) => index === self.indexOf(domain) && domain)
            .sort()
    }
}
