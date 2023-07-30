<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div>
    <h1>Settings</h1>
    <v-btn color="primary" @click="goBack">Go back</v-btn>
  </div>
</template>

<style scoped>

</style>