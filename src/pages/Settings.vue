<script setup lang="ts">
import { useRouter } from 'vue-router'
import {useI18n} from 'vue-i18n'
import { LOCALES } from '@/lang/locales.ts'
import { toast } from 'vue3-toastify'

const router = useRouter()
const { t, locale } = useI18n()

const saveSettings = () => {
  toast.success(t('settings.saveSuccess'))
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <v-card>
    <v-card-title>{{ t('settings.title') }}</v-card-title>
    <v-card-text>
      <v-select v-model="locale" :label="t('settings.language')" :items="LOCALES" />
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="goBack">{{ t('settings.goBack') }}</v-btn>
      <v-btn color="success" @click="saveSettings">{{ t('settings.save') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>