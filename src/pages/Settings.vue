<script setup lang="ts">
import { useRouter } from 'vue-router'
import {useI18n} from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div>
    <h1>{{ t('settings.title') }}</h1>
    <v-btn color="primary" @click="goBack">{{ t('settings.goBack') }}</v-btn>
  </div>
</template>

<style scoped>

</style>