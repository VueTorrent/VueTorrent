<script setup lang="ts">
import RightClickMenu from '@/components/Dashboard/RightClickMenu.vue'
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

const trcTorrent = ref<TorrentType>()
const trcMenu = reactive({
  isShown: false,
  x: 0,
  y: 0
})
const tmCalc = reactive({
  isTouchModeEnabled: false,
  touchTimer: undefined as NodeJS.Timeout | undefined,
  lastFinger: 0,
  lastHash: ''
})
const trcMoveTick = ref(0)
const isSearchFilterVisible = ref(false)
const isSortVisible = ref(false)
const isDeleteDialogVisible = ref(false)

const searchFilter = computed({
  get: () => dashboardStore.searchFilter,
  set: (newValue) => {
    //TODO: debounce
    dashboardStore.searchFilter = newValue
  }
})
const pageCount = computed(() => Math.ceil(torrents.value.length / vuetorrentStore.paginationSize))
const paginatedData = computed(() => {
  const start = (dashboardStore.currentPage - 1) * vuetorrentStore.paginationSize
  const end = start + vuetorrentStore.paginationSize
  return torrents.value.slice(start, end)
})
const hasSearchFilter = computed(() => searchFilter && searchFilter.value.length > 0)
const torrents = computed<TorrentType[]>(() => {
  const results = []
  const query = searchFilter.value.split(/[ ,-]/i)

  for (const torrent of maindataStore.torrents) {
    if (query.some(value => torrent.name.includes(value))) {
      results.push(torrent)
    }
  }

  if (dashboardStore.sortOptions.isCustomSortEnabled) {
    if (dashboardStore.sortOptions.sortBy === 'priority') {
      results.sort((a, b) => {
        if (a.priority > 0 && b.priority > 0) return a.priority - b.priority
        else if (a.priority <= 0 && b.priority <= 0) return a.raw_added_on - b.raw_added_on
        else if (a.priority <= 0) return 1
        else return -1
      })
    } else {
      results.sort((a, b) =>
        a[dashboardStore.sortOptions.sortBy] - b[dashboardStore.sortOptions.sortBy]
        || a.raw_added_on - b.raw_added_on)
    }
    if (dashboardStore.sortOptions.reverseOrder) results.reverse()
  }

  return results
})
const isAllTorrentsSelected = computed(() => torrents.value.length <= dashboardStore.selectedTorrents.length)

const isDialogVisible = computed(() => isDeleteDialogVisible.value || navbarStore.addTorrentDialogVisible)

function showTorrentRightClickMenu(e: MouseEvent | Touch, torrent: TorrentType, isTouchModeEnabled = false) {
  if (trcMenu.isShown) return false

  trcTorrent.value = torrent
  if ('preventDefault' in e) e.preventDefault()

  if (!dashboardStore.isSelectionMultiple) selectTorrent(torrent.hash)
  tmCalc.isTouchModeEnabled = isTouchModeEnabled
  trcMenu.x = e.clientX + (isTouchModeEnabled ? 12 : 6)
  trcMenu.y = e.clientY + (isTouchModeEnabled ? 12 : 6)
  trcMenu.isShown = true
}

function hideTorrentRightClickMenu() {
  if (!dashboardStore.isSelectionMultiple && !isDialogVisible.value) dashboardStore.unselectAllTorrents()
  trcMenu.isShown = false
}

function goToInfo(hash: string) {
  if (!dashboardStore.isSelectionMultiple) {
    router.push({ name: 'torrentDetail', params: { hash } })
  }
}

