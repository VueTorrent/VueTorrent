<script setup lang="ts">
import RightClickMenu from '@/components/Dashboard/TRC/RightClickMenu.vue'
import GridTorrent from '@/components/Dashboard/Views/Grid/GridTorrent.vue'
import { useDashboardStore } from '@/stores/dashboard.ts'
import { useVueTorrentStore } from '@/stores/vuetorrent.ts'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { nextTick, reactive, ref } from 'vue'
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
</script>

<template>
  <v-row id="torrentList">
    <v-col v-if="vuetorrentStore.isPaginationOnTop && !vuetorrentStore.isInfiniteScrollActive" cols="12">
      <v-pagination :model-value="currentPage" @update:model-value="$emit('update:currentPage', $event)"
                    :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left"
                    @input="scrollToTop" />
    </v-col>

    <v-col v-for="torrent in paginatedTorrents" cols="12" sm="6" md="4" lg="3" xl="2"
           :class="display.mobile ? 'pb-2' : 'pb-4'" class="pt-0" @contextmenu="onRightClick($event, torrent)"
           @touchcancel="endPress" @touchend="endPress" @touchstart="startPress"
           @dblclick.prevent="goToInfo(torrent.hash)">
      <div class="d-flex align-center">
        <v-expand-x-transition>
          <v-btn v-show="dashboardStore.isSelectionMultiple" class="mr-2"
                 :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                 color="transparent" variant="flat" @click="toggleSelectTorrent(torrent.hash)" />
        </v-expand-x-transition>
        <GridTorrent :torrent="torrent" />
      </div>
    </v-col>

    <v-col v-if="!vuetorrentStore.isPaginationOnTop && !vuetorrentStore.isInfiniteScrollActive" cols="12">
      <v-pagination :model-value="currentPage" @update:model-value="$emit('update:currentPage', $event)"
                    :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left"
                    @input="scrollToTop" />
    </v-col>
  </v-row>
  <div :style="`position: absolute; left: ${trcProperties.offset[0]}px; top: ${trcProperties.offset[1]}px;`">
    <RightClickMenu v-model="trcProperties.isVisible" />
  </div>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>