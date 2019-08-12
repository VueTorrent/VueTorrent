import Vue from 'vue'
import Vuex from 'vuex'

import qbit from './qbit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    intervals: [],
    stats: {
      status: 'init',
      dlspeed: '6 Mbps',
      upspeed: '1 Mbps',
      downloaded: '6.95 Gb',
      uploaded: '1014 Mb',
    },
    upload_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    download_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    torrents: [],
    init_torrents: false,
    selected_torrents: [],
    network_error: false,
    snackbar_error: false,
    error_msg: '',
    snackbar: false,
    succes_msg: '',
    authenticated: false,
    loading: false,
    sort_options: { sort: 'name', reverse: false },
  },
  getters: {
    CONTAINS_TORRENT: (state) => (hash) => state.selected_torrents.includes(hash),
  },
  mutations: {
    REFRESH_TORRENTS: async (state) => {
      const torrents = await qbit.getAll(state.sort_options).catch(() => {
        state.network_error = true
        state.error_msg = 'Lost connection with server, reload page'
        state.snackbar_error = true
      })
      state.torrents = torrents.map((a) => ({ ...a }))
      state.init_torrents = true
    },
    REFRESH_SESSION_STATS: async (state) => {
      const _stats = await qbit.get_sessions_stats()
      // push in array for graph
      state.download_data.splice(0, 1)
      if (_stats.dlspeed.indexOf('KB' > -1)) {
        state.download_data.push(
          _stats.dlspeed.substring(0, _stats.dlspeed.indexOf(' ')) / 1000,
        )
      } else {
        state.download_data.push(
          _stats.dlspeed(0, _stats.dlspeed.indexOf(' ')),
        )
      }
      state.upload_data.splice(0, 1)
      if (_stats.upspeed.indexOf('KB' > -1)) {
        state.upload_data.push(
          _stats.upspeed.substring(0, _stats.upspeed.indexOf(' ')) / 1000,
        )
      } else {
        state.upload_data.push(
          _stats.upspeed.substring(0, _stats.upspeed.indexOf(' ')),
        )
      }
      state.stats = _stats
    },
    CLEAR_INTERVALS: (state) => {
      if (state.intervals.length > 1) { state.intervals.forEach((el) => clearInterval(el)) }
    },
    ADD_SELECTED: (state, payload) => {
      state.selected_torrents.push(payload)
    },
    REMOVE_SELECTED: (state, payload) => {
      state.selected_torrents.splice(
        state.selected_torrents.indexOf(payload),
        1,
      )
    },
    RESET_SELECTED: (state) => {
      state.selected_torrents = []
    },
    PAUSE_TORRENTS: async (state) => {
      let res
      if (state.selected_torrents.length === 0) {
        res = await qbit.pause_all()
      } else {
        res = await qbit.pause_torrents(state.selected_torrents)
      }
    },
    RESUME_TORRENTS: async (state) => {
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
    REMOVE_TORRENTS: async (state) => {
      if (state.selected_torrents.length !== 0) {
        const res = await qbit.remove_torrents(state.selected_torrents)
      }
    },
    LOGIN: async (state, payload) => {
      const res = await qbit.login(payload)
      if (res == 'timeout') {
        state.loading = false
        state.snackbar_error = true
        state.error_msg = 'Express server timed out!'
        setTimeout(() => {
          state.snackbar_error = false
        }, 4000)
      } else {
        switch (res) {
          case 'No such user':
            state.snackbar_error = true
            state.error_msg = 'No such user!'
            setTimeout(() => {
              state.snackbar_error = false
            }, 4000)
            break
          case 'Wrong password!':
            state.snackbar_error = true
            state.error_msg = 'Wrong password!'
            setTimeout(() => {
              state.snackbar_error = false
            }, 4000)
            break
          case 'SUCCES':
            state.snackbar = true
            state.succes_msg = 'Succesfully logged in!'
            state.authenticated = true
            setTimeout(() => {
              state.snackbar = false
            }, 4000)
            break
          default:
            state.snackbar_error = true
            state.error_msg = 'Something went wrong'
            setTimeout(() => {
              state.snackbar_error = false
            }, 4000)
            break
        }
        state.loading = false
      }
    },
  },
  actions: {
    REFRESH_TORRENTS: (context) => {
      context.state.intervals[1] = setInterval(async () => {
        context.commit('REFRESH_TORRENTS')
        if (context.state.network_error) {
          context.commit('CLEAR_INTERVALS')
        }
      }, 2000)
    },
    REFRESH_SESSION_STATS: (context) => {
      context.state.intervals[0] = setInterval(async () => {
        context.commit('REFRESH_SESSION_STATS')
      }, 1000)
    },
    ADD_SELECTED: (context, payload) => {
      context.commit('ADD_SELECTED', payload)
    },
    REMOVE_SELECTED: (context, payload) => {
      context.commit('REMOVE_SELECTED', payload)
    },
    RESET_SELECTED: (context) => {
      context.commit('RESET_SELECTED')
    },
    PAUSE_TORRENTS: (context) => {
      context.commit('PAUSE_TORRENTS')
    },
    RESUME_TORRENTS: (context) => {
      context.commit('RESUME_TORRENTS')
    },
    ADD_TORRENT: (context, payload) => {
      context.commit('ADD_TORRENT', payload)
    },
    REMOVE_TORRENTS: (context) => {
      context.commit('REMOVE_TORRENTS')
    },
    LOGIN: (context, payload) => {
      context.commit('LOGIN', payload)
    },
  },
})
