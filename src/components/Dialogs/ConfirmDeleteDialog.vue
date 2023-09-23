<script setup lang="ts">
import { useDashboardStore, useMaindataStore, useVueTorrentStore } from '@/stores'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
import { VForm } from 'vuetify/components'

const props = defineProps<{
  modelValue: boolean
  disableActivator?: boolean
  hashes: string[]
}>()
const emit = defineEmits(['update:modelValue'])

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const dashboardStore = useDashboardStore()
const maindataStore = useMaindataStore()
const vuetorrentStore = useVueTorrentStore()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const form = ref<VForm>()
const isFormValid = ref(false)

const selection = computed(() => maindataStore.torrents.filter(t => props.hashes?.includes(t.hash)))

async function submit() {
  if (!isFormValid.value) return

  await maindataStore.deleteTorrents(
    selection.value.map(t => t.hash),
    vuetorrentStore.deleteWithFiles
  )
  dashboardStore.unselectAllTorrents()

  close()

  if (route.name === 'torrentDetail') {
    router.push({ name: 'dashboard' })
  }
}

const close = () => {
  dialogVisible.value = false
}
</script>

<template>
  <v-dialog v-model="dialogVisible" :activator="disableActivator ? undefined : 'parent'">
    <v-card>
      <v-card-title>{{ t('dialogs.delete.title', selection.length) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <div class="d-flex flex-wrap gap">
            <span class="pa-1 border" v-for="torrent in selection">{{ torrent.name }}</span>
          </div>
          <v-checkbox v-model="vuetorrentStore.deleteWithFiles" hide-details :label="$t('dialogs.delete.deleteWithFiles')" />
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
