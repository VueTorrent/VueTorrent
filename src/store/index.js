import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
    key: 'vuetorrent',
    storage: window.localStorage,
    reducer: state => ({
        sort_options: state.sort_options,
        webuiSettings: state.webuiSettings,
        authenticated: state.authenticated,
        torrents: state.torrents
    })
})

Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        version: 0,
        intervals: [],
        status: null,
        upload_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        download_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        torrents: [],
        selected_torrents: [],
        authenticated: false,
        sort_options: {
            sort: 'name',
            reverse: false,
            hashes: [],
            filter: null
        },
        rid: 0,
        pasteUrl: null,
        modals: [],
        settings: {},
        webuiSettings: {
            darkTheme: false,
            showFreeSpace: true,
            showSpeedGraph: true,
            showSessionStat: true,
            showCurrentSpeed: true,
            showGlobalRemoveResumePause: true
        },
        categories: [],
        filteredTorrentsCount: 0
    },
    getters: {
        ...getters
    },

    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
})
