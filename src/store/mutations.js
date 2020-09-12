import Torrent from '../models/torrent'
import Status from '../models/Status'
import qbit from '../services/qbit'

export default {
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

        const { data } = await qbit.getTorrents(state.sort_options)
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
        state.sort_options.sort = payload.name
        state.sort_options.reverse = payload.reverse
        state.sort_options.hashes = payload.hashes ? payload.hashes : null
        state.sort_options.filter = payload.filter ? payload.filter : null
    },
    FETCH_CATEGORIES: async state => {
        const { data } = await qbit.getCategories()
        state.categories = data
    }
}
