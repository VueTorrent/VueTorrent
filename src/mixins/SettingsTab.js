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
    saveSettings() {
      qbit.setPreferences(this.getSettings()).then(() => {
        Vue.$toast.success('Settings saved successfully!')
      })
      this.$store.commit('FETCH_SETTINGS')
      this.close()
    }
  }
}
