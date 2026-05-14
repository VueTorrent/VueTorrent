<script setup lang="ts">
import { computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18nUtils } from '@/composables'
import qbit from '@/services/qbit'
import { usePreferenceStore } from '@/stores'

const { t } = useI18nUtils()
const preferenceStore = usePreferenceStore()

const apiKey = computed(() => preferenceStore.preferences?.web_ui_api_key ?? '')
const hasKey = computed(() => apiKey.value.length > 0)

const maskedKey = computed(() => {
  const key = apiKey.value
  if (!key) return ''
  if (key.length <= 5) return '*'.repeat(key.length)
  return '*'.repeat(key.length - 5) + key.slice(-5)
})

async function copyKey() {
  if (!hasKey.value) return
  try {
    await navigator.clipboard.writeText(apiKey.value)
    toast.success(t('toast.copy.success'))
  } catch {
    toast.error(t('toast.copy.error'))
  }
}

async function regenerateKey() {
  try {
    const newKey = await qbit.rotateAPIKey()
    if (preferenceStore.preferences) {
      preferenceStore.preferences.web_ui_api_key = newKey
    }
    toast.success(t('settings.webUI.apiKey.regenerated'))
  } catch {
    toast.error(t('settings.webUI.apiKey.regenerateError'))
  }
}

async function deleteKey() {
  try {
    await qbit.deleteAPIKey()
    if (preferenceStore.preferences) {
      preferenceStore.preferences.web_ui_api_key = ''
    }
    toast.success(t('settings.webUI.apiKey.deleted'))
  } catch {
    toast.error(t('settings.webUI.apiKey.deleteError'))
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6">
      <div class="my-2">
        <div>{{ t('settings.webUI.apiKey.label') }}</div>
        <v-text-field class="mt-2" :model-value="hasKey ? maskedKey : t('settings.webUI.apiKey.empty')" readonly hide-details />
      </div>
    </v-col>
    <v-col cols="12" sm="6" align-self="end" class="d-flex align-center ga-2 flex-wrap pb-4">
      <v-btn :disabled="!hasKey" prepend-icon="mdi-content-copy" @click="copyKey">
        {{ t('settings.webUI.apiKey.copy') }}
      </v-btn>
      <v-btn color="primary" prepend-icon="mdi-refresh" @click="regenerateKey">
        {{ t('settings.webUI.apiKey.regenerate') }}
      </v-btn>
      <v-btn color="error" :disabled="!hasKey" prepend-icon="mdi-delete" @click="deleteKey">
        {{ t('settings.webUI.apiKey.delete') }}
      </v-btn>
    </v-col>
  </v-row>
</template>
