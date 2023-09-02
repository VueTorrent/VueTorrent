<script setup lang="ts">
import debounce from 'lodash.debounce'
import RightClickMenu from '@/components/Dashboard/TRC/RightClickMenu.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { doesCommand } from '@/helpers'
import Torrent from '@/components/Dashboard/Torrent.vue'
import { Torrent as TorrentType } from '@/types/VueTorrent'
import { useDashboardStore, useMaindataStore, useNavbarStore, useVueTorrentStore } from '@/stores'
import { computed, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'


const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const display = useDisplay()
const dashboardStore = useDashboardStore()
const maindataStore = useMaindataStore()
const navbarStore = useNavbarStore()
const vuetorrentStore = useVueTorrentStore()

const sortOptions = [
  { value: 'added_on', title: t('dashboard.sortBy.added_on') },
  { value: 'amount_left', title: t('dashboard.sortBy.amount_left') },
  { value: 'auto_tmm', title: t('dashboard.sortBy.auto_tmm') },
  { value: 'availability', title: t('dashboard.sortBy.availability') },
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
sortOptions.splice(0, 0, { value: '', title: t('dashboard.sortBy.default') })

const isSearchFilterVisible = ref(false)
const isDeleteDialogVisible = ref(false)
const trcProperties = reactive({
  isVisible: false,
  anchor: '',
  offset: [0, 0]
})

const searchFilter = computed({
  get: () => dashboardStore.searchFilter,
  set: debounce((newValue: string) => {
    dashboardStore.searchFilter = newValue
  }, 300)
})
const pageCount = computed(() => Math.ceil(dashboardStore.filteredTorrents.length / vuetorrentStore.paginationSize))
const paginatedData = computed(() => {
  const start = (dashboardStore.currentPage - 1) * vuetorrentStore.paginationSize
  const end = start + vuetorrentStore.paginationSize
  return dashboardStore.filteredTorrents.slice(start, end)
})
const hasSearchFilter = computed(() => !!searchFilter.value && searchFilter.value.length > 0)

const isAllTorrentsSelected = computed(() => dashboardStore.filteredTorrents.length <= dashboardStore.selectedTorrents.length)

const isDialogVisible = computed(() => isDeleteDialogVisible.value || navbarStore.addTorrentDialogVisible)

function toggleSelectTorrent(hash: string) {
  dashboardStore.toggleSelect(hash)
}

function goToInfo(hash: string) {
  if (!dashboardStore.isSelectionMultiple) {
    router.push({ name: 'torrentDetail', params: { hash } })
  }
}

function resetInput() {
  searchFilter.value = ''
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleSelectMode() {
  if (dashboardStore.isSelectionMultiple) {
    dashboardStore.unselectAllTorrents()
  }
  dashboardStore.isSelectionMultiple = !dashboardStore.isSelectionMultiple
}

function toggleSelectAll() {
  if (isAllTorrentsSelected.value) {
    dashboardStore.unselectAllTorrents()
  } else {
    dashboardStore.selectAllTorrents()
  }
}

function onRightClick(e: PointerEvent, torrent: TorrentType) {
  e.preventDefault()
  trcProperties.isVisible = true
  trcProperties.anchor = `#torrent-${torrent.hash}`
  trcProperties.offset = [e.offsetX, e.offsetY]

  if (!dashboardStore.isSelectionMultiple) {
    dashboardStore.unselectAllTorrents()
    dashboardStore.selectTorrent(torrent.hash)
  }
}

watch(() => trcProperties.isVisible, (newValue) => {
  if (!newValue && !dashboardStore.isSelectionMultiple) {
    dashboardStore.unselectAllTorrents()
  }
})

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (isDialogVisible.value) {
    //e.preventDefault()
    return false
  }

  const targetNode = e.target as Element

  // 'ctrl + A' => select torrents
  if (doesCommand(e) && e.key === 'a' && targetNode.tagName !== 'INPUT') {
    e.preventDefault()
    dashboardStore.selectAllTorrents()
    return true
  }

  // 'ctrl + F' => Focus search filter field
  if (doesCommand(e) && e.key === 'f') {
    const searchInput = document.getElementById('searchInput')
    if (document.activeElement !== searchInput) {
      e.preventDefault()
      isSearchFilterVisible.value = true
      if (searchInput) searchInput.focus()
      else console.error('searchInput not accessible')
    }
  }

  // 'Escape' => Remove focus from search field
  if (e.key === 'Escape') {
    const searchInput = document.getElementById('searchInput')
    isSearchFilterVisible.value = false

    if (searchInput) searchInput.blur()
    else console.error('searchInput not accessible')
  }

  // 'Delete' => Delete modal
  if (e.key === 'Delete') {
    e.preventDefault()

    // no torrents select to delete
    if (dashboardStore.selectedTorrents.length === 0) return

    isDeleteDialogVisible.value = true
  }

  // 'Search' => Search view
  if (e.key === '/'
    && route.name !== 'searchEngine'
    && document.activeElement !== document.getElementById('searchInput')) {
    router.push({ name: 'searchEngine' })
  }
}

onBeforeMount(async () => {
  await maindataStore.fetchCategories()
  await maindataStore.fetchTags()
  isSearchFilterVisible.value = hasSearchFilter.value
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
  dashboardStore.isSelectionMultiple = false
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
        <v-card v-show="isSearchFilterVisible"
                color="transparent">
          <v-text-field id="searchInput"
                        v-model="searchFilter"
                        clearable
                        density="compact"
                        variant="solo"
                        hide-details
                        :label="t('dashboard.searchInputLabel')"
                        prepend-inner-icon="mdi-magnify"
                        single-line
                        rounded="pill"
                        style="width: 200px;"
                        @click:clear="resetInput()"
          />
        </v-card>
      </v-expand-x-transition>
      <v-tooltip :text="t('dashboard.toggleSearchFilter')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn :icon="isSearchFilterVisible ? 'mdi-chevron-left-circle' : 'mdi-text-box-search'"
                 v-bind="props"
                 variant="plain"
                 @click="isSearchFilterVisible = !isSearchFilterVisible" />
        </template>
      </v-tooltip>
      <v-tooltip :text="t('dashboard.toggleSelectMode')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn :icon="dashboardStore.isSelectionMultiple ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                 v-bind="props"
                 variant="plain"
                 @click="toggleSelectMode" />
        </template>
      </v-tooltip>
      <v-tooltip :text="t('dashboard.toggleSortOrder')" location="top">
        <template v-slot:activator="{props}">
          <v-btn :icon="dashboardStore.sortOptions.reverseOrder ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'"
                 v-bind="props"
                 variant="plain"
                 @click="dashboardStore.sortOptions.reverseOrder = !dashboardStore.sortOptions.reverseOrder" />
        </template>
      </v-tooltip>
      <div class="pa-0">
        <v-autocomplete v-model="dashboardStore.sortOptions.sortBy"
                        auto-select-first
                        :items="sortOptions"
                        density="compact"
                        variant="solo"
                        hide-details
                        :label="t('dashboard.sortLabel')"
                        rounded="pill" />
      </div>
      <v-col cols="12" v-if="vuetorrentStore.isPaginationOnTop" class="pa-0">
        <v-pagination v-model="dashboardStore.currentPage"
                      :length="pageCount"
                      total-visible="7"
                      @input="scrollToTop" />
      </v-col>
      <v-col class="align-center justify-center">
        <span style="float: right; font-size: 0.8em" class="text-uppercase">
          {{ dashboardStore.torrentCountString }}
        </span>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-expand-transition>
        <v-card v-show="dashboardStore.isSelectionMultiple" color="transparent">
          <v-tooltip :text="t('common.selectAll')" location="bottom">
            <template v-slot:activator="{props}">
              <v-btn :icon="isAllTorrentsSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                     v-bind="props"
                     color="transparent"
                     style="left: -8px"
                     class="text-grey"
                     @click="toggleSelectAll" />
            </template>
          </v-tooltip>
          <span class="text-grey">{{ t('dashboard.selectAll') }}</span>
        </v-card>
      </v-expand-transition>
    </v-row>
    <div v-if="dashboardStore.filteredTorrents.length === 0" class="mt-5 text-xs-center">
      <p class="text-grey">{{ t('dashboard.emptyTorrentList') }}</p>
    </div>
    <div v-else>
      <v-list class="pa-0" color="transparent" id="torrentList">
        <v-list-item v-for="torrent in paginatedData"
                     :id="`torrent-${torrent.hash}`"
                     class="pa-0"
                     :class="display.mobile ? 'mb-2' : 'mb-4'"
                     @dblclick.prevent="goToInfo(torrent.hash)"
                     @contextmenu="onRightClick($event, torrent)">
          <div class="d-flex align-center">
            <v-expand-x-transition>
              <v-card v-show="dashboardStore.isSelectionMultiple" color="transparent" class="mr-3">
                <v-btn
                  :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                  color="transparent"
                  variant="flat"
                  @click="toggleSelectTorrent(torrent.hash)" />
              </v-card>
            </v-expand-x-transition>
            <Torrent :torrent="torrent" />
          </div>
        </v-list-item>
      </v-list>
    </div>
  </div>
  <RightClickMenu v-model="trcProperties.isVisible" :anchor="trcProperties.anchor" />
  <ConfirmDeleteDialog v-if="isDeleteDialogVisible"
                       v-model="isDeleteDialogVisible"
                       disable-activator
                       :hashes="dashboardStore.selectedTorrents" />
</template>

<style>
#torrentList {
  background-color: unset;
}
</style>