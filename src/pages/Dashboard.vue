<script lang="ts" setup>
import RightClickMenu from '@/components/Core/RightClickMenu'
import Toolbar from '@/components/Dashboard/Toolbar.vue'
import GridView from '@/components/Dashboard/Views/Grid/GridView.vue'
import ListView from '@/components/Dashboard/Views/List/ListView.vue'
import TableView from '@/components/Dashboard/Views/Table/TableView.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import MoveTorrentDialog from '@/components/Dialogs/MoveTorrentDialog.vue'
import RenameTorrentDialog from '@/components/Dialogs/RenameTorrentDialog.vue'
import ShareLimitDialog from '@/components/Dialogs/ShareLimitDialog.vue'
import SpeedLimitDialog from '@/components/Dialogs/SpeedLimitDialog.vue'
import { useArrayPagination } from '@/composables'
import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { doesCommand } from '@/helpers'
import {
  useDashboardStore,
  useDialogStore,
  useMaindataStore,
  usePreferenceStore,
  useTorrentStore,
  useVueTorrentStore
} from '@/stores'
import { Torrent as TorrentType, TRCMenuEntry } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const { t } = useI18n()
const router = useRouter()
const dashboardStore = useDashboardStore()
const { currentPage: dashboardPage, isSelectionMultiple, selectedTorrents, displayMode } = storeToRefs(dashboardStore)
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()
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

const isMultiple = computed(() => dashboardStore.selectedTorrents.length > 1)
const hashes = computed(() => dashboardStore.selectedTorrents)
const hash = computed(() => hashes.value[0])
const torrent = computed(() => torrentStore.getTorrentByHash(hash.value))
const torrents = computed(() => dashboardStore.selectedTorrents.map(torrentStore.getTorrentByHash).filter(torrent => !!torrent))
const availableCategories = computed(() => [{ name: '' }, ...maindataStore.categories])

async function resumeTorrents() {
  await torrentStore.resumeTorrents(hashes)
}

async function forceResumeTorrents() {
  await torrentStore.forceResumeTorrents(hashes)
}

async function pauseTorrents() {
  await torrentStore.pauseTorrents(hashes)
}

function deleteTorrents() {
  dialogStore.createDialog(ConfirmDeleteDialog, { hashes: [...dashboardStore.selectedTorrents] })
}

function setDownloadPath() {
  dialogStore.createDialog(MoveTorrentDialog, { hashes: [...dashboardStore.selectedTorrents], mode: 'dl' })
}

function setSavePath() {
  dialogStore.createDialog(MoveTorrentDialog, { hashes: [...dashboardStore.selectedTorrents], mode: 'save' })
}

function renameTorrents() {
  dialogStore.createDialog(RenameTorrentDialog, { hash: dashboardStore.selectedTorrents[0] })
}

async function forceRecheck() {
  await torrentStore.recheckTorrents(hashes)
}

async function forceReannounce() {
  await maindataStore.reannounceTorrents(hashes)
}

async function toggleSeqDl() {
  await maindataStore.toggleSeqDl(hashes)
}

async function toggleFLPiecePrio() {
  await maindataStore.toggleFLPiecePrio(hashes)
}

async function toggleAutoTMM() {
  await maindataStore.toggleAutoTmm(hashes, !torrent.value?.auto_tmm)
}

function hasTag(tag: string) {
  return torrents.value.every(torrent => torrent && torrent.tags && torrent.tags.includes(tag))
}

async function toggleTag(tag: string) {
  if (hasTag(tag)) await torrentStore.removeTorrentTags(hashes.value, [tag])
  else await torrentStore.addTorrentTags(hashes.value, [tag])
}

async function copyValue(valueToCopy: string) {
  try {
    await navigator.clipboard.writeText(valueToCopy)
  } catch (error) {
    toast.error(t('toast.copy.error'))
    return
  }

  toast.success(t('toast.copy.success'))
}

function setDownloadLimit() {
  dialogStore.createDialog(SpeedLimitDialog, { hashes: hashes.value, mode: 'download' })
}

function setUploadLimit() {
  dialogStore.createDialog(SpeedLimitDialog, { hashes: hashes.value, mode: 'upload' })
}

function setShareLimit() {
  dialogStore.createDialog(ShareLimitDialog, { hashes: hashes.value })
}

