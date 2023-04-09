<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

authStore.logout().then(() => {
  router.push('/login')
})

definePage({
  path: '/logout',
  name: 'Logout'
})
</script>

<template>How did you get here?</template>
