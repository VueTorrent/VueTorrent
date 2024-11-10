<script lang="ts" setup>
import { useI18nUtils } from '@/composables'
import { FilterType, TorrentState } from '@/constants/vuetorrent'
import { comparators } from '@/helpers'
import { useCategoryStore, useTagStore, useTorrentStore, useTrackerStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, Ref } from 'vue'

const { t, getTorrentStateString } = useI18nUtils()
const { categories: _categories, torrentsByCategory } = storeToRefs(useCategoryStore())
const { tags: _tags, torrentsByTag } = storeToRefs(useTagStore())
const { torrents, torrentsByStatus, statusFilter, categoryFilter, tagFilter, tagFilterType, torrentsByTracker, trackerFilter, trackerFilterType } = storeToRefs(useTorrentStore())
const { trackers: _trackers } = storeToRefs(useTrackerStore())

const statuses = computed(() =>
  Object.values(TorrentState)
    .filter(state => typeof state === 'number')
    .map(state => ({ title: `${getTorrentStateString(state as TorrentState)} (${torrentsByStatus.value[state] ?? 0})`, value: state }))
    .sort((a, b) => comparators.text.asc(a.title, b.title))
)

const categories = computed(() => [
  {
    title: `${t('navbar.side.filters.uncategorized')} (${torrentsByCategory.value[''] ?? 0})`,
    value: ''
  },
  ..._categories.value.map(c => ({ title: `${c.name} (${torrentsByCategory.value[c.name] ?? 0})`, value: c.name }))
])

const tags = computed(() => [
  {
    title: `${t('navbar.side.filters.untagged')} (${torrentsByTag.value[''] ?? 0})`,
    value: null
  },
  ..._tags.value.map(tag => ({ title: `${tag} (${torrentsByTag.value[tag] ?? 0})`, value: tag }))
])

const trackers = computed(() => [
  {
    title: `${t('navbar.side.filters.untracked')} (${torrentsByTracker.value[''] ?? 0})`,
    value: null
  },
  ..._trackers.value.map(tracker => ({ title: `${tracker} (${torrentsByTracker.value[tracker] ?? 0})`, value: tracker }))
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

function selectAllStatuses() {
  statusFilter.value = []
}

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

function selectActive() {
  statusFilter.value = activeStatuses
}
const activeTorrentsCount = computed(() => torrents.value.filter(t => activeStatuses.includes(t.state)).length)

function selectError() {
  statusFilter.value = erroredStatuses
}
const erroredTorrentsCount = computed(() => torrents.value.filter(t => erroredStatuses.includes(t.state)).length)

function selectOffline() {
  statusFilter.value = offlineStatuses
}
const offlineTorrentsCount = computed(() => torrents.value.filter(t => offlineStatuses.includes(t.state)).length)

function selectAllCategories() {
  categoryFilter.value = []
}

function selectAllTags() {
  tagFilter.value = []
}

function selectAllTrackers() {
  trackerFilter.value = []
}
</script>

<template>
  <v-list class="pb-0 inherit-fg">
    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.state.title') }}
      </v-list-item-title>
      <v-select
        v-model="statusFilter"
        :items="statuses"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllStatuses" />
          <v-list-item :title="`${$t('navbar.side.filters.state.active')} (${activeTorrentsCount})`" @click="selectActive" />
          <v-list-item :title="`${$t('navbar.side.filters.state.error')} (${erroredTorrentsCount})`" @click="selectError" />
          <v-list-item :title="`${$t('navbar.side.filters.state.offline')} (${offlineTorrentsCount})`" @click="selectOffline" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && statusFilter.length === 1" class="text-accent">{{ item.title }}</span>
          <span v-else-if="index === 0" class="text-accent">{{ t('navbar.side.filters.activeFilter', statusFilter.length) }}</span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.category') }}
      </v-list-item-title>
      <v-select
        v-model="categoryFilter"
        :items="categories"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllCategories" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && categoryFilter.length === 1" class="text-accent">
            {{ item.props.title }}
          </span>
          <span v-else-if="index === 0" class="text-accent">
            {{ t('navbar.side.filters.activeFilter', categoryFilter.length) }}
          </span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.tag') }}
      </v-list-item-title>
      <v-select
        v-model="tagFilter"
        :items="tags"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template #prepend>
          <v-tooltip location="right" :text="$t(tagFilterType === FilterType.CONJUNCTIVE ? 'constants.filter_type.conjunctive' : 'constants.filter_type.disjunctive')">
            <template #activator="{ props }">
              <v-icon v-bind="props" :icon="tagFilterType === FilterType.CONJUNCTIVE ? 'mdi-set-center' : 'mdi-set-all'" @click="toggleTagFilterType()" />
            </template>
          </v-tooltip>
        </template>
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllTags" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && tagFilter.length === 1" class="text-accent">
            {{ item.props.title }}
          </span>
          <span v-else-if="index === 0" class="text-accent">
            {{ t('navbar.side.filters.activeFilter', tagFilter.length) }}
          </span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.tracker') }}
      </v-list-item-title>
      <v-select
        v-model="trackerFilter"
        :items="trackers"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template #prepend>
          <v-tooltip location="right" :text="$t(trackerFilterType === FilterType.CONJUNCTIVE ? 'constants.filter_type.conjunctive' : 'constants.filter_type.disjunctive')">
            <template #activator="{ props }">
              <v-icon v-bind="props" :icon="trackerFilterType === FilterType.CONJUNCTIVE ? 'mdi-set-center' : 'mdi-set-all'" @click="toggleTrackerFilterType()" />
            </template>
          </v-tooltip>
        </template>
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllTrackers" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && trackerFilter.length === 1" class="text-accent">
            {{ item.props.title }}
          </span>
          <span v-else-if="index === 0" class="text-accent">
            {{ t('navbar.side.filters.activeFilter', trackerFilter.length) }}
          </span>
        </template>
      </v-select>
    </v-list-item>
  </v-list>
</template>
