<script lang="ts" setup>
import { useNavbarStore } from '@/stores'
import { useDropZone } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

const navbarStore = useNavbarStore()
const dndZoneRef = ref<HTMLDivElement>()

function onDragEnter() {
  isOverDropZone.value = true
}

function onDrop(files: File[] | null, event: DragEvent) {
  event.preventDefault()
  event.stopPropagation()
  isOverDropZone.value = false
  if (!event.dataTransfer) return

  // Handle .torrent files
  const torrentFiles = (files || [])
    .filter(file => file.type === 'application/x-bittorrent' || file.name.endsWith('.torrent'))
  const links = event.dataTransfer.getData('text/plain').split('\n')
  .filter(link => link.startsWith('magnet:') || link.startsWith('http'))

  torrentFiles.forEach(navbarStore.pushTorrentToQueue)
  links.forEach(navbarStore.pushTorrentToQueue)
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
  <div v-show="isOverDropZone" ref="dndZoneRef" class="overlay dnd-zone-over">
    <div class="dnd-zone d-flex flex-column justify-center align-center text-accent">
      <v-icon size="75">mdi-cloud-upload</v-icon>
      <span>{{ $t('dialogs.add.dropLabel') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dnd-zone {
  @extend .overlay;

  background: black;
  opacity: 0.66;
  z-index: 9998;
}

.dnd-zone-over {
  z-index: 9999;
}
</style>