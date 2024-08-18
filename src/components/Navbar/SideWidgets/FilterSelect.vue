<script lang="ts" setup>
import { FilterType, TorrentState } from '@/constants/vuetorrent'
import { comparators, getTorrentStateValue } from '@/helpers'
import { useCategoryStore, useTagStore, useTorrentStore, useTrackerStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, Ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const categoryStore = useCategoryStore()
const tagStore = useTagStore()
const { statusFilter, categoryFilter, tagFilter, tagFilterType, trackerFilter, trackerFilterType } = storeToRefs(useTorrentStore())
const trackerStore = useTrackerStore()

const statuses = computed(() =>
  Object.values(TorrentState)
    .filter(state => typeof state === 'number')
    .map(state => ({ title: t(`torrent.state.${getTorrentStateValue(state as TorrentState)}`), value: state }))
)
const categories = computed(() => [
  {
    title: t('navbar.side.filters.uncategorized'),
    value: ''
  },
  ...categoryStore.categories.map(c => c.name)
])
const tags = computed(() => [{ title: t('navbar.side.filters.untagged'), value: null }, ...tagStore.tags])
const trackers = computed(() => [{ title: t('navbar.side.filters.untracked'), value: null }, ...trackerStore.trackers])

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

function selectActive() {
  statusFilter.value = [
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
}

function selectError() {
  statusFilter.value = [TorrentState.ERROR, TorrentState.MISSING_FILES, TorrentState.UNKNOWN]
}

function selectOffline() {
  statusFilter.value = [
    TorrentState.ERROR,
    TorrentState.MISSING_FILES,
    TorrentState.UNKNOWN,
    TorrentState.MOVING,
    TorrentState.DL_PAUSED,
    TorrentState.UL_PAUSED,
    TorrentState.CHECKING_DISK,
    TorrentState.CHECKING_RESUME_DATA
  ]
}

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
        :items="statuses.sort((a, b) => comparators.text.asc(a.title, b.title))"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllStatuses" />
          <v-list-item :title="$t('navbar.side.filters.state.active')" @click="selectActive" />
          <v-list-item :title="$t('navbar.side.filters.state.error')" @click="selectError" />
          <v-list-item :title="$t('navbar.side.filters.state.offline')" @click="selectOffline" />
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
