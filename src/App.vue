<template>
  <v-app>
    <component
      :is="modal.component"
      v-for="modal in modals"
      :key="modal.guid"
      v-bind="{ guid: modal.guid, ...modal.props }"
    />
    <Navbar v-if="isAuthenticated" />
    <v-main class="background">
      <router-view />
    </v-main>
    
    <v-dialog
      v-model="networkErrDialog"
      persistent
      width="400"
      content-class="noselect"
    >
      <v-card color="primary">
        <v-card-text>
          <h4 class="pt-2 white--text">
            Waiting for server response
          </h4>
          <v-progress-linear
            indeterminate
            color="primarytext"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
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
  data() {
    return {
      networkErrDialog: false
    }
  },
  computed: {
    ...mapState(['rid', 'mainData', 'preferences', 'modals', 'webuiSettings']),
    ...mapGetters(['getAuthenticated']),
    isAuthenticated() {
      return this.getAuthenticated()
    },
    onLoginPage() {
      return this.$router.currentRoute.name.includes('login')
    }
  },
  watch: {
    '$store.state.networkErrCode'(e) {
      switch (e) {
        case 0:
          this.networkErrDialog = false
          break
        case 403:
          this.$store.commit('LOGOUT')
          this.$router.push('/login')
          this.networkErrDialog = false
          
          break
        default:
          this.networkErrDialog = true
      }
      //this.$store.state.networkErrCode = 0
    }
  },
  created() {
    this.$store.commit('SET_APP_VERSION', version)
    this.checkDeviceDarkTheme()
    this.checkAuthenticated()
  },
  methods: {
    async checkAuthenticated() {
      const res = await qbit.login()
      const authenticated = res === 'Ok.'
      this.$store.commit('LOGIN', authenticated)
      this.$store.commit('updateMainData')
      if (!authenticated && !this.onLoginPage) return this.$router.push('login')
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
