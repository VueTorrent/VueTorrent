import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import Torrent from '../models/torrent'
import Stat from '../models/sessionStat'
import qbit from '../services/qbit'

const vuexPersist = new VuexPersist({
    key: 'vuetorrent',
    storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        darkTheme: false,
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
        pasteUrl: null,
        modals: {
            addmodal: false,
            deletemodal: false,
            settingsmodal: false
        }
    },
    getters: {
        containsTorrent: state => hash =>
            state.selected_torrents.includes(hash),
        getTheme: state => () => state.darkTheme,
        getModalState: state => name => state.modals[name.toLowerCase()]
    },

    mutations: {
        REMOVE_INTERVALS: state => {
            state.intervals.forEach(el => clearInterval(el))
        },
        TOGGLE_MODAL(state, modal) {
            state.modals[modal.toLowerCase()] = !state.modals[
                modal.toLowerCase()
            ]
        },
        SET_SELECTED: (state, payload) => {
            if(payload.type === 'add')
                state.selected_torrents.push(payload.hash)
                if(payload.type === 'remove')
                state.selected_torrents.splice(
                    state.selected_torrents.indexOf(payload.hash),
                    1
                )

        },
        RESET_SELECTED: state => {
            state.selected_torrents = []
        },
        PAUSE_TORRENTS: async state => {
            if (state.selected_torrents.length === 0) {
                qbit.pause_all()
            } else {
                qbit.pause_torrents(state.selected_torrents)
            }
        },
        RESUME_TORRENTS: async state => {
            if (state.selected_torrents.length === 0) {
                await qbit.resume_all()
            } else {
                await qbit.resume_torrents(state.selected_torrents)
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
                qbit.remove_torrents(state.selected_torrents)
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
                state.torrents.push(new Torrent({ hash: key, ...value }))
            }

            // stats
            state.stats = new Stat(data.server_state)

            // graph

            state.download_data.splice(0, 1)
            if (state.stats.dlspeed.indexOf('KB' > -1)) {
                state.download_data.push(
                    state.stats.dlspeed.substring(
                        0,
                        state.stats.dlspeed.indexOf(' ')
                    ) / 1000
                )
            } else {
                state.download_data.push(
                    state.stats.dlspeed(0, state.stats.dlspeed.indexOf(' '))
                )
            }
            state.upload_data.splice(0, 1)
            if (state.stats.upspeed.indexOf('KB' > -1)) {
                state.upload_data.push(
                    state.stats.upspeed.substring(
                        0,
                        state.stats.upspeed.indexOf(' ')
                    ) / 1000
                )
            } else {
                state.upload_data.push(
                    state.stats.upspeed.substring(
                        0,
                        state.stats.upspeed.indexOf(' ')
                    )
                )
            }
        }
    },
    actions: {
        INIT_INTERVALS: async context => {
            context.state.intervals[0] = setInterval(() => {
                context.commit('updateMainData')
            }, 2000)
        },
        LOGIN: async (context, payload) => {
            context.commit('LOGIN', payload)
            context.commit('updateMainData')
        }
    }
})
