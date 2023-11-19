<script setup lang="ts">
import RightClickMenu from '@/components/Dashboard/TRC/RightClickMenu.vue'
import { formatData, formatPercent } from '@/helpers'
import { useDashboardStore } from '@/stores/dashboard.ts'
import { useVueTorrentStore } from '@/stores/vuetorrent.ts'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { nextTick, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  currentPage: number
  pageCount: number
  paginatedTorrents: TorrentType[]
}>()
defineEmits(['update:currentPage'])

const router = useRouter()
const dashboardStore = useDashboardStore()
const { isSelectionMultiple, selectedTorrents } = storeToRefs(useDashboardStore())
const vuetorrentStore = useVueTorrentStore()

const trcProperties = reactive({
  isVisible: false,
  offset: [0, 0]
})

function goToInfo(hash: string) {
  if (!isSelectionMultiple.value) {
    router.push({ name: 'torrentDetail', params: { hash } })
  }
}

function toggleSelectTorrent(hash: string) {
  dashboardStore.toggleSelect(hash)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function onRightClick(e: MouseEvent, torrent: TorrentType) {
  e.preventDefault()

  if (trcProperties.isVisible) {
    trcProperties.isVisible = false
    await nextTick()
  }

  trcProperties.isVisible = true
  trcProperties.offset = [e.pageX, e.pageY]

  if (!isSelectionMultiple.value) {
    dashboardStore.unselectAllTorrents()
    dashboardStore.selectTorrent(torrent.hash)
  } else if (selectedTorrents.value.length === 0) {
    dashboardStore.selectTorrent(torrent.hash)
  }
}

// mobile long press
const timer = ref<NodeJS.Timeout>()

function startPress(e: TouchEvent, torrent: TorrentType) {
  timer.value = setTimeout(() => {
    e.preventDefault()
    const touches = e.changedTouches
    const first = touches[0]

    const simulatedEvent = new MouseEvent('mousedown', {
      screenX: first.screenX,
      screenY: first.screenY,
      clientX: first.clientX,
      clientY: first.clientY,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false,
      button: 2,
      buttons: 2,
      relatedTarget: e.target,
      view: e.view
    })
    onRightClick(simulatedEvent, torrent)
  }, 500)
}

function endPress() {
  clearTimeout(timer.value)
}

watch(
  () => trcProperties.isVisible,
  newValue => {
    if (!newValue && !isSelectionMultiple.value) {
      dashboardStore.unselectAllTorrents()
    }
  }
)
</script>

<template>
  <v-list id="torrentList" class="pa-0">
    <v-list-item v-if="vuetorrentStore.isPaginationOnTop && !vuetorrentStore.isInfiniteScrollActive">
      <v-pagination :model-value="currentPage" @update:model-value="$emit('update:currentPage', $event)"
                    :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left"
                    @input="scrollToTop" />
    </v-list-item>

    <v-table id="torrentList" class="pa-0">
      <thead>
      <tr>
        <th></th>
        <th class="text-left">{{ $t('torrent.properties.name') }}</th>
        <th class="text-left">{{ $t('torrent.properties.size') }}</th>
        <th class="text-left">{{ $t('torrent.properties.state') }}</th>
        <th class="text-left">{{ $t('torrent.properties.progress') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="torrent in paginatedTorrents" :class="`text-torrent-${torrent.state}`"
          @dblclick.prevent="goToInfo(torrent.hash)" @contextmenu="onRightClick($event, torrent)"
          @touchcancel="endPress" @touchend="endPress" @touchstart="startPress($event, torrent)">
        <td>
          <v-checkbox-btn :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'" color="transparent" variant="flat" @click="toggleSelectTorrent(torrent.hash)" />
        </td>
        <td>{{ torrent.name }}</td>
        <td>{{ formatData(torrent.size, vuetorrentStore.useBinarySize) }}</td>
        <td>{{ torrent.stateString }}</td>
        <td>{{ formatPercent(torrent.progress) }}</td>
      </tr>
      </tbody>
    </v-table>

    <v-list-item v-if="!vuetorrentStore.isPaginationOnTop && !vuetorrentStore.isInfiniteScrollActive">
      <v-pagination :model-value="currentPage" @update:model-value="$emit('update:currentPage', $event)"
                    :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left"
                    @input="scrollToTop" />
    </v-list-item>
  </v-list>
  <div :style="`position: absolute; left: ${trcProperties.offset[0]}px; top: ${trcProperties.offset[1]}px;`">
    <RightClickMenu v-model="trcProperties.isVisible" />
  </div>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>