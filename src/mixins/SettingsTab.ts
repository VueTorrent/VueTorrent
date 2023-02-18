import { mapState } from 'vuex'
import { defineComponent } from 'vue'
import qbit from '@/services/qbit'

export default defineComponent({
  name: 'SettingsTab',
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    async saveSettings() {
      qbit.setPreferences(this.settings).then(() => {
        this.$toast.success(this.$t('toast.settingsSaved').toString())
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
})
