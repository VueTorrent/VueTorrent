<script setup lang="ts">
import { useTheme } from 'vuetify'
import { usePreferredDark } from '@vueuse/core'
import Navbar from './components/Navbar/Navbar.vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router/auto'
import { useRoute } from 'vue-router'

// composables
const theme = useTheme()
const prefersDark = usePreferredDark()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

if (prefersDark.value) {
  theme.global.name.value = 'dark'
} else {
  theme.global.name.value = 'light'
}

authStore.checkAuth().then(async (res) => {
  await router.isReady()
  // if not logged in
  if (!res) return router.push('/login')
  // if logged in but trying to go to login page
  if (route.name == 'Login') return router.push({ name: 'Dashboard' })
  // go to route
  router.push(route.path)
})
</script>

<template>
  <VApp>
    <Navbar v-if="authStore.isAuthenticated" />
    <VMain>
      <VContainer fluid>
        <Suspense>
          <RouterView />
        </Suspense>
      </VContainer>
    </VMain>
  </VApp>
</template>
