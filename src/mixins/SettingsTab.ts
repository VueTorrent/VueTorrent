import { mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import qbit from '@/services/qbit'
import { AppPreferences } from '@/types/qbit/models'

export default defineComponent({
  name: 'SettingsTab',
  computed: {
    ...mapGetters(['getSettings']),
    settings(): AppPreferences {
      return this.getSettings()
    }
  },
  methods: {
    async saveSettings() {
      await qbit.setPreferences(this.settings)
      this.$toast.success(this.$t('toast.settingsSaved').toString())
      await this.$store.dispatch('FETCH_SETTINGS')
      await this.$store.commit('SET_LANGUAGE')
      this.close()

      if (!this.settings.alternative_webui_enabled) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const registration of registrations) {
          await registration.unregister()
        }
      }
    }
  }
})
