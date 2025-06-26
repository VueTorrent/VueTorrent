<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useDialog } from '@/composables'
import { useMaindataStore, useTorrentStore } from '@/stores'

const props = defineProps<{
  guid: string
  hashes: string[]
  mode: 'download' | 'upload'
}>()

const { isOpened } = useDialog(props.guid)
const maindataStore = useMaindataStore()
const torrentStore = useTorrentStore()

const isFormValid = ref(false)
const value = ref(0)

function close() {
  isOpened.value = false
}

async function submit() {
  const formattedValue = Math.max(0, value.value) * 1000
  switch (props.mode) {
    case 'download':
      await maindataStore.setDownloadLimit(formattedValue, props.hashes)
      break
    case 'upload':
      await maindataStore.setUploadLimit(formattedValue, props.hashes)
      break
  }
  close()
}

onBeforeMount(() => {
  const torrent = torrentStore.getTorrentByHash(props.hashes[0])
  if (!torrent) {
    return close()
  }

  switch (props.mode) {
    case 'download':
      value.value = Math.max(0, Math.round(torrent.dl_limit / 1000))
      break
    case 'upload':
      value.value = Math.max(0, Math.round(torrent.up_limit / 1000))
      break
  }
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card :title="$t(`dialogs.speed_limit.${mode}`)">
      <v-card-text>
        <v-form v-model="isFormValid" @submit.prevent @keydown.enter.prevent="submit">
          <v-text-field
            v-model.number="value"
            type="number"
            autofocus
            clearable
            :label="$t('dialogs.speed_limit.label')"
            prepend-inner-icon="mdi-speedometer"
            suffix="kB/s"
            @keydown.enter.prevent="submit" />
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

<style scoped></style>
