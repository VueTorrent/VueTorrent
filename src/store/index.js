import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'vuetorrent',
  storage: window.localStorage,
  reducer: state => ({
    sort_options: state.sort_options,
    webuiSettings: state.webuiSettings,
    authenticated: state.authenticated
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
    status: {
      status: '',
      downloaded: '',
      uploaded: '',
      dlspeed: '',
      upspeed: '',
      freeDiskSpace: '',
      altSpeed: '',
      dlspeedRaw: '',
      upspeedRaw: '',
      tags: ''
    },
    upload_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    download_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    torrents: [],
    selected_torrents: [],
    authenticated: false,
    sort_options: {
      sort: 'state',
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
      showTrackerFilter: false,
      showSpeedInTitle: false,
      useDeviceDarkMode: true,
      paginationSize: 50,
      torrentHeaders: [
        {
          text: 'Torrent',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Size', align: 'center', value: 'size' },
        { text: 'Progress', align: 'center', value: 'progress' },
        { text: 'Downloaded', align: 'center', value: 'dloaded' },
        { text: 'Download', align: 'center', value: 'dlspeed' },
        { text: 'Upload', align: 'center', value: 'upspeed' },
        { text: 'ETA', align: 'center', value: 'eta' },
        { text: 'Peers', align: 'center', value: 'available_peers' },
        { text: 'Seeds', align: 'center', value: 'available_seeds' },
        { text: 'Status', align: 'center', value: 'state' },
        { text: 'Ratio', align: 'center', value: 'ratio' },
        { text: 'Category', align: 'center', value: 'category' }
      ],
      busyTorrentProperties: [
        { name: 'Size', active: true },
        { name: 'Progress', active: true },
        { name: 'Downloaded', active: true },
        { name: 'Download', active: true },
        { name: 'Upload', active: true },
        { name: 'ETA', active: true },
        { name: 'Peers', active: true },
        { name: 'Seeds', active: true },
        { name: 'Status', active: true },
        { name: 'Ratio', active: true },
        { name: 'Category', active: true },
        { name: 'Tags', active: true },
        { name: 'AddedOn', active: false },
        { name: 'Availability', active: false }
      ],
      doneTorrentProperties: [
        { name: 'Size', active: true },
        { name: 'Progress', active: true },
        { name: 'Downloaded', active: true },
        { name: 'Download', active: true },
        { name: 'Upload', active: true },
        { name: 'ETA', active: true },
        { name: 'Peers', active: true },
        { name: 'Seeds', active: true },
        { name: 'Status', active: true },
        { name: 'Ratio', active: true },
        { name: 'Category', active: true },
        { name: 'Tags', active: true },
        { name: 'AddedOn', active: false },
        { name: 'Availability', active: false }
      ]
    },
    categories: [],
    trackers: [],
    filteredTorrentsCount: 0,
    latestSelectedTorrent: null,
    selectMode: false,
    searchPlugins: []
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