function resetInput() {
  dashboardStore.searchFilter = ''
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

function selectTorrent(hash: string) {
  if (!dashboardStore.isSelectionMultiple) dashboardStore.isSelectionMultiple = true
  if (dashboardStore.isTorrentInSelection(hash)) {
    dashboardStore.unselectTorrent(hash)
  } else {
    dashboardStore.selectTorrent(hash)
  }
}

function toggleSelectAll() {
  if (isAllTorrentsSelected.value) {
    dashboardStore.unselectAllTorrents()
  } else {
    dashboardStore.selectAllTorrents()
  }
}

function strTouchStart(e: TouchEvent, torrent: TorrentType) {
  trcMoveTick.value = 0
  hideTorrentRightClickMenu()
  clearTimeout(tmCalc.touchTimer)
  if (e.touches.length === 1) {
    // one finger only
    tmCalc.lastFinger = 1
    tmCalc.touchTimer = setTimeout(() => showTorrentRightClickMenu(e.touches[0], torrent, true), 400)
  }
  if (e.touches.length === 2) {
    // two finger
    tmCalc.lastFinger = 2
    if (tmCalc.lastHash === torrent.hash) {
      e.preventDefault()
      showTorrentRightClickMenu(e.touches[0], torrent, true)
    }
  }
  tmCalc.lastHash = torrent.hash
}

function strTouchMove(e: TouchEvent) {
  trcMoveTick.value++
  if (trcMenu.isShown && e.touches.length > 1) e.preventDefault()
  else if (trcMoveTick.value > 1 && e.touches.length === 1) {
    if (tmCalc.lastFinger === 1) hideTorrentRightClickMenu()
    clearTimeout(tmCalc.touchTimer)
  }
}

function strTouchEnd(e: TouchEvent) {
  clearTimeout(tmCalc.touchTimer)
  if (trcMenu.isShown) e.preventDefault()
}

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

/*
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
    document.removeEventListener('dragenter', this.detectDragEnter)
  },
 */

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

watch(torrents, (newValue) => {
  const pageCount = Math.ceil(newValue.length / vuetorrentStore.paginationSize)
  if (pageCount < dashboardStore.currentPage) {
    dashboardStore.currentPage = Math.max(1, pageCount)
  }
})
</script>

<template>
  <div class="pt-4 px-1 px-sm-5">
    <v-row class="ma-0 pa-0 mb-2">
      <v-expand-x-transition>
        <v-card v-show="isSearchFilterVisible"
                color="transparent">
          <v-text-field id="searchInput"
                        v-model="dashboardStore.searchFilter"
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
      <div class=" pa-0">
        <v-select v-model="dashboardStore.sortOptions.sortBy"
                  :items="sortOptions"
                  density="compact"
                  variant="solo"
                  hide-details
                  :label="t('dashboard.sortLabel')"
                  rounded="pill" />
      </div>
      <div v-if="vuetorrentStore.isPaginationOnTop" class="pa-0 v-col-12">
        <v-pagination v-model="dashboardStore.currentPage"
                      :length="pageCount"
                      total-visible="7"
                      @input="scrollToTop" />
      </div>
<!--      TODO-->
<!--      <div class="d-flex align-center text-uppercase">-->
<!--        {{ dashboardStore.torrentCountString }}-->
<!--      </div>-->
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-expand-transition>
        <v-card v-show="dashboardStore.isSelectionMultiple" color="transparent" height="40">
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
    <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
      <p class="text-grey">{{ t('dashboard.emptyTorrentList') }}</p>
    </div>
    <div v-else>
      <v-list class="pa-0 transparent">
        <v-list-item
          v-for="torrent in paginatedData"
          class="pa-0"
          :class="display.mobile ? 'mb-1' : 'mb-2'"
          @mousedown="hideTorrentRightClickMenu"
          @touchstart="strTouchStart($event, torrent)"
          @touchmove="strTouchMove($event)"
          @touchend="strTouchEnd($event)"
          @contextmenu="showTorrentRightClickMenu($event, torrent)"
          @dblclick.prevent="goToInfo(torrent.hash)"
        >
          <v-expand-x-transition>
            <v-card v-show="dashboardStore.isSelectionMultiple" flat class="transparent">
              <v-list-item-action>
                <v-checkbox :value="dashboardStore.isTorrentInSelection(torrent.hash)"
                            color="grey"
                            @click.prevent="selectTorrent(torrent.hash)" />
              </v-list-item-action>
            </v-card>
          </v-expand-x-transition>
          <div class="pa-0 rounded">
            <Torrent :torrent="torrent" />
          </div>
        </v-list-item>
      </v-list>
    </div>
    <v-menu v-model="trcMenu.isShown"
            transition="slide-y-transition"
            :position-x="trcMenu.x"
            :position-y="trcMenu.y"
            absolute
            @input="hideTorrentRightClickMenu">
      <RightClickMenu v-if="trcTorrent" :hash="trcTorrent.hash" :touchmode="tmCalc.isTouchModeEnabled" :x="trcMenu.x" />
    </v-menu>
  </div>
  <ConfirmDeleteDialog v-model="isDeleteDialogVisible" disable-activator :hashes="dashboardStore.selectedTorrents" />
</template>

<style scoped>

</style>