<script setup lang="ts">
import HistoryField from '@/components/Core/HistoryField.vue'
import { useDialog } from '@/composables'
import { HistoryKey } from '@/constants/vuetorrent'
import { useTorrentStore } from '@/stores'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps<{
  guid: string
  hashes: string[]
  mode: 'dl' | 'save'
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18n()
const torrentStore = useTorrentStore()

const form = ref<VForm>()
const field = ref<typeof HistoryField>()
const isFormValid = ref(false)
const formData = reactive({
  newPath: ''
})

const rules = [(v: string) => !!v || t('dialogs.moveTorrent.required')]

const torrents = computed(() => props.hashes.map(torrentStore.getTorrentByHash))
const oldPath = computed(() => {
  switch (props.mode) {
    case 'dl':
      return torrents.value[0]?.download_path
    case 'save':
      return torrents.value[0]?.savePath
  }
})

async function submit() {
  await form.value?.validate()
  if (!isFormValid.value) return

  await torrentStore.toggleAutoTmm(props.hashes, false)
  await torrentStore.moveTorrents(props.mode, props.hashes, formData.newPath)

  field.value?.saveValueToHistory()

  close()
}

const close = () => {
  isOpened.value = false
}

onBeforeMount(() => {
  formData.newPath = oldPath.value || ''
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ $t(`dialogs.moveTorrent.${mode}.title`) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-if="oldPath" :model-value="oldPath" disabled :label="$t('dialogs.moveTorrent.oldPath')" />
          <HistoryField
            v-model="formData.newPath"
            :historyKey="HistoryKey.TORRENT_PATH"
            ref="field"
            :rules="rules"
            autofocus
            :label="$t('dialogs.moveTorrent.newPath')"
            @keydown.enter="submit" />
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

<style scoped></style>
