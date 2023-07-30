<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSettings = () => {
  router.push({ name: 'settings' })
}
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <v-btn color="primary" @click="goToSettings">Go to settings</v-btn>
  </div>
</template>

<style scoped>

</style>