<script setup lang="ts">
import RightClickMenu from '@/components/Dashboard/TRC/RightClickMenu.vue'
import ListTorrent from '@/components/Dashboard/Views/List/ListTorrent.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { nextTick, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

defineProps<{
  currentPage: number
  pageCount: number
  paginatedTorrents: TorrentType[]
}>()
defineEmits(['update:currentPage'])

const display = useDisplay()
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

async function onRightClick(e: PointerEvent, torrent: TorrentType) {
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

function startPress(e: PointerEvent, torrent: TorrentType) {
  timer.value = setTimeout(() => {
    onRightClick(e, torrent)
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

    <v-list-item v-for="torrent in paginatedTorrents" :id="`torrent-${torrent.hash}`"
                 :class="display.mobile ? 'mb-2' : 'mb-4'" class="pa-0" @contextmenu="onRightClick($event, torrent)"
                 @touchcancel="endPress" @touchend="endPress" @touchstart="startPress"
                 @dblclick.prevent="goToInfo(torrent.hash)">
      <div class="d-flex align-center">
        <v-expand-x-transition>
          <v-btn v-show="dashboardStore.isSelectionMultiple" class="mr-2"
                 :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                 color="transparent" variant="flat" @click="toggleSelectTorrent(torrent.hash)" />
        </v-expand-x-transition>
        <ListTorrent :torrent="torrent" />
      </div>
    </v-list-item>

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