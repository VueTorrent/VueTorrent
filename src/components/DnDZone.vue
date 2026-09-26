<script lang="ts" setup>
import { useDropZone } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useHotkey } from 'vuetify'
import { useI18nUtils } from '@/composables'
import { useAddTorrentStore, useAppStore, useDialogStore, useTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const route = useRoute()
const addTorrentStore = useAddTorrentStore()
const appStore = useAppStore()
const dialogStore = useDialogStore()
const torrentStore = useTorrentStore()

const isDragging = ref(false)
const queueZoneRef = ref<HTMLDivElement>()
const downloadZoneRef = ref<HTMLDivElement>()

const { isOverDropZone: isOverQueueZone } = useDropZone(queueZoneRef, { onDrop: onQueueDrop })
const { isOverDropZone: isOverDownloadZone } = useDropZone(downloadZoneRef, { onDrop: (files, event) => void onDownloadDrop(files, event) })

function onDragEnter() {
  const routeName = route.name as string
  const tabParam = route.params.tab as string
  const subtabParam = route.params.subtab as string
  if (
    !appStore.isAuthenticated ||
    routeName === 'login' ||
    (routeName === 'settings' && tabParam === 'vuetorrent' && (subtabParam.startsWith('torrentCard') || subtabParam === 'sidebar'))
  ) {
    return
  }
  isDragging.value = true
}

useHotkey('Escape', cancelDrag)

function checkDropEvent(event: DragEvent) {
  event.preventDefault()
  return !!event.dataTransfer
}

function extractDropData(files: File[] | null, dataTransfer: DataTransfer): [File[], string[]] {
  const torrentFiles = (files || []).filter(file => file.type === 'application/x-bittorrent' || file.name.endsWith('.torrent'))

  const links = dataTransfer
    .getData('text/plain')
    .split('\n')
    .filter(link => link.startsWith('magnet:') || link.startsWith('http'))

  return [torrentFiles, links]
}

function extractPasteData(event: ClipboardEvent): [File[], string[]] {
  const clipboardData = event.clipboardData
  if (!clipboardData) {
    return [[], []]
  }

  const files: File[] = Array.from(clipboardData.items)
    .filter(item => item.kind === 'file')
    .map(item => item.getAsFile())
    .filter(file => !!file)
    .filter(file => file.type === 'application/x-bittorrent' || file.name.endsWith('.torrent'))

  const links = clipboardData
    .getData('text/plain')
    .split('\n')
    .filter(link => link.startsWith('magnet:') || link.startsWith('http'))

  return [files, links]
}

function onQueueDrop(files: File[] | null, event: DragEvent) {
  if (!checkDropEvent(event)) return
  cancelDrag()

  const [torrentFiles, links] = extractDropData(files, event.dataTransfer!)

  torrentFiles.forEach(addTorrentStore.pushTorrentToQueue)
  links.forEach(addTorrentStore.pushTorrentToQueue)

  dialogStore.initAndOpenAddTorrentDialog()
}

function onDownloadDrop(files: File[] | null, event: DragEvent) {
  if (!checkDropEvent(event)) return
  cancelDrag()

  const [torrentFiles, links] = extractDropData(files, event.dataTransfer!)

  const torrentsCount = torrentFiles.length + links.filter(url => url.trim().length).length
  return toast.promise(
    torrentStore.addTorrents(torrentFiles, links),
    {
      pending: t('toast.add.pending'),
      error: t('toast.add.error', torrentsCount),
      success: t('toast.add.success', torrentsCount),
    },
    {
      autoClose: 1500,
    }
  )
}

function onPaste(event: ClipboardEvent) {
  const targetElement = event.target
  if (targetElement instanceof HTMLInputElement || targetElement instanceof HTMLTextAreaElement) {
    return false
  }

  event.preventDefault()

  const [torrentFiles, links] = extractPasteData(event)

  torrentFiles.forEach(addTorrentStore.pushTorrentToQueue)
  links.forEach(addTorrentStore.pushTorrentToQueue)

  if (torrentFiles.length || links.length) {
    dialogStore.initAndOpenAddTorrentDialog()
  }
}

function onDragLeave(event: DragEvent) {
  console.log(event?.clientX, event?.clientY, window.innerWidth, window.innerHeight)
  if (event.clientX <= 0 || event.clientY <= 0 || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight) {
    cancelDrag()
  }
}

function cancelDrag() {
  isDragging.value = false
}

onMounted(() => {
  document.addEventListener('paste', onPaste)
  document.addEventListener('dragenter', onDragEnter)
  document.addEventListener('dragend', cancelDrag)
  document.addEventListener('dragleave', onDragLeave)
})
onUnmounted(() => {
  document.removeEventListener('paste', onPaste)
  document.removeEventListener('dragenter', onDragEnter)
  document.removeEventListener('dragend', cancelDrag)
  document.removeEventListener('dragleave', onDragLeave)
})
</script>

<template>
  <div v-show="isDragging" class="position-fixed w-100 h-100" style="z-index: 9999">
    <div ref="queueZoneRef" :class="['d-flex align-center justify-center h-50', isOverQueueZone ? 'dnd-bg-active' : 'dnd-bg']">
      <div class="d-flex flex-column align-center justify-center text-accent dnd-zone-border">
        <v-icon size="75">mdi-cloud-upload</v-icon>
        <span>{{ $t('dialogs.add.drop_label') }}</span>
      </div>
    </div>

    <div ref="downloadZoneRef" :class="['d-flex align-center justify-center h-50', isOverDownloadZone ? 'dnd-bg-active' : 'dnd-bg']">
      <div class="d-flex flex-column align-center justify-center text-accent dnd-zone-border">
        <v-icon size="75">mdi-download</v-icon>
        <span>{{ $t('dialogs.add.instant_drop_label') }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dnd-bg {
  background-color: #000000a8;

  &-active {
    background-color: #404040a8;
  }
}

.dnd-zone-border {
  width: calc(100% - 24px);
  height: calc(100% - 24px);
  border: 2px solid rgb(var(--v-theme-accent));
  border-radius: 48px;
}
</style>
