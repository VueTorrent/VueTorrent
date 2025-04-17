<script lang="ts" setup>
import FilterSelectMulti from '@/components/Navbar/SideWidgets/FilterSelectMulti.vue'
import FilterSelectSingle from '@/components/Navbar/SideWidgets/FilterSelectSingle.vue'
import { useI18nUtils } from '@/composables'
import { FilterType, TorrentState, TrackerSpecialFilter } from '@/constants/vuetorrent'
import { comparators } from '@/helpers'
import { useCategoryStore, useTagStore, useTorrentStore, useTrackerStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, Ref } from 'vue'

const { t, getTorrentStateString } = useI18nUtils()
const { categories: _categories, torrentsByCategory } = storeToRefs(useCategoryStore())
const { tags: _tags, torrentsByTag } = storeToRefs(useTagStore())
const { torrents, torrentsByStatus, statusFilter, categoryFilter, tagFilterInclude, tagFilterExclude, tagFilterType, torrentsByTracker, trackerFilterInclude, trackerFilterExclude, trackerFilterType } = storeToRefs(useTorrentStore())
const { hostnameTrackers } = storeToRefs(useTrackerStore())

const statuses = computed(() =>
  Object.values(TorrentState)
    .filter(state => typeof state === 'number')
    .map(state => ({
      title: `${getTorrentStateString(state as TorrentState)} (${torrentsByStatus.value[state] ?? 0})`,
      value: state
    }))
    .sort((a, b) => comparators.text.asc(a.title, b.title))
)

const categories = computed(() => [
  {
    title: `${t('navbar.side.filters.category.empty')} (${torrentsByCategory.value[''] ?? 0})`,
    value: ''
  },
  ..._categories.value.map(c => ({ title: `${c.name} (${torrentsByCategory.value[c.name] ?? 0})`, value: c.name }))
])

const tags = computed(() => [
  {
    title: `${t('navbar.side.filters.tag.empty')} (${torrentsByTag.value[''] ?? 0})`,
    value: null
  },
  ..._tags.value.map(tag => ({ title: `${tag} (${torrentsByTag.value[tag] ?? 0})`, value: tag }))
])

const trackers = computed(() => [
  {
    title: `${t('navbar.side.filters.tracker.empty')} (${torrentsByTracker.value[TrackerSpecialFilter.UNTRACKED] ?? 0})`,
    value: TrackerSpecialFilter.UNTRACKED
  },
  {
    title: `${t('navbar.side.filters.tracker.not_working')} (${torrentsByTracker.value[TrackerSpecialFilter.NOT_WORKING] ?? 0})`,
    value: TrackerSpecialFilter.NOT_WORKING
  },
  ...hostnameTrackers.value.map(tracker => ({
    title: `${tracker} (${torrentsByTracker.value[tracker] ?? 0})`,
    value: tracker
  }))
])

function toggleFilterType(ref: Ref<FilterType>) {
  switch (ref.value) {
    case FilterType.CONJUNCTIVE:
      ref.value = FilterType.DISJUNCTIVE
      break
    case FilterType.DISJUNCTIVE:
      ref.value = FilterType.CONJUNCTIVE
      break
  }
}

const toggleTagFilterType = () => toggleFilterType(tagFilterType)
const toggleTrackerFilterType = () => toggleFilterType(trackerFilterType)

const activeStatuses = [
  TorrentState.UPLOADING,
  TorrentState.CHECKING_DISK,
  TorrentState.UL_FORCED,
  TorrentState.DOWNLOADING,
  TorrentState.META_DOWNLOAD,
  TorrentState.FORCED_META_DOWNLOAD,
  TorrentState.CHECKING_DISK,
  TorrentState.DL_FORCED,
  TorrentState.CHECKING_RESUME_DATA,
  TorrentState.MOVING
]
const erroredStatuses = [TorrentState.ERROR, TorrentState.MISSING_FILES, TorrentState.UNKNOWN]
const offlineStatuses = [
  TorrentState.ERROR,
  TorrentState.MISSING_FILES,
  TorrentState.UNKNOWN,
  TorrentState.MOVING,
  TorrentState.DL_STOPPED,
  TorrentState.DL_STALLED,
  TorrentState.UL_STOPPED,
  TorrentState.CHECKING_DISK,
  TorrentState.CHECKING_RESUME_DATA
]

function disableStatusFilter() {
  statusFilter.value = []
}

const activeTorrentsCount = computed(() => torrents.value.filter(t => activeStatuses.includes(t.state)).length)
function selectActive() {
  statusFilter.value = activeStatuses
}

const erroredTorrentsCount = computed(() => torrents.value.filter(t => erroredStatuses.includes(t.state)).length)
function selectError() {
  statusFilter.value = erroredStatuses
}

const offlineTorrentsCount = computed(() => torrents.value.filter(t => offlineStatuses.includes(t.state)).length)
function selectOffline() {
  statusFilter.value = offlineStatuses
}

function disableCategoryFilter() {
  categoryFilter.value = []
}

function disableTagFilter() {
  tagFilterInclude.value = []
  tagFilterExclude.value = []
}

function disableTrackerFilter() {
  trackerFilterInclude.value = []
  trackerFilterExclude.value = []
}
</script>

<template>
  <v-list class="pb-0 inherit-fg">
    <FilterSelectSingle v-model="statusFilter" :title="t('navbar.side.filters.state.title')" :items="statuses" @disable="disableStatusFilter">
      <template #prepend-item>
        <v-list-item :title="`${t('navbar.side.filters.state.active')} (${activeTorrentsCount})`" @click="selectActive" />
        <v-list-item :title="`${t('navbar.side.filters.state.error')} (${erroredTorrentsCount})`" @click="selectError" />
        <v-list-item :title="`${t('navbar.side.filters.state.offline')} (${offlineTorrentsCount})`" @click="selectOffline" />
      </template>
    </FilterSelectSingle>

    <FilterSelectSingle v-model="categoryFilter" :title="t('navbar.side.filters.category.title')" :items="categories" @disable="disableCategoryFilter" />

    <FilterSelectMulti
      v-model:include="tagFilterInclude"
      v-model:exclude="tagFilterExclude"
      :title="t('navbar.side.filters.tag.title')"
      :items="tags"
      :filterType="tagFilterType"
      @disable="disableTagFilter"
      @toggleFilterType="toggleTagFilterType" />

    <FilterSelectMulti
      v-model:include="trackerFilterInclude"
      v-model:exclude="trackerFilterExclude"
      :title="t('navbar.side.filters.tracker.title')"
      :items="trackers"
      :filterType="trackerFilterType"
      @disable="disableTrackerFilter"
      @toggleFilterType="toggleTrackerFilterType" />
  </v-list>
</template>
