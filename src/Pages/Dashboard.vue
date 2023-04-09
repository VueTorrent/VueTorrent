<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

definePage({
  path: '/dashboard',
  name: 'Dashboard'
})

const authStore = useAuthStore()
const router = useRouter()

authStore.checkAuth().then((res) => {
  if (!res) {
    router.push('/login')
  }
})
</script>

<template>the best dashboard ever</template>
