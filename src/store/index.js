import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

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
      sort: null,
      reverse: true,
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
      title: 'Default',
      useDeviceDarkMode: true,
      rightDrawer: false,
      paginationSize: 15,
      busyTorrentProperties: [
        { name: 'Size', active: true },
        { name: 'Progress', active: true },
        { name: 'Download', active: true },
        { name: 'Upload', active: true },
        { name: 'Downloaded', active: true },
        { name: 'Uploaded', active: true },
        { name: 'ETA', active: true },
        { name: 'Peers', active: true },
        { name: 'Seeds', active: true },
        { name: 'Status', active: true },
        { name: 'Ratio', active: true },
        { name: 'Category', active: true },
        { name: 'Tags', active: true },
        { name: 'AddedOn', active: true },
        { name: 'Availability', active: true }
      ],
      doneTorrentProperties: [
        { name: 'Size', active: true },
        { name: 'Progress', active: true },
        { name: 'Download', active: true },
        { name: 'Upload', active: true },
        { name: 'Downloaded', active: true },
        { name: 'Uploaded', active: true },
        { name: 'ETA', active: true },
        { name: 'Peers', active: true },
        { name: 'Seeds', active: true },
        { name: 'Status', active: true },
        { name: 'Ratio', active: true },
        { name: 'Category', active: true },
        { name: 'Tags', active: true },
        { name: 'AddedOn', active: true },
        { name: 'Availability', active: true }
      ]
    },
    categories: [],
    trackers: [],
    tags: [],
    filteredTorrentsCount: 0,
    latestSelectedTorrent: null,
    selectMode: false,
    searchPlugins: []
  },
  actions: {
    ...actions
  },
  getters: {
    ...getters
  },
  mutations: {
    ...mutations
  }
})
