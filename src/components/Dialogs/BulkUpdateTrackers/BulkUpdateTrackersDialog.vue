<script setup lang="ts">
import { useSorted } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { VForm } from 'vuetify/components/VForm'
import TrackersEditField from './TrackersEditField.vue'
import { useDialog, useI18nUtils } from '@/composables'
import { comparators } from '@/helpers'
import { useTrackerStore } from '@/stores'

const props = defineProps<{
  guid: string
  hashes: string[]
}>()

const isFormValid = ref(false)
const loading = ref(false)
const formData = reactive({
  add: '',
  edit: [] as [string, string][],
  remove: '',
})

const allTrackers = useSorted(() => [...new Set(props.hashes.flatMap(hash => trackerStore.torrentTrackers.get(hash) ?? []))], comparators.text.asc)

const { t } = useI18nUtils()
const { isOpened } = useDialog(props.guid)
const trackerStore = useTrackerStore()

function close() {
  isOpened.value = false
}

async function submit() {
  loading.value = true
  await trackerStore
    .bulkUpdateTrackers(props.hashes, {
      add: formData.add,
      replace: formData.edit,
      remove: formData.remove.split('\n').filter(url => url.length),
    })
    .then(res => {
      if (res.rejected.length > 0) {
        loading.value = false
        const reason = [...new Set(res.rejected.map(String))].join('\n')
        toast.error(t('dialogs.bulkEditTrackers.edit.result', { rejected: res.rejected.length, total: res.total, reason }))
        return
      }
      close()
    })
}
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.bulkEditTrackers.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-list>
            <v-list-subheader :title="t('dialogs.bulkEditTrackers.add')" />
            <v-list-item>
              <v-textarea v-model="formData.add" :placeholder="'https://example1.com/announce\nhttps://example2.com/announce'" />
            </v-list-item>

            <v-list-subheader :title="t('dialogs.bulkEditTrackers.edit.title')" />
            <TrackersEditField v-model="formData.edit" :all-trackers="allTrackers" />

            <v-list-subheader :title="t('dialogs.bulkEditTrackers.remove')" />
            <v-list-item>
              <v-textarea v-model="formData.remove" :placeholder="'https://example1.com/announce\nhttps://example2.com/announce'" />
            </v-list-item>
          </v-list>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="close">
          {{ t('common.cancel') }}
        </v-btn>
        <v-btn color="accent" :disabled="!isFormValid" :loading="loading" @click="submit">
          {{ t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
