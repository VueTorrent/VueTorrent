<script setup lang="ts">
import TorrentSearchbar from '@/components/TorrentSearchbar.vue'
import { useI18nUtils } from '@/composables'
import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { comparators } from '@/helpers'
import { useDashboardStore, useNavbarStore, useTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed, mergeProps } from 'vue'

const { t } = useI18nUtils()

const dashboardStore = useDashboardStore()
const { torrentCountString, isSelectionMultiple, displayMode } = storeToRefs(dashboardStore)
const { isDrawerOpen } = storeToRefs(useNavbarStore())
const torrentStore = useTorrentStore()
const { sortCriterias } = storeToRefs(torrentStore)

type SortOption = { title: string; value: keyof Torrent }

const torrentSortOptions: SortOption[] = [
  { value: 'added_on', title: t('dashboard.sortBy.added_on') },
  { value: 'amount_left', title: t('dashboard.sortBy.amount_left') },
  { value: 'availability', title: t('dashboard.sortBy.availability') },
  { value: 'available_peers', title: t('dashboard.sortBy.available_peers') },
  { value: 'available_seeds', title: t('dashboard.sortBy.available_seeds') },
  { value: 'avgDownloadSpeed', title: t('dashboard.sortBy.avg_download_speed') },
  { value: 'avgUploadSpeed', title: t('dashboard.sortBy.avg_upload_speed') },
  { value: 'basename_content_path', title: t('dashboard.sortBy.basename_content_path') },
  { value: 'basename_download_path', title: t('dashboard.sortBy.basename_download_path') },
  { value: 'basename_save_path', title: t('dashboard.sortBy.basename_save_path') },
  { value: 'category', title: t('dashboard.sortBy.category') },
  { value: 'completed_on', title: t('dashboard.sortBy.completion_on') },
  { value: 'content_path', title: t('dashboard.sortBy.content_path') },
  { value: 'dl_limit', title: t('dashboard.sortBy.dl_limit') },
  { value: 'dlspeed', title: t('dashboard.sortBy.dlspeed') },
  { value: 'download_path', title: t('dashboard.sortBy.download_path') },
  { value: 'downloaded', title: t('dashboard.sortBy.downloaded') },
  { value: 'downloaded_session', title: t('dashboard.sortBy.downloaded_session') },
  { value: 'eta', title: t('dashboard.sortBy.eta') },
  { value: 'globalSpeed', title: t('dashboard.sortBy.globalSpeed') },
  { value: 'globalVolume', title: t('dashboard.sortBy.globalVolume') },
  { value: 'hash', title: t('dashboard.sortBy.hash') },
  { value: 'inactive_seeding_time_limit', title: t('dashboard.sortBy.inactive_seeding_time_limit') },
  { value: 'infohash_v1', title: t('dashboard.sortBy.infohash_v1') },
  { value: 'infohash_v2', title: t('dashboard.sortBy.infohash_v2') },
  { value: 'last_activity', title: t('dashboard.sortBy.last_activity') },
  { value: 'name', title: t('dashboard.sortBy.name') },
  { value: 'num_leechs', title: t('dashboard.sortBy.num_leechs') },
  { value: 'num_seeds', title: t('dashboard.sortBy.num_seeds') },
  { value: 'priority', title: t('dashboard.sortBy.priority') },
  { value: 'progress', title: t('dashboard.sortBy.progress') },
  { value: 'ratio', title: t('dashboard.sortBy.ratio') },
  { value: 'ratio_limit', title: t('dashboard.sortBy.ratio_limit') },
  { value: 'savePath', title: t('dashboard.sortBy.save_path') },
  { value: 'seeding_time', title: t('dashboard.sortBy.seeding_time') },
  { value: 'seeding_time_limit', title: t('dashboard.sortBy.seeding_time_limit') },
  { value: 'seen_complete', title: t('dashboard.sortBy.seen_complete') },
  { value: 'size', title: t('dashboard.sortBy.size') },
  { value: 'state', title: t('dashboard.sortBy.state') },
  { value: 'tags', title: t('dashboard.sortBy.tags') },
  { value: 'time_active', title: t('dashboard.sortBy.time_active') },
  { value: 'total_size', title: t('dashboard.sortBy.total_size') },
  { value: 'trackerDomain', title: t('dashboard.sortBy.tracker') },
  { value: 'trackers_count', title: t('dashboard.sortBy.trackers_count') },
  { value: 'up_limit', title: t('dashboard.sortBy.up_limit') },
  { value: 'uploaded', title: t('dashboard.sortBy.uploaded') },
  { value: 'uploaded_session', title: t('dashboard.sortBy.uploaded_session') },
  { value: 'upspeed', title: t('dashboard.sortBy.upspeed') }
]
torrentSortOptions.sort((a, b) => comparators.text.asc(a.title, b.title))

const sortOption = computed({
  get: () => sortCriterias.value[0],
  set: v => {
    sortCriterias.value = [{ value: v.value, reverse: v.reverse }]
  }
})

function inverseSort() {
  sortOption.value = { value: sortOption.value.value, reverse: !sortOption.value.reverse }
}

function setSortOption(value: keyof Torrent) {
  sortOption.value = { value, reverse: sortOption.value.reverse }
}

function toggleSelectMode() {
  if (isSelectionMultiple.value) {
    dashboardStore.unselectAllTorrents()
  }
  isSelectionMultiple.value = !isSelectionMultiple.value
}
</script>

<template>
  <TorrentSearchbar v-if="$vuetify.display.mdAndDown" class="my-2" />
  <div class="d-flex mb-2 align-center">
    <v-tooltip :text="t('dashboard.toggleSelectMode')" location="top">
      <template v-slot:activator="{ props }">
        <v-btn :icon="isSelectionMultiple ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'" v-bind="props" variant="plain" @click="toggleSelectMode" />
      </template>
    </v-tooltip>
    <v-menu>
      <template v-slot:activator="{ props: menu }">
        <v-tooltip :text="t('dashboard.displayMode.title')" location="top">
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
        <v-list-item :title="t('dashboard.displayMode.list')" prepend-icon="mdi-view-list" @click="displayMode = DashboardDisplayMode.LIST" />
        <v-list-item :title="t('dashboard.displayMode.grid')" prepend-icon="mdi-view-grid" @click="displayMode = DashboardDisplayMode.GRID" />
        <v-list-item :title="t('dashboard.displayMode.table')" prepend-icon="mdi-table" @click="displayMode = DashboardDisplayMode.TABLE" />
      </v-list>
    </v-menu>
    <v-tooltip :text="t('dashboard.toggleSortOrder')" location="top">
      <template v-slot:activator="{ props }">
        <v-btn :icon="sortOption.reverse ? 'mdi-sort-descending' : 'mdi-sort-ascending'" v-bind="props" variant="plain" @click="inverseSort()" />
      </template>
    </v-tooltip>
    <div class="d-flex align-center pl-2">
      <v-select
        :model-value="sortOption.value"
        @update:model-value="setSortOption"
        :items="torrentSortOptions"
        :label="t('dashboard.sortLabel')"
        density="compact"
        hide-details
        variant="solo-filled"
        :style="`width: ${$vuetify.display.xs || ($vuetify.display.sm && isDrawerOpen) ? 140 : 260}px`" />
    </div>

    <v-spacer />

    <div class="d-flex justify-end align-center text-uppercase text-select mr-2" style="font-size: 0.8em">
      {{ torrentCountString }}
    </div>
  </div>
</template>
