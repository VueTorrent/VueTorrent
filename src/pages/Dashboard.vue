<script lang="ts" setup>
import RightClickMenu from '@/components/Dashboard/TRC/RightClickMenu.vue'
import GridView from '@/components/Dashboard/Views/Grid/GridView.vue'
import ListView from '@/components/Dashboard/Views/List/ListView.vue'
import TableView from '@/components/Dashboard/Views/Table/TableView.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import Toolbar from '@/components/Dashboard/Toolbar.vue'
import { useArrayPagination } from '@/composables'
import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { doesCommand } from '@/helpers'
import { useDashboardStore, useDialogStore, useMaindataStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const dashboardStore = useDashboardStore()
const { currentPage: dashboardPage, isSelectionMultiple, selectedTorrents, displayMode } = storeToRefs(dashboardStore)
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const torrentStore = useTorrentStore()
const { filteredTorrents } = storeToRefs(torrentStore)
const vuetorrentStore = useVueTorrentStore()

const isListView = computed(() => displayMode.value === DashboardDisplayMode.LIST)
const isGridView = computed(() => displayMode.value === DashboardDisplayMode.GRID)
const isTableView = computed(() => displayMode.value === DashboardDisplayMode.TABLE)

const { paginatedResults: paginatedTorrents, currentPage, pageCount } = useArrayPagination(filteredTorrents, vuetorrentStore.paginationSize, dashboardPage)

const isAllTorrentsSelected = computed(() => filteredTorrents.value.length <= selectedTorrents.value.length)

const trcProperties = reactive({
  isVisible: false,
  offset: [0, 0]
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleSearchFilter(forceState?: boolean) {
  if (forceState) {
    return nextTick(() => {
      const searchInput = document.getElementById('searchInput')
      searchInput?.focus()
    })
  }
  nextTick(() => {
    const searchInput = document.getElementById('searchInput')
    searchInput?.blur()
  })
}

function toggleSelectAll() {
  if (isAllTorrentsSelected.value) {
    dashboardStore.unselectAllTorrents()
  } else {
    dashboardStore.selectTorrents(...filteredTorrents.value.map(t => t.hash))
  }
}

function goToInfo(torrent: TorrentType) {
  if (!isSelectionMultiple.value) {
    router.push({ name: 'torrentDetail', params: { hash: torrent.hash } })
  }
}

function onCheckboxClick(torrent: TorrentType) {
  dashboardStore.toggleSelect(torrent.hash)
}

function onTorrentClick(e: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }, torrent: TorrentType) {
  if (e.shiftKey) {
    dashboardStore.spanTorrentSelection(torrent.hash)
  } else if (doesCommand(e) || dashboardStore.isSelectionMultiple) {
    dashboardStore.isSelectionMultiple = true
    dashboardStore.toggleSelect(torrent.hash)
  }
}

async function onTorrentRightClick(e: MouseEvent | Touch, torrent: TorrentType) {
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

function startPress(e: Touch, torrent: TorrentType) {
  timer.value = setTimeout(() => {
    onTorrentRightClick(e, torrent)
  }, 500)
}

function endPress() {
  clearTimeout(timer.value)
}
// END mobile long press

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog) {
    return false
  }

  const targetNode = e.target as Element

  // 'ctrl + A' => select torrents
  if (doesCommand(e) && e.key === 'a' && targetNode.tagName !== 'INPUT') {
    dashboardStore.unselectAllTorrents()
    dashboardStore.selectTorrents(...filteredTorrents.value.map(torrent => torrent.hash))
    e.preventDefault()
    return true
  }

  // 'ctrl + F' => Focus search filter field
  if (doesCommand(e) && e.key === 'f') {
    const searchInput = document.getElementById('searchInput')
    if (document.activeElement !== searchInput) {
      toggleSearchFilter(true)
      e.preventDefault()
      return true
    }
  }

  // 'Escape' => Remove focus from search field / unselect all torrents
  if (e.key === 'Escape') {
    const searchInput = document.getElementById('searchInput')
    if (document.activeElement === searchInput) {
      toggleSearchFilter(false)
    } else {
      isSelectionMultiple.value = false
      dashboardStore.unselectAllTorrents()
    }
    e.preventDefault()
    return true
  }

  // 'Delete' => Open delete dialog
  if (e.key === 'Delete') {
    if (selectedTorrents.value.length === 0) return

    dialogStore.createDialog(ConfirmDeleteDialog, { hashes: selectedTorrents.value })
    e.preventDefault()
    return true
  }

  // 'Search' => Search view
  if (e.key === '/') {
    const searchInput = document.getElementById('searchInput')
    if (document.activeElement !== searchInput) {
      router.push({ name: 'searchEngine' })
      e.preventDefault()
    }
    return true
  }
}

watch(
  () => trcProperties.isVisible,
  newValue => {
    if (!newValue && !isSelectionMultiple.value) {
      dashboardStore.unselectAllTorrents()
    }
  }
)

onBeforeMount(async () => {
  await maindataStore.fetchCategories()
  await maindataStore.fetchTags()
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
  isSelectionMultiple.value = false
  scrollToTop()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})
</script>

<template>
  <div class="pt-4 px-1 px-sm-5">
    <Toolbar />
    <v-row class="ma-0 pa-0">
      <v-expand-transition>
        <v-card v-show="isSelectionMultiple" color="transparent">
          <v-tooltip :text="t('common.selectAll')" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                :icon="isAllTorrentsSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                class="text-grey"
                color="transparent"
                style="left: -8px"
                v-bind="props"
                @click="toggleSelectAll" />
            </template>
          </v-tooltip>
          <span class="text-grey">{{ t('dashboard.selectAll') }}</span>
        </v-card>
      </v-expand-transition>
    </v-row>

    <div v-if="filteredTorrents.length === 0" class="mt-5 text-xs-center">
      <p class="text-grey">{{ t('common.emptyList') }}</p>
    </div>

    <div v-if="vuetorrentStore.isPaginationOnTop && !vuetorrentStore.isInfiniteScrollActive && pageCount > 1">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="scrollToTop" />
    </div>

    <ListView
      v-if="isListView"
      :paginated-torrents="paginatedTorrents"
      @onTorrentClick="onTorrentClick"
      @onTorrentDblClick="goToInfo"
      @onCheckboxClick="onCheckboxClick"
      @onTorrentRightClick="onTorrentRightClick"
      @startPress="startPress"
      @endPress="endPress" />
    <GridView
      v-else-if="isGridView"
      class="mb-2"
      :paginated-torrents="paginatedTorrents"
      @onTorrentClick="onTorrentClick"
      @onTorrentDblClick="goToInfo"
      @onCheckboxClick="onCheckboxClick"
      @onTorrentRightClick="onTorrentRightClick"
      @startPress="startPress"
      @endPress="endPress" />
    <TableView
      v-else-if="isTableView"
      :paginated-torrents="paginatedTorrents"
      @onTorrentClick="onTorrentClick"
      @onTorrentDblClick="goToInfo"
      @onCheckboxClick="onCheckboxClick"
      @onTorrentRightClick="onTorrentRightClick"
      @startPress="startPress"
      @endPress="endPress" />

    <div v-if="!vuetorrentStore.isPaginationOnTop && !vuetorrentStore.isInfiniteScrollActive && pageCount > 1">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="scrollToTop" />
    </div>
  </div>

  <div :style="`position: absolute; left: ${trcProperties.offset[0]}px; top: ${trcProperties.offset[1]}px;`">
    <RightClickMenu v-model="trcProperties.isVisible" />
  </div>
</template>

<style>
.v-autocomplete .v-field:not(.v-field--focused) input {
  display: none;
}
</style>
