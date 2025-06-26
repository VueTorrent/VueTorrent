<script setup lang="ts">
import { nextTick, onBeforeMount, reactive, ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'
import { useDialog, useI18nUtils } from '@/composables'
import { useContentStore } from '@/stores'

const props = defineProps<{
  guid: string
  hash: string
  isFolder: boolean
  oldName: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const contentStore = useContentStore()

const form = ref<VForm>()
const input = ref<HTMLInputElement>()
const isFormValid = ref(false)
const formData = reactive({
  newName: ''
})

const rules = [(v: string) => !!v || t('dialogs.moveTorrent.required')]

async function submit() {
  await form.value?.validate()
  if (!isFormValid.value) return

  if (props.isFolder) {
    await contentStore.renameTorrentFolder(props.hash, props.oldName, formData.newName)
  } else {
    await contentStore.renameTorrentFile(props.hash, props.oldName, formData.newName)
  }

  close()
}

function close() {
  isOpened.value = false
}

onBeforeMount(() => {
  formData.newName = props.oldName

  if (props.isFolder) {
    void nextTick(() => input.value?.select())
  } else {
    const startIndex = formData.newName.lastIndexOf('/')
    const endIndex = formData.newName.lastIndexOf('.')

    void nextTick(() => {
      input.value?.setSelectionRange(startIndex + 1, endIndex == -1 ? formData.newName.length : endIndex)
    })
  }
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ t('dialogs.moveTorrentFile.title', 1 + Number(isFolder)) }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent>
          <v-text-field v-if="oldName" :model-value="oldName" disabled :label="$t('dialogs.moveTorrentFile.oldName')" />
          <v-text-field ref="input" v-model="formData.newName" :rules="rules" autofocus :label="$t('dialogs.moveTorrent.newPath')" @keydown.enter="submit" />
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
