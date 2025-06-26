<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmListDialog from './ConfirmListDialog.vue'
import { useI18nUtils } from '@/composables'
import { useAppStore, useDashboardStore, usePreferenceStore, useTorrentStore, useVueTorrentStore } from '@/stores'

const props = defineProps<{
  guid: string
  hashes: string[]
}>()

const route = useRoute()
const router = useRouter()
const { t } = useI18nUtils()
const appStore = useAppStore()
const dashboardStore = useDashboardStore()
const preferenceStore = usePreferenceStore()
const torrentStore = useTorrentStore()
const vuetorrentStore = useVueTorrentStore()

const selection = computed(() => torrentStore.torrents.filter(t => props.hashes?.includes(t.hash)))
const selectionNames = computed(() => selection.value.map(t => t.name))

const deletePref = computed(() => preferenceStore.preferences!.delete_torrent_content_files ?? vuetorrentStore.deleteWithFiles)
const deleteWithFiles = ref(deletePref.value)

async function saveDeleteState() {
  const newValue = deleteWithFiles.value

  if (appStore.usesQbit5) {
    await preferenceStore.setPreferences({ delete_torrent_content_files: newValue })
    await preferenceStore.fetchPreferences()
  } else {
    vuetorrentStore.deleteWithFiles = newValue
  }
}

async function submit() {
  await torrentStore.deleteTorrents(
    selection.value.map(t => t.hash),
    deleteWithFiles.value
  )
  dashboardStore.unselectAllTorrents()

  if (route.name === 'torrentDetail') {
    await router.push({ name: 'dashboard' })
  }
}
</script>

<template>
  <ConfirmListDialog
    :width="undefined"
    :guid="guid"
    :title="t('dialogs.delete.title', selection.length)"
    :items="selectionNames"
    :no-text="t('common.cancel')"
    yes-color="error"
    :yes-text="t('common.delete')"
    @confirm="submit">
    <div class="d-flex flex-row flex-gap align-center">
      <v-btn :disabled="deleteWithFiles === deletePref" color="accent" variant="text" icon="mdi-content-save" @click="saveDeleteState" />
      <v-checkbox v-model="deleteWithFiles" hide-details :label="t('dialogs.delete.deleteWithFiles')" />
    </div>
    <v-scroll-x-transition>
      <div v-show="deleteWithFiles" class="text-red">
        <v-icon>mdi-alert</v-icon>
        {{ t('dialogs.delete.warnDelete') }}
      </div>
    </v-scroll-x-transition>
  </ConfirmListDialog>
</template>
