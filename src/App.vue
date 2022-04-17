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
    this.checkAuthentication()
  },
  methods: {
    async checkAuthentication() {
      const authenticated = await qbit.getAuthenticationStatus()
      if (authenticated) {
        this.$store.commit('LOGIN', true)
        this.$store.commit('updateMainData')

        return
      }

      this.$store.commit('LOGIN', false)
      if (!this.onLoginPage) return this.$router.push('login')
    }
  }
}
</script>
