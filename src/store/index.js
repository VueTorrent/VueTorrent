import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import Torrent from '../models/torrent'
import Status from '../models/Status'
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
        status: null,
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
            settingsmodal: false,
            torrentdetailmodal: false
        },
        settings : {},
        selectedDetailTorrent: null
    },
    getters: {
        containsTorrent: state => hash =>
            state.selected_torrents.includes(hash),
        getTheme: state => () => state.darkTheme,
        getModalState: state => name => state.modals[name.toLowerCase()],
        getSettings: state => () => state.settings,
        getStatus: state => () => state.status,
        getTorrent: state => hash => state.torrents.filter(el => el.hash === hash)[0]
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
        TOGGLE_THEME(state) {
            state.darkTheme = !state.darkTheme
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
            const { data } = await qbit.getMainData(rid)

            // torrents
            state.torrents = []
            for (const [key, value] of Object.entries(data.torrents)) {
                state.torrents.push(new Torrent({ hash: key, ...value }))
            }

            // status
            state.status = new Status(data.server_state)

            // graph
            state.download_data.splice(0, 1)
            state.download_data.push(state.status.dlspeedRaw)
            state.upload_data.splice(0, 1)
            state.upload_data.push(state.status.upspeedRaw)
        },
        SET_SETTINGS: async state => {
            const {data} = await qbit.getAppPreferences()
            state.settings.savePath = data.save_path;
        },
        SET_SELECTED_TORRENT_DETAIL: (state, hash) => {
            state.selectedDetailTorrent =  hash
        }   
    },
    actions: {
        INIT_INTERVALS: async context => {
            context.state.intervals[0] = setInterval(() => {
                context.commit('updateMainData')
            }, 2000)
        },
        LOGIN: async (context, payload) => {
            const res = await qbit.login(payload)
            console.log(res)
            if (res === 'Ok.') {
                Vue.$toast.success('Successfully logged in!')
                context.commit('LOGIN', true)
                context.commit('updateMainData')   
                context.commit('SET_SETTINGS')   
                return true;
                
            }
            Vue.$toast.error('Log in failed 😕')
            return false;
        }
    }
})
