import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import {Component, Vue} from "vue-property-decorator";
import type {AppPreferences} from "@/types/qbit/models";

@Component({
  computed: mapGetters(['getSettings'])
})
export default class SettingsTab extends Vue {
  getSettings!: () => AppPreferences

  get settings() {
    return this.getSettings()
  }

  close!: () => void

  async saveSettings() {
    qbit.setPreferences(this.getSettings()).then(() => {
      Vue.$toast.success(this.$t('toast.settingsSaved').toString())
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
