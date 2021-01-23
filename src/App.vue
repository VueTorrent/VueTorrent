<template>
  <v-app>
    <component
      :is="modal.component"
      v-for="modal in modals"
      :key="modal.guid"
      v-bind="{ guid: modal.guid, ...modal.props }"
    />
    <Navbar v-if="isAuthenticated" />
    <v-main class="background" fill-height fill-width>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/Navbar/Navbar.vue'
import { version } from '../package.json'
import qbit from '@/services/qbit'
import { General } from '@/mixins'

export default {
  name: 'App',
  components: { Navbar },
  mixins: [General],
  computed: {
    ...mapState(['rid', 'mainData', 'preferences', 'modals', 'webuiSettings']),
    ...mapGetters(['getAuthenticated']),
    isAuthenticated() {
      return this.getAuthenticated()
    }
  },
  created() {
    this.$store.commit('SET_APP_VERSION', version)
    this.checkDeviceDarkTheme()
    //this.checkAuthenticated()
  },
  methods: {
    async checkAuthenticated() {
      const res = await qbit.login()
      const authenticated = res === 'Ok.'
      this.$store.commit('LOGIN', authenticated)
      if (
        !authenticated &&
                !this.$router.currentRoute.name.includes('login')
      ) this.$router.push('login')
    },
    checkDeviceDarkTheme() {
      if (this.webuiSettings.useDeviceDarkMode) {
        const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        if (darkMediaQuery.matches) {
          setTimeout(() => this.$vuetify.theme.dark = true, 0)
        }
      }
    }
  }
}
</script>
