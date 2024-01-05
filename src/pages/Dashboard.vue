<script lang="ts" setup>
import RightClickMenu from '@/components/Dashboard/TRC/RightClickMenu.vue'
import GridView from '@/components/Dashboard/Views/Grid/GridView.vue'
import ListView from '@/components/Dashboard/Views/List/ListView.vue'
import TableView from '@/components/Dashboard/Views/Table/TableView.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { useArrayPagination } from '@/composables'
import { SortOptions } from '@/constants/qbit'
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
const { currentPage: dashboardPage, isSelectionMultiple, selectedTorrents, displayMode, torrentCountString } = storeToRefs(dashboardStore)
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const torrentStore = useTorrentStore()
const { filteredTorrents, sortOptions } = storeToRefs(torrentStore)
const vuetorrentStore = useVueTorrentStore()

const torrentSortOptions = [
  { value: SortOptions.ADDED_ON, title: t('dashboard.sortBy.added_on') },
  { value: SortOptions.AMOUNT_LEFT, title: t('dashboard.sortBy.amount_left') },
  { value: SortOptions.AUTO_TMM, title: t('dashboard.sortBy.auto_tmm') },
  { value: SortOptions.AVAILABILITY, title: t('dashboard.sortBy.availability') },
  { value: SortOptions.AVG_DOWNLOAD_SPEED, title: t('dashboard.sortBy.avg_download_speed') },
  { value: SortOptions.AVG_UPLOAD_SPEED, title: t('dashboard.sortBy.avg_upload_speed') },
  { value: SortOptions.CATEGORY, title: t('dashboard.sortBy.category') },
  { value: SortOptions.COMPLETED, title: t('dashboard.sortBy.completed') },
  { value: SortOptions.COMPLETION_ON, title: t('dashboard.sortBy.completion_on') },
  { value: SortOptions.CONTENT_PATH, title: t('dashboard.sortBy.content_path') },
  { value: SortOptions.DL_LIMIT, title: t('dashboard.sortBy.dl_limit') },
  { value: SortOptions.DLSPEED, title: t('dashboard.sortBy.dlspeed') },
  { value: SortOptions.DOWNLOAD_PATH, title: t('dashboard.sortBy.download_path') },
  { value: SortOptions.DOWNLOADED, title: t('dashboard.sortBy.downloaded') },
  { value: SortOptions.DOWNLOADED_SESSION, title: t('dashboard.sortBy.downloaded_session') },
  { value: SortOptions.ETA, title: t('dashboard.sortBy.eta') },
  { value: SortOptions.F_L_PIECE_PRIO, title: t('dashboard.sortBy.f_l_piece_prio') },
  { value: SortOptions.FORCE_START, title: t('dashboard.sortBy.force_start') },
  { value: SortOptions.GLOBALSPEED, title: t('dashboard.sortBy.globalSpeed') },
  { value: SortOptions.GLOBALVOLUME, title: t('dashboard.sortBy.globalVolume') },
  { value: SortOptions.HASH, title: t('dashboard.sortBy.hash') },
  { value: SortOptions.INFOHASH_V1, title: t('dashboard.sortBy.infohash_v1') },
  { value: SortOptions.INFOHASH_V2, title: t('dashboard.sortBy.infohash_v2') },
  { value: SortOptions.LAST_ACTIVITY, title: t('dashboard.sortBy.last_activity') },
  { value: SortOptions.MAGNET_URI, title: t('dashboard.sortBy.magnet_uri') },
  { value: SortOptions.MAX_RATIO, title: t('dashboard.sortBy.max_ratio') },
  { value: SortOptions.MAX_SEEDING_TIME, title: t('dashboard.sortBy.max_seeding_time') },
  { value: SortOptions.NAME, title: t('dashboard.sortBy.name') },
  { value: SortOptions.NUM_COMPLETE, title: t('dashboard.sortBy.num_complete') },
  { value: SortOptions.NUM_INCOMPLETE, title: t('dashboard.sortBy.num_incomplete') },
  { value: SortOptions.NUM_LEECHS, title: t('dashboard.sortBy.num_leechs') },
  { value: SortOptions.NUM_SEEDS, title: t('dashboard.sortBy.num_seeds') },
  { value: SortOptions.PRIORITY, title: t('dashboard.sortBy.priority') },
  { value: SortOptions.PROGRESS, title: t('dashboard.sortBy.progress') },
  { value: SortOptions.RATIO, title: t('dashboard.sortBy.ratio') },
  { value: SortOptions.RATIO_LIMIT, title: t('dashboard.sortBy.ratio_limit') },
  { value: SortOptions.SAVE_PATH, title: t('dashboard.sortBy.save_path') },
  { value: SortOptions.SEEDING_TIME, title: t('dashboard.sortBy.seeding_time') },
  { value: SortOptions.SEEDING_TIME_LIMIT, title: t('dashboard.sortBy.seeding_time_limit') },
  { value: SortOptions.SEEN_COMPLETE, title: t('dashboard.sortBy.seen_complete') },
  { value: SortOptions.SEQ_DL, title: t('dashboard.sortBy.seq_dl') },
  { value: SortOptions.SIZE, title: t('dashboard.sortBy.size') },
  { value: SortOptions.STATE, title: t('dashboard.sortBy.state') },
  { value: SortOptions.SUPER_SEEDING, title: t('dashboard.sortBy.super_seeding') },
  { value: SortOptions.TAGS, title: t('dashboard.sortBy.tags') },
  { value: SortOptions.TIME_ACTIVE, title: t('dashboard.sortBy.time_active') },
  { value: SortOptions.TOTAL_SIZE, title: t('dashboard.sortBy.total_size') },
  { value: SortOptions.TRACKER, title: t('dashboard.sortBy.tracker') },
  { value: SortOptions.TRACKERS_COUNT, title: t('dashboard.sortBy.trackers_count') },
  { value: SortOptions.UP_LIMIT, title: t('dashboard.sortBy.up_limit') },
  { value: SortOptions.UPLOADED, title: t('dashboard.sortBy.uploaded') },
  { value: SortOptions.UPLOADED_SESSION, title: t('dashboard.sortBy.uploaded_session') },
  { value: SortOptions.UPSPEED, title: t('dashboard.sortBy.upspeed') }
].sort((a, b) => a.title.localeCompare(b.title))
torrentSortOptions.splice(0, 0, { value: SortOptions.DEFAULT, title: t('dashboard.sortBy.default') })

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

const { paginatedResults: paginatedTorrents, currentPage, pageCount } = useArrayPagination(filteredTorrents, vuetorrentStore.paginationSize, dashboardPage)
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
          <v-list-item :title="$t('dashboard.displayMode.list')" prepend-icon="mdi-view-list" @click="displayMode = DashboardDisplayMode.LIST" />
          <v-list-item :title="$t('dashboard.displayMode.grid')" prepend-icon="mdi-view-grid" @click="displayMode = DashboardDisplayMode.GRID" />
          <v-list-item :title="$t('dashboard.displayMode.table')" prepend-icon="mdi-table" @click="displayMode = DashboardDisplayMode.TABLE" />
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
  display: none
}
</style>
