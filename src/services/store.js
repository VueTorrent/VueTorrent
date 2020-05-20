import Vue from 'vue'
import Vuex from 'vuex'
import { cloneDeep, merge, map, groupBy, sortBy } from 'lodash'
import Torrent from '../models/torrent'
import Stat from '../models/sessionStat'

import qbit from './qbit'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        intervals: [],
        stats: null,
        upload_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        download_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        torrents: [],
        selected_torrents: [],
        authenticated: false,
        loading: false,
        sort_options: { sort: 'name', reverse: false },
        rid: 0,
        mainData: undefined,
        preferences: null,
        pasteUrl: null
    },
    getters: {
        CONTAINS_TORRENT: state => hash =>
            state.selected_torrents.includes(hash)
    },
    mutations: {
       REMOVE_INTERVALS: state => {
            state.intervals.forEach(el => clearInterval(el))
        },
        ADD_SELECTED: (state, payload) => {
            state.selected_torrents.push(payload)
        },
        REMOVE_SELECTED: (state, payload) => {
            state.selected_torrents.splice(
                state.selected_torrents.indexOf(payload),
                1
            )
        },
        RESET_SELECTED: state => {
            state.selected_torrents = []
        },
        PAUSE_TORRENTS: async state => {
            let res
            if (state.selected_torrents.length === 0) {
                res = await qbit.pause_all()
            } else {
                res = await qbit.pause_torrents(state.selected_torrents)
            }
        },
        RESUME_TORRENTS: async state => {
            let res
            if (state.selected_torrents.length === 0) {
                res = await qbit.resume_all()
            } else {
                res = await qbit.resume_torrents(state.selected_torrents)
            }
        },
        ADD_TORRENT: async (state, payload) => {
            const res = await qbit.add_torrent(payload)
            if (res.statusText === 'OK') {
                state.snackbar = true
                state.succes_msg = 'Awesome! You added a new Torrent.'
                setTimeout(() => {
                    state.snackbar = false
                }, 4000)
            } else {
                state.snackbar_error = true
                state.error_msg = 'Something went wrong'
                setTimeout(() => {
                    state.snackbar_error = false
                }, 4000)
            }
        },
        REMOVE_TORRENTS: async state => {
            if (state.selected_torrents.length !== 0) {
                const res = await qbit.remove_torrents(state.selected_torrents)
            }
        },
        LOGIN: async (state, payload) => {
            const res = await qbit.login(payload)
            if (res === 'Ok.') {
                state.loading = false
                Vue.$toast.success('Successfully logged in!')
                state.authenticated = true
            }
        },
        updateMainData: async state => {
            const rid = state.rid ? state.rid : undefined
            const { data } = await qbit.getMainData(rid)

            // torrents
            state.torrents = []
            for (const [key, value] of Object.entries(data.torrents)) {
                state.torrents.push(new Torrent({ id: key, ...value }))
            }

            // download speed
            state.stats = new Stat(data.server_state)
        }
    },
    actions: {
      INIT_INTERVALS: async (context) => {
            context.state.intervals[0] = setInterval(() => {
                context.commit('updateMainData')
            }, 2000)
        },
        LOGIN: async (context, payload) => {
            context.commit('LOGIN', payload)
            context.commit('updateMainData')
        }
    },
    getters: {
      getStats: state => () => state.stats
    }
})
