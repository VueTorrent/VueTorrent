<script lang="ts" setup>
import TRC from '@/components/Dashboard/RightClick.vue'
import Toolbar from '@/components/Dashboard/Toolbar.vue'
import GridView from '@/components/Dashboard/Views/Grid/GridView.vue'
import ListView from '@/components/Dashboard/Views/List/ListView.vue'
import TableView from '@/components/Dashboard/Views/Table/TableView.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { doesCommand } from '@/helpers'
import { useDashboardStore, useDialogStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { RightClickProperties, Torrent as TorrentType } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const dashboardStore = useDashboardStore()
const { paginatedTorrents, currentPage, pageCount, isSelectionMultiple, selectedTorrents, displayMode } = storeToRefs(dashboardStore)
const dialogStore = useDialogStore()
const torrentStore = useTorrentStore()
const { processedTorrents: torrents } = storeToRefs(torrentStore)
const vuetorrentStore = useVueTorrentStore()

const isListView = computed(() => displayMode.value === DashboardDisplayMode.LIST)
const isGridView = computed(() => displayMode.value === DashboardDisplayMode.GRID)
const isTableView = computed(() => displayMode.value === DashboardDisplayMode.TABLE)

const isAllTorrentsSelected = computed(() => torrents.value.length <= selectedTorrents.value.length)
const rightClickProperties = reactive<RightClickProperties>({
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
    dashboardStore.selectTorrents(...torrents.value.map(t => t.hash))
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
  if (rightClickProperties.isVisible) {
    rightClickProperties.isVisible = false
    await nextTick()
  }

  rightClickProperties.isVisible = true
  rightClickProperties.offset = [e.pageX, e.pageY]

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
    dashboardStore.selectTorrents(...torrents.value.map(torrent => torrent.hash))
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

    const searchInput = document.getElementById('searchInput')
    if (document.activeElement !== searchInput) {
      dialogStore.createDialog(ConfirmDeleteDialog, { hashes: selectedTorrents.value })
      e.preventDefault()
    }
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
  () => rightClickProperties.isVisible,
  newValue => {
    if (!newValue && !isSelectionMultiple.value) {
      dashboardStore.unselectAllTorrents()
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
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
        <v-card v-show="isSelectionMultiple" color="transparent" flat>
          <v-tooltip :text="t('common.selectAll')" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                :icon="isAllTorrentsSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                class="text-grey"
                flat
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

    <div v-if="$vuetify.display.mobile && !vuetorrentStore.isInfiniteScrollActive && pageCount > 1">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
    </div>

    <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
      <p class="text-grey">{{ t('common.emptyList') }}</p>
    </div>

    <ListView
      v-else-if="isListView"
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

    <div v-if="!vuetorrentStore.isInfiniteScrollActive && pageCount > 1">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="scrollToTop" />
    </div>
  </div>

  <TRC :right-click-properties="rightClickProperties" />
</template>
