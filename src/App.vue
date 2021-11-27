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
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/Navbar/Navbar.vue'
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
    },
    onLoginPage() {
      return this.$router.currentRoute.name.includes('login')
    }
  },
  created() {
    this.$store.commit('SET_APP_VERSION', process.env['APPLICATION_VERSION'])
    this.$store.commit('SET_LANGUAGE')
    const needsAuth = this.needsAuthentication()
    if (needsAuth) {
      this.checkAuthenticated()
    }
  },
  methods: {
    async needsAuthentication() {
      const res = qbit.getAuthenticationStatus()
      const forbidden = res === 'Forbidden'
      if (forbidden) {
        return true
      } else {
        this.$store.commit('LOGIN', true)
        this.$store.commit('updateMainData')
      }

      return false
    },
    async checkAuthenticated() {
      const res = await qbit.login()
      const authenticated = res === 'Ok.'
      this.$store.commit('LOGIN', authenticated)
      this.$store.commit('updateMainData')
      if (!authenticated && !this.onLoginPage) return this.$router.push('login')
    }
  }
}
</script>
