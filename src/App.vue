<script setup lang="ts">
import { useTheme } from 'vuetify'
import { usePreferredDark } from '@vueuse/core'
import Navbar from './components/Navbar/Navbar.vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router/auto'

// composables
const theme = useTheme()
const prefersDark = usePreferredDark()
const router = useRouter()

const authStore = useAuthStore()

if (prefersDark.value) {
  theme.global.name.value = 'dark'
} else {
  theme.global.name.value = 'light'
}

authStore.checkAuth().then((res) => {
  if (!res) {
    router.push('/login')
  } else {
    router.push('/dashboard')
  }
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
