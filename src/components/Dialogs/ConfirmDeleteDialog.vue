<script setup lang="ts">
import { useMaindataStore, useVueTorrentStore } from '@/stores'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm } from 'vuetify/components'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },

  hashes: {
    type: Array<string>,
    required: false,
    default: []
  },
  disableActivator: {
    type: Boolean,
    required: false,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const maindataStore = useMaindataStore()
const vuetorrentStore = useVueTorrentStore()

const dialogVisible = ref(false)

const form = ref<VForm>()
const isFormValid = ref(false)

const selection = computed(() => maindataStore.torrents.filter(t => props.hashes?.includes(t.hash)))

async function submit() {
  if (!isFormValid.value) return

  await maindataStore.deleteTorrents(selection.value.map(t => t.hash), vuetorrentStore.deleteWithFiles)

  form.value?.reset()
  close()
}

const close = () => {
  dialogVisible.value = false
}

watch(() => dialogVisible.value, (value) => emit('update:modelValue', value))
</script>

<template>
  <v-dialog v-model="dialogVisible" :activator="disableActivator ? undefined : 'parent'">
    <v-card>
      <v-card-title>{{ t('dialogs.delete.title', selection.length, { n: selection.length }) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <div class="d-flex flex-wrap gap">
            <span class="pa-1 border" v-for="torrent in selection">{{ torrent.name }}</span>
          </div>
          <v-checkbox v-model="vuetorrentStore.deleteWithFiles"
                      hide-details
                      :label="$t('dialogs.delete.deleteWithFiles')" />
          <v-scroll-x-transition>
            <div class="text-red" v-show="vuetorrentStore.deleteWithFiles">
              <v-icon>mdi-alert</v-icon>
              {{ $t('dialogs.delete.warnDelete') }}
            </div>
          </v-scroll-x-transition>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="error" :disabled="!isFormValid" @click="submit">{{ $t('common.delete') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>