<script setup lang="ts">
import { useDialog, useI18nUtils } from '@/composables'
import { useTrackerStore } from '@/stores'
import { reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps<{
  guid: string
  hashes: string[]
}>()

const isFormValid = ref(false)
const loading = ref(false)
const formData = reactive({
  add: '',
  edit: '',
  remove: ''
})

const { t } = useI18nUtils()
const { isOpened } = useDialog(props.guid)
const trackerStore = useTrackerStore()

function editRule(value: string) {
  if (value.trim().length === 0) return true

  return (
    value
      .split('\n')
      .map((line, line_no) => {
        if (line.length === 0) return true

        const parts = line.split('|')
        if (parts.length < 2) return t('dialogs.bulkEditTrackers.rules.not_enough_urls', { line_no })
        if (parts.length > 2) return t('dialogs.bulkEditTrackers.rules.too_many_urls', { line_no })

        if (parts[0].trim().length === 0 || parts[1].trim().length === 0) return t('dialogs.bulkEditTrackers.rules.empty_url', { line_no })

        return true
      })
      .find(v => typeof v === 'string') ?? true
  )
}

function close() {
  isOpened.value = false
}

async function submit() {
  const trackersToReplace: [string, string][] = formData.edit
    .split('\n')
    .map(line => {
      const split = line.split('|')
      return split.length === 2 ? (split as [string, string]) : null
    })
    .filter(res => res !== null)
  const trackersToRemove = formData.remove.split('\n').filter(url => url.length)

  loading.value = true
  trackerStore
    .bulkUpdateTrackers(props.hashes, {
      add: formData.add,
      replace: trackersToReplace,
      remove: trackersToRemove
    })
    .then(close, () => {
      loading.value = false
      toast.error('Failed to update trackers')
    })
}
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ $t('dialogs.bulkEditTrackers.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form">
          <v-list>
            <v-list-item>
              <v-textarea v-model="formData.add" :label="$t('dialogs.bulkEditTrackers.add')" :placeholder="'https://example1.com/announce\nhttps://example2.com/announce'" />
            </v-list-item>
            <v-list-item>
              <v-textarea
                v-model="formData.edit"
                :rules="[editRule]"
                :label="$t('dialogs.bulkEditTrackers.edit')"
                :placeholder="'https://old_domain1.com/announce|https://new_domain1.com/announce\nhttps://old_domain2.com/announce|https://new_domain2.com/announce'" />
            </v-list-item>
            <v-list-item>
              <v-textarea v-model="formData.remove" :label="$t('dialogs.bulkEditTrackers.remove')" :placeholder="'https://example1.com/announce\nhttps://example2.com/announce'" />
            </v-list-item>
          </v-list>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="accent" :disabled="!isFormValid" :loading="loading" @click="submit">{{ $t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
