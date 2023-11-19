<script setup lang="ts">
import { useDialog } from '@/composables'
import { useMaindataStore } from '@/stores'
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm } from 'vuetify/components'

const props = defineProps<{
  guid: string
  hash: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18n()
const maindataStore = useMaindataStore()

const field = ref<HTMLInputElement>()
const form = ref<VForm>()
const isFormValid = ref(false)
const formData = reactive({
  newName: ''
})

const rules = [(v: string) => !!v || t('dialogs.renameTorrent.required'), (v: string) => v !== oldName.value || t('dialogs.renameTorrent.sameName')]

const torrent = computed(() => maindataStore.getTorrentByHash(props.hash))
const oldName = computed(() => torrent.value?.name)

async function submit() {
  await form.value?.validate()
  if (!isFormValid.value) return

  await maindataStore.renameTorrent(props.hash, formData.newName)

  close()
}

const close = () => {
  isOpened.value = false
}

onBeforeMount(() => {
  formData.newName = torrent.value?.name || ''
})
onMounted(() => {
  field.value?.select()
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ $t('dialogs.renameTorrent.title') }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-if="oldName" :model-value="oldName" disabled :label="$t('dialogs.renameTorrent.oldName')" />
          <v-text-field v-model="formData.newName" ref="field" :rules="rules" autofocus
                        :label="$t('dialogs.renameTorrent.newName')" @keydown.enter="submit" />
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
