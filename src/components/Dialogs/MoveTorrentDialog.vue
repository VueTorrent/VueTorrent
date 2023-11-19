<script setup lang="ts">
import { useDialog } from '@/composables'
import { useTorrentStore } from '@/stores'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm } from 'vuetify/components'

const props = defineProps<{
  guid: string
  hashes: string[]
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18n()
const torrentStore = useTorrentStore()

const form = ref<VForm>()
const isFormValid = ref(false)
const formData = reactive({
  newPath: ''
})

const rules = [(v: string) => !!v || t('dialogs.moveTorrent.required'), (v: string) => v !== oldPath.value || t('dialogs.moveTorrent.samePath')]

const torrents = computed(() => props.hashes.map(torrentStore.getTorrentByHash))
const oldPath = computed(() => torrents.value[0]?.savePath)

async function submit() {
  await form.value?.validate()
  if (!isFormValid.value) return

  await torrentStore.moveTorrents(props.hashes, formData.newPath)

  close()
}

const close = () => {
  isOpened.value = false
}

onBeforeMount(() => {
  formData.newPath = torrents.value[0]?.savePath || ''
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ $t('dialogs.moveTorrent.title') }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-if="oldPath" :model-value="oldPath" disabled :label="$t('dialogs.moveTorrent.oldPath')" />
          <v-text-field v-model="formData.newPath" :rules="rules" autofocus :label="$t('dialogs.moveTorrent.newPath')"
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
