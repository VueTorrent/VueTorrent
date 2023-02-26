import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import type { StoreState } from '@/types/vuetorrent'
import { Status } from '@/models'
import { TitleOptions } from '@/enums/vuetorrent'

const vuexPersist = new VuexPersist<StoreState>({
  key: 'vuetorrent',
  storage: window.localStorage,
  reducer: state => ({
    sort_options: state.sort_options,
    webuiSettings: state.webuiSettings,
    authenticated: state.authenticated
  })
})

Vue.use(Vuex)

// noinspection DuplicatedCode
const propertiesTemplate = [
  { name: 'Size', active: true },
  { name: 'Progress', active: true },
  { name: 'Download', active: true },
  { name: 'Upload', active: true },
  { name: 'Downloaded', active: true },
  { name: 'Directory', active: false },
  { name: 'Uploaded', active: true },
  { name: 'ETA', active: true },
  { name: 'Peers', active: true },
  { name: 'Seeds', active: true },
  { name: 'Status', active: true },
  { name: 'Ratio', active: true },
  { name: 'Tracker', active: false },
  { name: 'Category', active: true },
  { name: 'Tags', active: true },
  { name: 'AddedOn', active: true },
  { name: 'Availability', active: true },
  { name: 'LastActivity', active: false },
  { name: 'CompletedOn', active: false },
  { name: 'GlobalSpeed', active: false },
  { name: 'GlobalVolume', active: false }
]

export default new Vuex.Store<StoreState>({
  plugins: [vuexPersist.plugin],
  state: {
    authenticated: false,
    categories: [],
    dashboard: {
      currentPage: 1,
      searchFilter: ''
    },
    download_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    filteredTorrentsCount: 0,
    intervals: [],
    latestSelectedTorrent: -1,
    modals: [],
    rid: 0,
    rss: {
      feeds: [],
      rules: []
    },
    searchPlugins: [],
    selectMode: false,
    selected_torrents: [],
    settings: null,
    sort_options: {
      isCustomSortEnabled: false,
      sort: 'priority',
      reverse: false,
      hashes: [],
      filter: null,
      category: null,
      tag: null,
      tracker: null
    },
    status: {} as Status,
    tags: [],
    torrents: [],
    trackers: [],
    upload_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    version: '',
    webuiSettings: {
      lang: 'en',
      darkTheme: false,
      showFreeSpace: true,
      showSpeedGraph: true,
      showSessionStat: true,
      showAlltimeStat: true,
      showCurrentSpeed: true,
      showTrackerFilter: false,
      showSpeedInTitle: false,
      deleteWithFiles: false,
      title: TitleOptions.DEFAULT,
      rightDrawer: false,
      topPagination: false,
      paginationSize: 15,
      dateFormat: 'DD/MM/YYYY, HH:mm:ss',
      openSideBarOnStart: true,
      busyTorrentProperties: JSON.parse(JSON.stringify(propertiesTemplate)),
      doneTorrentProperties: JSON.parse(JSON.stringify(propertiesTemplate))
    }
  },
  // @ts-expect-error
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
