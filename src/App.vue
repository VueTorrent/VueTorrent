<template>
  <v-app>
    <component :is="modal.component" v-for="modal in modals" :key="modal.guid" v-bind="{ guid: modal.guid, ...modal.props }" />
    <Navbar v-if="authenticated" />
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar/Navbar.vue'
import qbit from '@/services/qbit'
import { General } from '@/mixins'
import { getVersion } from './helpers'

export default {
  name: 'App',
  components: { Navbar },
  mixins: [General],
  computed: {
    ...mapState(['modals', 'webuiSettings', 'authenticated']),
    onLoginPage() {
      return this.$router.currentRoute.name?.includes('login')
    }
  },
  created() {
    this.$vuetify.theme.dark = this.webuiSettings.darkTheme
    this.$store.commit('SET_APP_VERSION', getVersion())
    this.$store.commit('SET_LANGUAGE')
    this.checkAuthentication()
    this.blockContextMenu()
  },
  watch: {
    authenticated(newValue) {
      if (newValue) {
        this.$store.dispatch('INIT_INTERVALS')
        this.$store.commit('updateMainData')
        this.$store.dispatch('FETCH_SETTINGS')
      } else {
        this.$store.commit('REMOVE_INTERVALS')
      }
    }
  },
  methods: {
    async checkAuthentication() {
      const authenticated = await qbit.getAuthenticationStatus()
      if (authenticated) {
        this.$store.commit('LOGIN', true)
        this.$store.dispatch('INIT_INTERVALS')
        this.$store.dispatch('FETCH_SETTINGS')
        if (this.onLoginPage) this.redirectOnSuccess()
        return
      }

      // this.$store.commit('LOGIN', false)
      // if (!this.onLoginPage) return this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
    },
    blockContextMenu() {
      document.addEventListener('contextmenu', event => {
        if (!event.target) return
        const nodeName = event.target.nodeName.toLowerCase()
        const nodeType = event.target.getAttribute('type')

        if (['textarea', 'a'].includes(nodeName)) return
        if (nodeName === 'input' && ['text', 'password', 'email', 'number'].includes(nodeType)) return

        event.preventDefault()

        return false
      })
    },
    redirectOnSuccess() {
      const redirect = this.$route.query.redirect
      if (redirect) return this.$router.push(redirect)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
