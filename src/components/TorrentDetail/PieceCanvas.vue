<script setup lang="ts">
import { FilePriority, PieceState } from '@/constants/qbit'
import { useContentStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import IntervalTree from '@flatten-js/interval-tree'
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { Application, Graphics } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const theme = useTheme()
const contentStore = useContentStore()
const { cachedFiles } = storeToRefs(contentStore)
const { fileContentInterval } = storeToRefs(useVueTorrentStore())

const canvas = ref<HTMLCanvasElement>()
const renderCanvasRunning = ref<boolean>(false)
const app = shallowRef<Application>()
const lastGraphics = shallowRef<Graphics>()

async function renderCanvas() {
  if (renderCanvasRunning.value || !canvas.value || !app.value) return

  renderCanvasRunning.value = true

  const pieces = await contentStore.fetchPieceState(props.torrent.hash)

  const selectedRanges = new IntervalTree()
  cachedFiles.value.filter(file => file.priority !== FilePriority.DO_NOT_DOWNLOAD).forEach(file => selectedRanges.insert(file.piece_range, file.name))

  const graphics = new Graphics()

  // Group contiguous colors together and draw as a single rectangle
  let color = ''
  let rectWidth = 1

  for (let i = 0; i < pieces.length; ++i) {
    const state = pieces[i]
    let newColor = ''

    if (state === PieceState.DOWNLOADING) newColor = theme.current.value.colors['torrent-downloading']
    else if (state === PieceState.DOWNLOADED) newColor = theme.current.value.colors['torrent-ul_paused']
    else if (state === PieceState.MISSING && selectedRanges.intersect_any([i, i])) newColor = theme.current.value.colors['torrent-dl_paused']

    if (newColor === color) {
      ++rectWidth
      continue
    }

    if (color !== '') {
      graphics.rect(((i - rectWidth) / pieces.length) * canvas.value.width, 0, (rectWidth / pieces.length) * canvas.value.width, canvas.value.height)
      graphics.fill(color)
    }

    rectWidth = 1
    color = newColor
  }

  // Fill a rect at the end of the canvas if one is needed
  if (color !== '') {
    graphics.rect(((pieces.length - rectWidth) / pieces.length) * canvas.value.width, 0, (rectWidth / pieces.length) * canvas.value.width, canvas.value.height)
    graphics.fill(color)
  }

  app.value.stage.addChild(graphics)
  if (lastGraphics.value) lastGraphics.value.destroy()
  lastGraphics.value = graphics
  renderCanvasRunning.value = false
}

function renderWrapper() {
  renderCanvas().catch(() => {})
}

const { pause, resume } = useIntervalFn(renderWrapper, fileContentInterval, {
  immediate: false,
  immediateCallback: true
})

watch(
  () => props.isActive,
  isActive => {
    if (isActive) resume()
    else pause()
  }
)

onMounted(() => {
  if (!canvas.value) return

  const application = new Application()
  application
    .init({ antialias: true, width: canvas.value?.width, height: canvas.value?.height, canvas: canvas.value })
    .then(() => (app.value = application))
    .then(() => props.isActive && resume())
})

onBeforeUnmount(() => {
  app.value?.destroy({ removeView: false }, { children: true })
})
</script>

<template>
  <canvas ref="canvas" width="4096" height="20" />
</template>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
