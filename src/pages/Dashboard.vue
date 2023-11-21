<script lang="ts" setup>
import RightClickMenu from '@/components/Dashboard/TRC/RightClickMenu.vue'
import GridView from '@/components/Dashboard/Views/Grid/GridView.vue'
import ListView from '@/components/Dashboard/Views/List/ListView.vue'
import TableView from '@/components/Dashboard/Views/Table/TableView.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { useArrayPagination } from '@/composables'
import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { doesCommand } from '@/helpers'
import { useDashboardStore, useDialogStore, useMaindataStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { computed, mergeProps, nextTick, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const dashboardStore = useDashboardStore()
const {
  currentPage: dashboardPage,
  isSelectionMultiple,
  selectedTorrents,
  displayMode,
  torrentCountString
} = storeToRefs(dashboardStore)
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const torrentStore = useTorrentStore()
const { filteredTorrents, sortOptions } = storeToRefs(torrentStore)
const vuetorrentStore = useVueTorrentStore()

const torrentSortOptions = [
  { value: 'added_on', title: t('dashboard.sortBy.added_on') },
  { value: 'amount_left', title: t('dashboard.sortBy.amount_left') },
  { value: 'auto_tmm', title: t('dashboard.sortBy.auto_tmm') },
  { value: 'availability', title: t('dashboard.sortBy.availability') },
  { value: 'avg_download_speed', title: t('dashboard.sortBy.avg_download_speed') },
  { value: 'avg_upload_speed', title: t('dashboard.sortBy.avg_upload_speed') },
  { value: 'category', title: t('dashboard.sortBy.category') },
  { value: 'completed', title: t('dashboard.sortBy.completed') },
  { value: 'completion_on', title: t('dashboard.sortBy.completion_on') },
  { value: 'content_path', title: t('dashboard.sortBy.content_path') },
  { value: 'dl_limit', title: t('dashboard.sortBy.dl_limit') },
  { value: 'dlspeed', title: t('dashboard.sortBy.dlspeed') },
  { value: 'download_path', title: t('dashboard.sortBy.download_path') },
  { value: 'downloaded', title: t('dashboard.sortBy.downloaded') },
  { value: 'downloaded_session', title: t('dashboard.sortBy.downloaded_session') },
  { value: 'eta', title: t('dashboard.sortBy.eta') },
  { value: 'f_l_piece_prio', title: t('dashboard.sortBy.f_l_piece_prio') },
  { value: 'force_start', title: t('dashboard.sortBy.force_start') },
  { value: 'globalSpeed', title: t('dashboard.sortBy.globalSpeed') },
  { value: 'globalVolume', title: t('dashboard.sortBy.globalVolume') },
  { value: 'hash', title: t('dashboard.sortBy.hash') },
  { value: 'infohash_v1', title: t('dashboard.sortBy.infohash_v1') },
  { value: 'infohash_v2', title: t('dashboard.sortBy.infohash_v2') },
  { value: 'last_activity', title: t('dashboard.sortBy.last_activity') },
  { value: 'magnet_uri', title: t('dashboard.sortBy.magnet_uri') },
  { value: 'max_ratio', title: t('dashboard.sortBy.max_ratio') },
  { value: 'max_seeding_time', title: t('dashboard.sortBy.max_seeding_time') },
  { value: 'name', title: t('dashboard.sortBy.name') },
  { value: 'num_complete', title: t('dashboard.sortBy.num_complete') },
  { value: 'num_incomplete', title: t('dashboard.sortBy.num_incomplete') },
  { value: 'num_leechs', title: t('dashboard.sortBy.num_leechs') },
  { value: 'num_seeds', title: t('dashboard.sortBy.num_seeds') },
  { value: 'priority', title: t('dashboard.sortBy.priority') },
  { value: 'progress', title: t('dashboard.sortBy.progress') },
  { value: 'ratio', title: t('dashboard.sortBy.ratio') },
  { value: 'ratio_limit', title: t('dashboard.sortBy.ratio_limit') },
  { value: 'save_path', title: t('dashboard.sortBy.save_path') },
  { value: 'seeding_time', title: t('dashboard.sortBy.seeding_time') },
  { value: 'seeding_time_limit', title: t('dashboard.sortBy.seeding_time_limit') },
  { value: 'seen_complete', title: t('dashboard.sortBy.seen_complete') },
  { value: 'seq_dl', title: t('dashboard.sortBy.seq_dl') },
  { value: 'size', title: t('dashboard.sortBy.size') },
  { value: 'state', title: t('dashboard.sortBy.state') },
  { value: 'super_seeding', title: t('dashboard.sortBy.super_seeding') },
  { value: 'tags', title: t('dashboard.sortBy.tags') },
  { value: 'time_active', title: t('dashboard.sortBy.time_active') },
  { value: 'total_size', title: t('dashboard.sortBy.total_size') },
  { value: 'tracker', title: t('dashboard.sortBy.tracker') },
  { value: 'trackers_count', title: t('dashboard.sortBy.trackers_count') },
  { value: 'up_limit', title: t('dashboard.sortBy.up_limit') },
  { value: 'uploaded', title: t('dashboard.sortBy.uploaded') },
  { value: 'uploaded_session', title: t('dashboard.sortBy.uploaded_session') },
  { value: 'upspeed', title: t('dashboard.sortBy.upspeed') }
].sort((a, b) => a.title.localeCompare(b.title))
torrentSortOptions.splice(0, 0, { value: '', title: t('dashboard.sortBy.default') })

const isSearchFilterVisible = ref(false)
const trcProperties = reactive({
  isVisible: false,
  offset: [0, 0]
})

const torrentTitleFilter = computed({
  get: () => torrentStore.textFilter,
  set: debounce((newValue: string | null) => {
    torrentStore.textFilter = newValue ?? ''
  }, 300)
})

const isListView = computed(() => displayMode.value === DashboardDisplayMode.LIST)
const isGridView = computed(() => displayMode.value === DashboardDisplayMode.GRID)
const isTableView = computed(() => displayMode.value === DashboardDisplayMode.TABLE)

const {
  paginatedResults: paginatedTorrents,
  currentPage,
  pageCount
} = useArrayPagination(filteredTorrents, vuetorrentStore.paginationSize, dashboardPage)
const hasSearchFilter = computed(() => !!torrentStore.textFilter && torrentStore.textFilter.length > 0)

const isAllTorrentsSelected = computed(() => filteredTorrents.value.length <= selectedTorrents.value.length)

function toggleSearchFilter(forceState?: boolean) {
  isSearchFilterVisible.value = forceState ?? !isSearchFilterVisible.value
  if (isSearchFilterVisible.value) {
    nextTick(() => {
      const searchInput = document.getElementById('searchInput')
      searchInput?.focus()
    })
  }
}

function resetInput() {
  torrentStore.textFilter = ''
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleSelectMode() {
  if (isSelectionMultiple.value) {
    dashboardStore.unselectAllTorrents()
  }
  isSelectionMultiple.value = !isSelectionMultiple.value
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

function onClick(_: PointerEvent, torrent: TorrentType) {
  dashboardStore.toggleSelect(torrent.hash)
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
    if (document.activeElement === searchInput || isSearchFilterVisible.value) {
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
    if (document.activeElement !== searchInput && !isSearchFilterVisible.value) {
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
  toggleSearchFilter(hasSearchFilter.value)
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
    <v-row class="ma-0 pa-0 mb-2">
      <v-expand-x-transition>
        <v-card v-show="isSearchFilterVisible" color="transparent">
          <v-text-field
            id="searchInput"
            v-model="torrentTitleFilter"
            :label="t('dashboard.searchInputLabel')"
            clearable
            density="compact"
            hide-details
            prepend-inner-icon="mdi-magnify"
            rounded="pill"
            single-line
            style="width: 200px"
            variant="solo"
            @click:clear="resetInput()" />
        </v-card>
      </v-expand-x-transition>
      <v-tooltip :text="t('dashboard.toggleSearchFilter')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn :icon="isSearchFilterVisible ? 'mdi-chevron-left-circle' : 'mdi-text-box-search'" v-bind="props" variant="plain" @click="toggleSearchFilter()" />
        </template>
      </v-tooltip>
      <v-tooltip :text="t('dashboard.toggleSelectMode')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn :icon="isSelectionMultiple ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'" v-bind="props" variant="plain" @click="toggleSelectMode" />
        </template>
      </v-tooltip>
      <v-menu>
        <template v-slot:activator="{ props: menu }">
          <v-tooltip :text="$t('dashboard.displayMode.title')" location="top">
            <template v-slot:activator="{ props: tooltip }">
              <v-btn icon v-bind="mergeProps(menu, tooltip)" variant="plain">
                <v-icon v-if="displayMode === DashboardDisplayMode.LIST" icon="mdi-view-list" />
                <v-icon v-if="displayMode === DashboardDisplayMode.GRID" icon="mdi-view-grid" />
                <v-icon v-if="displayMode === DashboardDisplayMode.TABLE" icon="mdi-table" />
              </v-btn>
            </template>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item :title="$t('dashboard.displayMode.list')" prepend-icon="mdi-view-list"
                       @click="displayMode = DashboardDisplayMode.LIST" />
          <v-list-item :title="$t('dashboard.displayMode.grid')" prepend-icon="mdi-view-grid"
                       @click="displayMode = DashboardDisplayMode.GRID" />
          <v-list-item :title="$t('dashboard.displayMode.table')" prepend-icon="mdi-table"
                       @click="displayMode = DashboardDisplayMode.TABLE" />
        </v-list>
      </v-menu>
      <v-tooltip :text="t('dashboard.toggleSortOrder')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            :icon="sortOptions.reverseOrder ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
            v-bind="props"
            variant="plain"
            @click="sortOptions.reverseOrder = !sortOptions.reverseOrder" />
        </template>
      </v-tooltip>
      <div class="pa-0" style="width: 10em">
        <v-autocomplete
          v-model="sortOptions.sortBy"
          :items="torrentSortOptions"
          :label="t('dashboard.sortLabel')"
          auto-select-first
          density="compact"
          hide-details
          variant="solo-filled" />
      </div>
      <v-col class="align-center justify-center">
        <span class="text-uppercase" style="float: right; font-size: 0.8em">
          {{ torrentCountString }}
        </span>
      </v-col>
    </v-row>
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

    <div v-if="vuetorrentStore.isPaginationOnTop && !vuetorrentStore.isInfiniteScrollActive">
      <v-pagination v-model="currentPage" :length="pageCount"
                    next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="scrollToTop" />
    </div>

    <ListView v-if="isListView"
              :paginated-torrents="paginatedTorrents" @goToInfo="goToInfo"
              @onClick="onClick" @onRightClick="onRightClick" @startPress="startPress" @endPress="endPress" />
    <GridView v-else-if="isGridView" class="mb-2"
              :paginated-torrents="paginatedTorrents" @goToInfo="goToInfo"
              @onClick="onClick" @onRightClick="onRightClick" @startPress="startPress" @endPress="endPress" />
    <TableView v-else-if="isTableView"
               :paginated-torrents="paginatedTorrents" @goToInfo="goToInfo"
               @onClick="onClick" @onRightClick="onRightClick" @startPress="startPress" @endPress="endPress" />

    <div v-if="!vuetorrentStore.isPaginationOnTop && !vuetorrentStore.isInfiniteScrollActive">
      <v-pagination v-model="currentPage" :length="pageCount"
                    next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="scrollToTop" />
    </div>
  </div>

  <div :style="`position: absolute; left: ${trcProperties.offset[0]}px; top: ${trcProperties.offset[1]}px;`">
    <RightClickMenu v-model="trcProperties.isVisible" />
  </div>
</template>

<style scoped>

</style>
