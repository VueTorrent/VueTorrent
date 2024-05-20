<script setup lang="ts">
import { useDialog } from '@/composables'
import { useDashboardStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { computed, onBeforeMount, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { VForm } from 'vuetify/components'

const props = defineProps<{
  guid: string
  hashes: string[]
}>()

const { isOpened } = useDialog(props.guid)

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const dashboardStore = useDashboardStore()
const torrentStore = useTorrentStore()
const vuetorrentStore = useVueTorrentStore()

const form = ref<VForm>()
const isFormValid = ref(false)

const selection = computed(() => torrentStore.torrents.filter(t => props.hashes?.includes(t.hash)))

async function submit() {
  if (!isFormValid.value) return

  await torrentStore.deleteTorrents(
    selection.value.map(t => t.hash),
    vuetorrentStore.deleteWithFiles
  )
  dashboardStore.unselectAllTorrents()

  close()

  if (route.name === 'torrentDetail') {
    await router.push({ name: 'dashboard' })
  }
}

const close = () => {
  isOpened.value = false
}

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    submit()
    return true
  }
}

onBeforeMount(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})
</script>

<template>
  <v-dialog v-model="isOpened" max-width="1000">
    <v-card>
      <v-card-title>{{ t('dialogs.delete.title', selection.length) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <div class="d-flex flex-wrap flex-gap">
            <span class="pa-1 border wrap-anywhere" v-for="torrent in selection">{{ torrent.name }}</span>
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
