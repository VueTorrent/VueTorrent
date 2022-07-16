import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import Vue from 'vue'
export default {
  computed: {
    ...mapGetters(['getSettings']),
    settings() {
      return this.getSettings()
    }
  },
  methods: {
    async saveSettings() {
      qbit.setPreferences(this.getSettings()).then(() => {
        Vue.$toast.success(this.$t('toast.settingsSaved'))
      })
      await this.$store.dispatch('FETCH_SETTINGS')
      await this.$store.commit('SET_LANGUAGE')
      this.close()
      if (!this.settings.alternative_webui_enabled) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
          for (const registration of registrations) {
            registration.unregister()
          }
        })
      }
    }
  }
}
