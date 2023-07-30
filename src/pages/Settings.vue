<script setup lang="ts">
import { useRouter } from 'vue-router'
import {useI18n} from 'vue-i18n'
import { LOCALES } from '@/lang/locales.ts'

const router = useRouter()
const { t, locale } = useI18n()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div>
    <h1>{{ t('settings.title') }}</h1>
    <v-btn color="primary" @click="goBack">{{ t('settings.goBack') }}</v-btn>

    <v-select v-model="locale" :label="t('settings.language')" :items="LOCALES" />
  </div>
</template>

<style scoped>

</style>