async function exportTorrents() {
  hashes.value.forEach(hash => {
    torrentStore.exportTorrent(hash).then(blob => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.style.opacity = '0'
      link.setAttribute('download', `${hash}.torrent`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  })
}

const menuData = computed<TRCMenuEntry[]>(() => [
  {
    text: t('dashboard.right_click.advanced.title'),
    icon: 'mdi-head-cog',
    children: [
      {
        text: t('dashboard.right_click.advanced.download_path'),
        icon: 'mdi-tray-arrow-down',
        action: setDownloadPath
      },
      {
        text: t('dashboard.right_click.advanced.save_path'),
        icon: 'mdi-content-save',
        action: setSavePath
      },
      {
        text: t('dashboard.right_click.advanced.rename'),
        icon: 'mdi-rename-box',
        hidden: isMultiple.value,
        action: renameTorrents
      },
      {
        text: t('dashboard.right_click.advanced.recheck'),
        icon: 'mdi-playlist-check',
        action: forceRecheck
      },
      {
        text: t('dashboard.right_click.advanced.reannounce'),
        icon: 'mdi-bullhorn',
        action: forceReannounce
      },
      {
        text: t('dashboard.right_click.advanced.seq_dl'),
        icon: torrent.value?.seq_dl ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleSeqDl
      },
      {
        text: t('dashboard.right_click.advanced.f_l_prio'),
        icon: torrent.value?.f_l_piece_prio ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleFLPiecePrio
      },
      {
        text: t('dashboard.right_click.advanced.auto_tmm'),
        icon: torrent.value?.auto_tmm ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleAutoTMM
      }
    ]
  },
  {
    text: t('dashboard.right_click.priority.title'),
    icon: 'mdi-priority-high',
    hidden: !preferenceStore.preferences!.queueing_enabled,
    children: [
      {
        text: t('dashboard.right_click.priority.top'),
        icon: 'mdi-priority-high',
        action: async () => await torrentStore.setTorrentPriority(hashes.value, 'topPrio')
      },
      {
        text: t('dashboard.right_click.priority.increase'),
        icon: 'mdi-arrow-up',
        action: async () => await torrentStore.setTorrentPriority(hashes.value, 'increasePrio')
      },
      {
        text: t('dashboard.right_click.priority.decrease'),
        icon: 'mdi-arrow-down',
        action: async () => await torrentStore.setTorrentPriority(hashes.value, 'decreasePrio')
      },
      {
        text: t('dashboard.right_click.priority.bottom'),
        icon: 'mdi-priority-low',
        action: async () => await torrentStore.setTorrentPriority(hashes.value, 'bottomPrio')
      }
    ]
  },
  {
    text: t('dashboard.right_click.tags.title'),
    icon: 'mdi-tag',
    disabled: maindataStore.tags.length === 0,
    disabledText: t('dashboard.right_click.tags.disabled_title'),
    disabledIcon: 'mdi-tag-off',
    children: maindataStore.tags.map(tag => ({
      text: tag,
      icon: hasTag(tag) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
      action: async () => await toggleTag(tag)
    }))
  },
  {
    text: t('dashboard.right_click.category.title'),
    icon: 'mdi-label',
    disabled: maindataStore.categories.length === 0,
    disabledText: t('dashboard.right_click.category.disabled_title'),
    disabledIcon: 'mdi-label-off',
    children: availableCategories.value.map(category => ({
      text: category.name === '' ? t('dashboard.right_click.category.clear') : category.name,
      action: async () => await torrentStore.setTorrentCategory(hashes.value, category.name)
    }))
  },
  {
    text: t('dashboard.right_click.speed_limit.title'),
    icon: 'mdi-speedometer-slow',
    children: [
      {
        text: t('dashboard.right_click.speed_limit.download'),
        icon: 'mdi-download',
        action: setDownloadLimit
      },
      {
        text: t('dashboard.right_click.speed_limit.upload'),
        icon: 'mdi-upload',
        action: setUploadLimit
      },
      {
        text: t('dashboard.right_click.speed_limit.share'),
        icon: 'mdi-account-group',
        action: setShareLimit
      }
    ]
  },
  {
    text: t('dashboard.right_click.copy.title'),
    icon: 'mdi-content-copy',
    hidden: isMultiple.value,
    children: [
      {
        text: t('dashboard.right_click.copy.name'),
        icon: 'mdi-alphabetical-variant',
        action: async () => torrent.value && (await copyValue(torrent.value.name))
      },
      {
        text: t('dashboard.right_click.copy.hash'),
        icon: 'mdi-pound',
        action: async () => await copyValue(hash.value)
      },
      {
        text: t('dashboard.right_click.copy.magnet'),
        icon: 'mdi-magnet',
        action: async () => torrent.value && (await copyValue(torrent.value.magnet))
      }
    ]
  },
  {
    text: t('dashboard.right_click.export', dashboardStore.selectedTorrents.length),
    icon: isMultiple.value ? 'mdi-download-multiple' : 'mdi-download',
    action: exportTorrents
  },
  {
    text: t('dashboard.right_click.info'),
    icon: 'mdi-information',
    hidden: isMultiple.value,
    action: () => router.push({ name: 'torrentDetail', params: { hash: hash.value } })
  }
])

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
    <RightClickMenu v-model="trcProperties.isVisible" :menu-data="menuData">
      <template v-slot:top>
        <v-list-item>
          <div class="d-flex justify-space-around">
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-btn density="compact" variant="plain" icon="mdi-play" v-bind="props" @click="resumeTorrents" />
              </template>
              <span>{{ $t('dashboard.right_click.top.resume') }}</span>
            </v-tooltip>

            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-btn density="compact" variant="plain" icon="mdi-fast-forward" v-bind="props" @click="forceResumeTorrents" />
              </template>
              <span>{{ $t('dashboard.right_click.top.force_resume') }}</span>
            </v-tooltip>

            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-btn density="compact" variant="plain" icon="mdi-pause" v-bind="props" @click="pauseTorrents" />
              </template>
              <span>{{ $t('dashboard.right_click.top.pause') }}</span>
            </v-tooltip>

            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-btn color="red" density="compact" variant="plain" icon="mdi-delete-forever" v-bind="props" @click="deleteTorrents" />
              </template>
              <span>{{ $t('dashboard.right_click.top.delete') }}</span>
            </v-tooltip>
          </div>
        </v-list-item>
      </template>
    </RightClickMenu>
  </div>
</template>

<style>
.v-autocomplete .v-field:not(.v-field--focused) input {
  display: none;
}
</style>
