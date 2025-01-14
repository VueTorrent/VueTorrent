<script setup lang="ts">
import ResultList from '@/components/Dialogs/BulkRenameFiles/ResultList.vue'
import { useDialog, useI18nUtils } from '@/composables'
import { useContentStore } from '@/stores'
import { TorrentFile } from '@/types/qbit/models'
import { onMounted, ref } from 'vue'
import OptionForm from './OptionForm.vue'

const props = defineProps<{
  guid: string
  hashes: string[]
}>()

type TorrentFileWithHash = TorrentFile & { hash: string }

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const contentStore = useContentStore()

const loading = ref(false)
const files = ref<TorrentFileWithHash[]>([])

function submit() {
  loading.value = true

  // TODO

  loading.value = false
  close()
}

function close() {
  isOpened.value = false
}

onMounted(() => {
  Promise.all(props.hashes.map(hash => contentStore.fetchFiles(hash).then(files => files.map(file => ({ hash, ...file })))))
    .then(torrentFiles => (files.value = torrentFiles.flat()))
})
</script>

<template>
  <v-dialog v-model="isOpened" fullscreen>
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.bulkRenameFiles.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" lg="4">
            <OptionForm />
          </v-col>

          <v-col cols="12" md="6" lg="8">
            <ResultList />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn :loading="loading" @click="close">{{ t('common.close') }}</v-btn>
        <v-btn :loading="loading" @click="submit">{{ t('dialogs.bulkRenameFiles.run') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
