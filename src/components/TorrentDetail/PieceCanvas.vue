<script setup lang="ts">
import { FilePriority, PieceState } from '@/constants/qbit'
import { useContentStore, useMaindataStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import IntervalTree from '@flatten-js/interval-tree'
import { storeToRefs } from 'pinia'
import { Application, Graphics } from 'pixi.js'
import { onMounted } from 'vue'
import { onUnmounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const theme = useTheme()
const { cachedFiles } = storeToRefs(useContentStore())
const maindataStore = useMaindataStore()

const canvas = ref<HTMLCanvasElement>()

const app = ref<Application>()
const lastGraphics = ref<Graphics>()

async function renderCanvas() {
  if (!canvas.value || !app.value) return

  const pieces = await maindataStore.fetchPieceState(props.torrent.hash)

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
    else if (state === PieceState.DOWNLOADED) newColor = theme.current.value.colors['torrent-pausedUP']
    else if (state === PieceState.MISSING && selectedRanges.intersect_any([i, i])) newColor = theme.current.value.colors['torrent-pausedDL']

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
}

watch(cachedFiles, () => {
  if (props.isActive) {
    renderCanvas()
  }
})

onMounted(async () => {
  if (!canvas.value) return

  app.value = new Application()
  await app.value.init({ antialias: true, width: canvas.value.width, height: canvas.value.height, canvas: canvas.value })
  if (cachedFiles.value) {
    renderCanvas()
  }
})

onUnmounted(() => {
  if (app.value) app.value.destroy(false, { children: true })
})
</script>

<template>
  <canvas ref="canvas" height="20" />
</template>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
