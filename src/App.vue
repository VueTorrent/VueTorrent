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
    self.addEventListener('fetch', function (event) {
      event.respondWith(async function () {
        try {
          var res = await fetch(event.request)
          var cache = await caches.open('cache')
          cache.put(event.request.url, res.clone())

          return res
        } catch (error) {

          return caches.match(event.request)
        }
      }())
    })
    this.$store.commit('SET_APP_VERSION', process.env['APPLICATION_VERSION'])
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
    }
  }
}
</script>
