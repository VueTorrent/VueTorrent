<script setup lang="ts">
import { ref } from 'vue'

import { VForm } from 'vuetify/components/VForm'
import { useDialog, useI18nUtils } from '@/composables'

const props = defineProps<{
  guid: string
}>()

const { t } = useI18nUtils()
const { isOpened } = useDialog(props.guid)

const form = ref<VForm>()
const isFormValid = ref(false)
const settings = ref('')

const rules = [
  (v: string) => !!v || t('dialogs.importSettings.required'),
  (v: string) => {
    try {
      JSON.parse(v)
    } catch (_) {
      return t('dialogs.importSettings.valid')
    }

    return true
  },
]

function close() {
  isOpened.value = false
}

async function submit() {
  await form.value?.validate()
  if (!isFormValid.value) return

  window.localStorage.setItem('vuetorrent_webuiSettings', settings.value)
  location.reload()
}
</script>

<template>
  <v-dialog v-model="isOpened" max-width="500">
    <v-card :title="$t('dialogs.importSettings.title')">
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent @keydown.enter.prevent="submit">
          <v-textarea v-model="settings" clearable :rules="rules" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn color="accent" :disabled="!isFormValid" @click="submit">
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
