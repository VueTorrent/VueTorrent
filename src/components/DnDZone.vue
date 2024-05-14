<script lang="ts" setup>
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import { useAddTorrentStore, useAuthStore, useDialogStore } from '@/stores'
import { useDropZone } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const addTorrentStore = useAddTorrentStore()
const authStore = useAuthStore()
const dialogStore = useDialogStore()

const dndZoneRef = ref<HTMLDivElement>()

function onDragEnter() {
  const routeName = route.name as string
  const tabParam = route.params.tab as string
  const subtabParam = route.params.subtab as string
  if (routeName === 'login' || (routeName === 'settings' && tabParam === 'vuetorrent' && subtabParam.startsWith('torrentCard')) || !authStore.isAuthenticated) return
  isOverDropZone.value = true
}

function onDrop(files: File[] | null, event: DragEvent) {
  event.preventDefault()
  event.stopPropagation()
  if (!event.dataTransfer) return

  const torrentFiles = (files || []).filter(file => file.type === 'application/x-bittorrent' || file.name.endsWith('.torrent'))

  const links = event.dataTransfer
    .getData('text/plain')
    .split('\n')
    .filter(link => link.startsWith('magnet:') || link.startsWith('http'))

  torrentFiles.forEach(addTorrentStore.pushTorrentToQueue)
  links.forEach(addTorrentStore.pushTorrentToQueue)

  if (!dialogStore.hasActiveDialog) {
    dialogStore.createDialog(AddTorrentDialog)
  }
}

const { isOverDropZone } = useDropZone(dndZoneRef, { onDrop })

onMounted(() => {
  document.addEventListener('dragenter', onDragEnter)
})
onUnmounted(() => {
  document.removeEventListener('dragenter', onDragEnter)
})
</script>

<template>
  <div v-show="isOverDropZone" ref="dndZoneRef" class="dnd-zone-outer">
    <v-scale-transition>
      <div v-show="isOverDropZone" class="dnd-zone">
        <div class="dnd-zone-inner">
          <div class="dnd-zone-content text-accent">
            <v-icon size="75">mdi-cloud-upload</v-icon>
            <span>{{ $t('dialogs.add.drop_label') }}</span>
          </div>
        </div>
      </div>
    </v-scale-transition>
  </div>
</template>

<style lang="scss" scoped>
.dnd-zone,
.dnd-zone-outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dnd-zone-outer {
  background-color: rgba(0, 0, 0, 0.66);
  z-index: 9999;
}

.dnd-zone-inner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dnd-zone-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 48px);
  height: calc(100% - 48px);
  border: 2px solid rgb(var(--v-theme-accent));
  border-radius: 48px;
}
</style>
