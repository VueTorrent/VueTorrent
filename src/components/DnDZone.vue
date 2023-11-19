<script lang="ts" setup>
import { useAddTorrentStore, useAuthStore } from '@/stores'
import { useDropZone } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const addTorrentStore = useAddTorrentStore()
const authStore = useAuthStore()

const dndZoneRef = ref<HTMLDivElement>()

function onDragEnter() {
  if (['login', 'settings'].includes(route.name as string) || !authStore.isAuthenticated) return
  isOverDropZone.value = true
}

function onDrop(files: File[] | null, event: DragEvent) {
  event.preventDefault()
  event.stopPropagation()
  if (!event.dataTransfer) return

  // Handle .torrent files
  const torrentFiles = (files || [])
  .filter(file => file.type === 'application/x-bittorrent' || file.name.endsWith('.torrent'))
  const links = event.dataTransfer.getData('text/plain').split('\n')
  .filter(link => link.startsWith('magnet:') || link.startsWith('http'))

  torrentFiles.forEach(addTorrentStore.pushTorrentToQueue)
  links.forEach(addTorrentStore.pushTorrentToQueue)
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
  <v-scale-transition>
    <div v-show="isOverDropZone" ref="dndZoneRef" class="dnd-zone-outer">
      <div class="dnd-zone">
        <div class="dnd-zone-content text-accent">
          <v-icon size="75">mdi-cloud-upload</v-icon>
          <span>{{ $t('dialogs.add.dropLabel') }}</span>
        </div>
      </div>
    </div>
  </v-scale-transition>
</template>

<style lang="scss" scoped>
.dnd-zone-outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.66);
  z-index: 9999;
}

.dnd-zone {
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