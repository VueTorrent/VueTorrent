<script setup lang="ts">
import { useMaindataStore } from '@/stores'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm } from 'vuetify/components'

const props = withDefaults(defineProps<{ modelValue: boolean, hashes?: string[] }>(), {
  modelValue: false,
  hashes: () => [] as string[]
})
const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const maindataStore = useMaindataStore()

const dialogVisible = ref(false)

const form = ref<VForm>()
const isFormValid = ref(false)
const formData = reactive({
  newPath: ''
})

const rules = [
  (v: string) => !!v || t('dialogs.moveTorrent.required'),
  (v: string) => v !== oldPath.value || t('dialogs.moveTorrent.samePath')
]

const torrents = computed(() => props.hashes.map(maindataStore.getTorrentByHash))
const oldPath = computed(() => torrents.value[0]?.savePath)

async function submit() {
  await form.value?.validate()
  if (!isFormValid.value) return

  await maindataStore.moveTorrents(props.hashes, formData.newPath)

  close()
}

const close = () => {
  dialogVisible.value = false
}

watch(dialogVisible, (value) => {
  emit('update:modelValue', value)

  if (value) {
    formData.newPath = torrents.value[0]?.savePath || ''
  } else {
    form.value?.reset()
  }
})
</script>

<template>
  <v-dialog v-model="dialogVisible" activator="parent">
    <v-card>
      <v-card-title>{{ $t('dialogs.moveTorrent.title') }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-if="oldPath"
                        :model-value="oldPath"
                        disabled
                        :label="$t('dialogs.moveTorrent.oldPath')" />
          <v-text-field
            v-model="formData.newPath"
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

<style scoped>

</style>