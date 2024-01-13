<script setup lang="ts">
import { useDialog } from '@/composables'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  guid: string
}>()

const { t } = useI18n()
const { isOpened } = useDialog(props.guid)

const isFormValid = ref(false)
const settings = ref('')

const rules = [
  (v: string) => {
    if (!v) return t('dialogs.importSettings.required')

    try {
      const settings = JSON.parse(v)

      // naive 1 key check
      if (!settings.darkMode) return t('dialogs.importSettings.required')
    } catch (e) {
      return t('dialogs.importSettings.valid')
    }

    return true
  }
]

function close() {
  isOpened.value = false
}

async function submit() {
  window.localStorage.setItem('vuetorrent_webuiSettings', settings.value)
  window.location.reload()
  close()
}
</script>

<template>
  <v-dialog v-model="isOpened" max-width="500">
    <v-card :title="$t('dialogs.importSettings.title')">
      <v-card-text>
        <v-form v-model="isFormValid" @submit.prevent @keydown.enter.prevent="submit">
          <v-textarea v-model="settings" clearable auto-grow :rules="rules" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="accent" :disabled="!isFormValid" @click="submit">{{ $t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
