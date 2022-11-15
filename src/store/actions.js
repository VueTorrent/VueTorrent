import Vue from 'vue'
import qbit from '../services/qbit'
import { i18n } from '../plugins/i18n'

export default {
  INIT_INTERVALS: async context => {
    context.state.intervals[0] = setInterval(() => {
      context.commit('updateMainData')
    }, 2000)
  },
  LOGIN: async (context, payload) => {
    const res = await qbit.login(payload)
    console.log(res)
    if (res === 'Ok.') {
      Vue.$toast.success(i18n.t('toast.loginSuccess'))
      context.commit('LOGIN', true)
      context.commit('updateMainData')
      context.commit('FETCH_SETTINGS')
      context.commit('FETCH_CATEGORIES')

      return true
    }
    Vue.$toast.error(i18n.t('toast.loginFailed'))

    return false
  },
  FETCH_SETTINGS: async context => {
    const { data } = await qbit.getAppPreferences()
    context.commit('FETCH_SETTINGS', data)

    return data
  }
}
