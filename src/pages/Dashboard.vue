<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const goToSettings = () => {
  router.push({ name: 'settings' })
}
</script>

<template>
  <div>
    <h1>{{ t('dashboard.title') }}</h1>
    <v-btn color="primary" @click="goToSettings">{{ t('dashboard.goToSettings') }}</v-btn>
  </div>
</template>

<style scoped>

</style>