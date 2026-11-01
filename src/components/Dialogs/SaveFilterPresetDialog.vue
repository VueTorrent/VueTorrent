<script setup lang="ts">
import { ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'
import { useDialog, useI18nUtils } from '@/composables'
import { useFilterPresetStore, useTorrentStore } from '@/stores'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const filterPresetStore = useFilterPresetStore()
const torrentStore = useTorrentStore()

const form = ref<VForm>()
const isFormValid = ref(false)
const name = ref(torrentStore.textFilter)
const includeSort = ref(false)

const rules = [(v: string) => !!v.trim() || t('dialogs.saveFilterPreset.required')]

async function submit() {
  await form.value?.validate()
  if (!isFormValid.value) return

  filterPresetStore.saveFilterPreset(name.value, includeSort.value)
  close()
}

function close() {
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" max-width="500">
    <v-card>
      <v-card-title>{{ $t('dialogs.saveFilterPreset.title') }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent>
          <v-text-field v-model="name" :rules="rules" autofocus :label="$t('dialogs.saveFilterPreset.name')" @keydown.enter="submit" />
          <v-checkbox v-model="includeSort" density="compact" hide-details :label="$t('dialogs.saveFilterPreset.includeSort')" />
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
