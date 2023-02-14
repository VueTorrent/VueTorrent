import Vue from 'vue'
import qbit from '@/services/qbit'
import { i18n } from '@/plugins/i18n'
import type { StoreState } from '@/types/vuetorrent'
import type { Store } from 'vuex'
import type { LoginPayload } from '@/types/qbit/payloads'

export default {
  INIT_INTERVALS: async (store: Store<StoreState>) => {
    store.state.intervals[0] = setInterval(() => {
      store.commit('updateMainData')
    }, 2000)
  },
  LOGIN: async (store: Store<StoreState>, payload: LoginPayload) => {
    const res = await qbit.login(payload)
    console.log(res)
    if (res === 'Ok.') {
      Vue.$toast.success(i18n.t('toast.loginSuccess').toString())
      store.commit('LOGIN', true)
      store.commit('updateMainData')
      await store.dispatch('FETCH_SETTINGS')
      store.commit('FETCH_CATEGORIES')
      store.commit('FETCH_TAGS')

      return true
    }
    Vue.$toast.error(i18n.t('toast.loginFailed').toString())

    return false
  },
  FETCH_SETTINGS: async (store: Store<StoreState>) => {
    const data = await qbit.getAppPreferences()
    store.commit('FETCH_SETTINGS', data)

    return data
  }
}
